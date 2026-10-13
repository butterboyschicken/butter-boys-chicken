# Butter Boys Chicken shop

This is the standalone, dependency-free Butter Boys Chicken product shop page. It is separate from Tiny Bean Company's `index.html` and includes the exact homepage logo image and supplied packaging mockup in its assets.

## Product details shown

- Butter Boys Chicken Kit
- 200 g
- Makes enough chicken for 6 people
- £7.99 per retail kit
- Orders of 1,000 kits or more switch to the wholesale contact action
- Serving suggestion: enjoy with pickles; the pickle partner brand is still to be chosen

## Connect Square checkout

Checkout is deliberately disabled until a real Square checkout link is configured. In Square, create an active payment link for the Butter Boys Chicken Kit at £7.99 per kit, set up shipping, tax, order notifications and fulfilment, then copy its secure checkout URL into `square-config.js`:

```js
window.BUTTER_BOYS_SHOP_CONFIG = {
  paymentLinkUrl: "https://square.link/u/your-checkout-link",
};
```

Only an HTTPS link hosted by `square.link` or `checkout.square.site` enables the retail checkout button. The link is public; never put a Square access token, application secret or other private credential in this static site.

The quantity selector on this page displays an estimated item subtotal; it cannot set the quantity in a static Square payment link. Customers must confirm the item quantity and delivery in Square checkout. Test the live link, payment methods (including Apple Pay and cards), shipping, tax and order notifications before enabling checkout or taking orders. If the Square link allows customers to change quantity, configure a 999-kit maximum if Square offers that setting so orders of 1,000 kits or more continue to be handled through the wholesale contact flow. The pack image is explicitly labelled as a packaging preview.

The web recipe follows the owner-supplied blend quantities and method. The three preparation cards show the method and pack totals; the full ingredient-name list is in the Ingredients & allergens section without individual component weights. Before printing or publishing final pack instructions, professionally validate the recipe and frying guidance, the required food-safety checks, allergen declaration and final net weight. The supplied blend weights (18 g + 138 g + 45 g) add up to 201 g while the stated retail net weight is 200 g. The listed component gram amounts also total 17.3 g for the 18 g marinade blend, 134.6 g for the 138 g dry mix, and 44 g for the 45 g wet dredge; confirm whether these differences are rounding, omitted ingredients or require a correction. Confirm allergens against the final recipe and supplier specifications before sale.

## Route in the Butter Boys production site

In the Butter Boys production repository, keep these files in the `shop/` directory so the shop is available at `https://butterboyschicken.com/shop/`. The existing root `index.html` stays unchanged and no homepage link is added. The root `index.html` and the existing root logo image must stay in place.

This shop page is built into the Netlify-connected GitHub repository. Once Square is configured, add the real payment link to `square-config.js` to enable checkout. Do not change DNS or email records as part of this page deployment.
