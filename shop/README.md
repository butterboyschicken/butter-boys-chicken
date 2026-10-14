# Butter Boys Chicken shop

This is the standalone, dependency-free Butter Boys Chicken product shop page. It is separate from Tiny Bean Company's `index.html` and includes the exact homepage logo image and supplied packaging mockup in its assets.

## Product details shown

- Butter Boys Chicken Kit
- 200 g
- Makes enough chicken for 6 people
- £7.99 per retail kit with free delivery
- Orders of 1,000 kits or more switch to the wholesale contact action
- Serving suggestion: enjoy with pickles; the pickle partner brand is still to be chosen
- Customer market-research survey at `/survey/`

## Market research survey

The anonymous customer survey is hosted at `survey/index.html`, with a confirmation page at `survey/thanks/index.html`. It uses Netlify Forms (no external survey vendor or added dependencies) and does not collect email addresses. Form detection has been enabled in the site's Forms settings; after deployment, confirm that the form appears in the Netlify dashboard before sharing the survey. Review responses in the Netlify dashboard and follow applicable privacy and retention policies.

## Connect Square checkout

Checkout is created server-side by the Netlify Function in `../netlify/functions/create-square-checkout.mjs`. Square account credentials are never sent to the browser. The function accepts retail quantities from 1 to 999, confirms the configured Square catalogue variation is priced at £7.99, and creates a Square-hosted checkout asking for the shipping address.

1. Create a Square account and complete Square's business verification. Square currently requires the account owner to verify their identity and link a bank account before accepting payments. Connect the Tide business account for payouts; do not send identity documents, bank details or payment credentials in chat.
2. Add the Butter Boys Chicken Kit in the Square Dashboard at £7.99, set up inventory and free-delivery fulfilment, and note the item's variation ID and the relevant location ID.
3. Free delivery was selected. Set `SQUARE_SHIPPING_FEE_PENCE` to `0` in Netlify. The current integration supports only one fixed delivery fee per order; if that policy changes or delivery fees need to vary by destination, update and test the checkout before enabling payments.
4. In the Netlify site's environment-variable settings, set `SQUARE_ACCESS_TOKEN`, `SQUARE_LOCATION_ID`, `SQUARE_ITEM_VARIATION_ID`, `SQUARE_ENVIRONMENT`, and `SQUARE_SHIPPING_FEE_PENCE`. Use a sandbox token with `SQUARE_ENVIRONMENT=sandbox` for testing; use a production token and `SQUARE_ENVIRONMENT=production` only when ready to accept real payments.
5. Keep `SQUARE_ACCESS_TOKEN` only in Netlify's encrypted environment-variable settings. Never put it in this repository, `square-config.js`, browser code, or a public message.
6. After the production function is configured and tested, change `checkoutEnabled` to `true` in `square-config.js` and deploy the site. Retail checkout remains disabled by default.
7. Test an order end-to-end, including the selected quantity, shipping address, free delivery, tax, payment methods, Square order notifications and payout to the Tide account. Confirm Square shows the correct amount and settings before enabling live checkout.

Netlify Functions run from the repository root under `netlify/functions/`; no dependencies or build command are required. Set environment variables for the Functions runtime and redeploy after changing them. The client routes quantities of 1,000 or more to wholesale contact, and the function independently rejects those quantities.

The pack image is explicitly labelled as a packaging preview.

The web recipe follows the owner-supplied blend quantities and method. The three preparation cards show the method and pack totals; the full ingredient-name list is in the Ingredients & allergens section without individual component weights. Before printing or publishing final pack instructions, professionally validate the recipe and frying guidance, the required food-safety checks, allergen declaration and final net weight. The supplied blend weights (18 g + 138 g + 45 g) add up to 201 g while the stated retail net weight is 200 g. The listed component gram amounts also total 17.3 g for the 18 g marinade blend, 134.6 g for the 138 g dry mix, and 44 g for the 45 g wet dredge; confirm whether these differences are rounding, omitted ingredients or require a correction. Confirm allergens against the final recipe and supplier specifications before sale.

## Route in the Butter Boys production site

In the Butter Boys production repository, keep these files in the `shop/` directory so the shop is available at `https://butterboyschicken.com/shop/`. The existing root `index.html` stays unchanged and no homepage link is added. The root `index.html` and the existing root logo image must stay in place.

This shop page is built into the Netlify-connected GitHub repository. Do not change DNS or email records as part of payment setup.
