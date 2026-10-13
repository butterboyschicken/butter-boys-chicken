# Butter Boys Chicken shop

This is the standalone, dependency-free Butter Boys Chicken product shop page. It is separate from Tiny Bean Company's `index.html` and includes the logo and supplied packaging mockup in its assets.

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

## Route in the Butter Boys production site

In the Butter Boys production repository, keep these files in the `shop/` directory so the shop is available at `https://butterboyschicken.com/shop/`. The existing root `index.html` stays unchanged and no homepage link is added. The root `index.html` and the existing root logo image must stay in place.

This shop page is built into the Netlify-connected GitHub repository. Once Shopify is configured and the site is published, add the real public store domain and product variant ID to `shopify-config.js` to enable checkout. Do not change DNS or email records as part of this page deployment.
