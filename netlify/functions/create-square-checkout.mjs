import { randomUUID } from "node:crypto";

const RETAIL_PRICE_PENCE = 799;
const MAX_RETAIL_QUANTITY = 99;
const API_VERSION = "2025-10-16";
const ALLOWED_ORIGINS = new Set([
  "https://butterboyschicken.com",
  "https://www.butterboyschicken.com",
]);

function jsonResponse(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

function squareHeaders(accessToken) {
  return {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
    "Square-Version": API_VERSION,
  };
}

async function readSquareResponse(response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

function logSquareFailure(operation, response, body) {
  console.error(`Square ${operation} failed.`, {
    status: response.status,
    errors: Array.isArray(body?.errors)
      ? body.errors.map(({ category, code }) => ({ category, code }))
      : [],
  });
}

export default async (request) => {
  if (request.method !== "POST") {
    return jsonResponse(405, { error: "Method not allowed." });
  }

  if (!ALLOWED_ORIGINS.has(request.headers.get("origin"))) {
    return jsonResponse(403, { error: "Request origin is not allowed." });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse(400, { error: "A valid JSON body is required." });
  }

  const quantity = body?.quantity;
  if (
    !Number.isSafeInteger(quantity) ||
    quantity < 1 ||
    quantity > MAX_RETAIL_QUANTITY
  ) {
    return jsonResponse(400, {
      error: `Quantity must be a whole number from 1 to ${MAX_RETAIL_QUANTITY}.`,
    });
  }

  const accessToken = process.env.SQUARE_ACCESS_TOKEN?.trim();
  const locationId = process.env.SQUARE_LOCATION_ID?.trim();
  const itemVariationId = process.env.SQUARE_ITEM_VARIATION_ID?.trim();
  const environment = process.env.SQUARE_ENVIRONMENT?.trim();
  const shippingFeePence = process.env.SQUARE_SHIPPING_FEE_PENCE?.trim();

  if (
    !accessToken ||
    !locationId ||
    !itemVariationId ||
    !["production", "sandbox"].includes(environment) ||
    !/^\d+$/.test(shippingFeePence || "") ||
    !Number.isSafeInteger(Number(shippingFeePence))
  ) {
    console.error("Square checkout is missing required Netlify environment variables.");
    return jsonResponse(503, { error: "Square checkout is not configured." });
  }

  const squareBaseUrl =
    environment === "sandbox"
      ? "https://connect.squareupsandbox.com"
      : "https://connect.squareup.com";
  const headers = squareHeaders(accessToken);

  let catalogResponse;
  let catalog;
  try {
    catalogResponse = await fetch(
      `${squareBaseUrl}/v2/catalog/object/${encodeURIComponent(itemVariationId)}`,
      { headers },
    );
    catalog = await readSquareResponse(catalogResponse);
  } catch (error) {
    console.error("Unable to reach Square Catalog API.", error);
    return jsonResponse(502, {
      error: "Could not verify the Square product. Please try again shortly.",
    });
  }

  if (!catalogResponse.ok) {
    logSquareFailure("catalog lookup", catalogResponse, catalog);
    return jsonResponse(502, {
      error: "Could not verify the Square product configuration.",
    });
  }

  const variation = catalog?.object;
  const price = variation?.item_variation_data?.price_money;
  if (
    variation?.type !== "ITEM_VARIATION" ||
    variation.is_deleted === true ||
    price?.currency !== "GBP" ||
    Number(price.amount) !== RETAIL_PRICE_PENCE
  ) {
    console.error("Square catalogue variation does not match the retail product.");
    return jsonResponse(409, {
      error: "The Square product must be active and priced at £7.99 GBP.",
    });
  }

  const checkoutOptions = {
    ask_for_shipping_address: true,
    redirect_url: "https://butterboyschicken.com/shop/?checkout=success",
  };
  if (Number(shippingFeePence) > 0) {
    checkoutOptions.shipping_fee = {
      name: "Shipping",
      charge: {
        amount: Number(shippingFeePence),
        currency: "GBP",
      },
    };
  }

  let checkoutResponse;
  let checkout;
  try {
    checkoutResponse = await fetch(
      `${squareBaseUrl}/v2/online-checkout/payment-links`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          idempotency_key: randomUUID(),
          order: {
            location_id: locationId,
            line_items: [
              {
                catalog_object_id: itemVariationId,
                quantity: String(quantity),
              },
            ],
          },
          checkout_options: checkoutOptions,
        }),
      },
    );
    checkout = await readSquareResponse(checkoutResponse);
  } catch (error) {
    console.error("Unable to reach Square Checkout API.", error);
    return jsonResponse(502, {
      error: "Could not start Square checkout. Please try again shortly.",
    });
  }

  if (!checkoutResponse.ok) {
    logSquareFailure("checkout creation", checkoutResponse, checkout);
    return jsonResponse(502, {
      error: "Could not start Square checkout. Please try again shortly.",
    });
  }

  const checkoutUrl = checkout?.payment_link?.url;
  let parsedCheckoutUrl;
  try {
    parsedCheckoutUrl = new URL(checkoutUrl);
  } catch {
    parsedCheckoutUrl = null;
  }

  if (
    !parsedCheckoutUrl ||
    parsedCheckoutUrl.protocol !== "https:" ||
    !["square.link", "checkout.square.site"].includes(
      parsedCheckoutUrl.hostname,
    )
  ) {
    console.error("Square returned an invalid hosted checkout URL.");
    return jsonResponse(502, {
      error: "Square returned an invalid checkout link. Please try again later.",
    });
  }

  return jsonResponse(200, { checkoutUrl: parsedCheckoutUrl.href });
};
