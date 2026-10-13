# Butter Boys Chicken shop

This is the standalone, dependency-free Butter Boys Chicken product shop page. It is separate from Tiny Bean Company's `index.html` and includes the exact homepage logo image and supplied packaging mockup in its assets.

## Product details shown

- Butter Boys Chicken Kit
- 200 g
- Makes enough chicken for 6 people
- £7.99 per retail kit
- Orders of 1,000 kits or more switch to the wholesale contact action

## Connect Shopify checkout

Checkout is deliberately disabled until it is connected to the real store product. Create and publish the product in Shopify first, then edit `shopify-config.js`:

```js
window.BUTTER_BOYS_SHOP_CONFIG = {
  storeDomain: "your-store.myshopify.com",
  productVariantId: "12345678901234",
};
```

Use the shop's public Shopify domain and the product's numeric **variant ID**. This static hosted checkout uses Shopify's cart permalink (`/cart/VARIANT_ID:quantity`). These values are public storefront identifiers, not private API credentials. Never put an admin password, private access token, or secret key in this page.

Add shipping rates, tax settings, inventory, order notifications, legal policies and the actual pack's approved ingredients, allergens, nutrition, storage instructions and cooking directions in Shopify before switching checkout on or taking orders. The pack image is explicitly labelled as a packaging preview.

The web recipe follows the owner-supplied blend quantities and method. The three preparation cards show the method and pack totals; the full ingredient-name list is in the Ingredients & allergens section without individual component weights. Before printing or publishing final pack instructions, professionally validate the recipe and frying guidance, the required food-safety checks, allergen declaration and final net weight. The supplied blend weights (18 g + 138 g + 45 g) add up to 201 g while the stated retail net weight is 200 g. The listed component gram amounts also total 17.3 g for the 18 g marinade blend, 134.6 g for the 138 g dry mix, and 44 g for the 45 g wet dredge; confirm whether these differences are rounding, omitted ingredients or require a correction. Confirm allergens against the final recipe and supplier specifications before sale.

## Route in the Butter Boys production site

In the Butter Boys production repository, keep these files in the `shop/` directory so the shop is available at `https://butterboyschicken.com/shop/`. The existing root `index.html` stays unchanged and no homepage link is added. The root `index.html` and the existing root logo image must stay in place.

This shop page is built into the Netlify-connected GitHub repository. Once Shopify is configured and the site is published, add the real public store domain and product variant ID to `shopify-config.js` to enable checkout. Do not change DNS or email records as part of this page deployment.
