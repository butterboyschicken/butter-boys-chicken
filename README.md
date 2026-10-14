# Butter Boys Chicken

A lightweight, static site for the Butter Boys Chicken three-pouch spice kit. No install or build step is required.

## Pages

- `/` — coming-soon landing page.
- `/shop/` — retail product details and wholesale enquiry page.
- `/survey/` — anonymous market-research survey.

The existing homepage remains unchanged; the shop is available directly at `/shop/`.

## Market research survey

The anonymous survey at `/survey/` is collected by Netlify Forms. Form detection is enabled for this site; after deployment, confirm that `butter-boys-market-research` appears in Netlify's Forms dashboard. The survey does not request email addresses.

## Square checkout

Retail checkout uses a Netlify Function to create a Square-hosted checkout session for the selected quantity. It remains disabled until `shop/square-config.js` enables it and the Square credentials, location ID and item variation ID are set as Netlify environment variables. Never put private Square credentials in the static site. Configure shipping, tax, inventory, order notifications and legal policies in Square before taking orders.

Orders of 100 kits or more are routed to the Butter Boys wholesale email. Confirm final approved product ingredients, allergens, nutrition and handling information before opening sales.

See `shop/README.md` for Square account setup, required Netlify environment variables and checkout activation steps.

## Product imagery

`shop/assets/butter-boys-packaging-preview.jpg` is a packaging mockup and is labelled as a preview on the product page. Replace it with approved final product photography before public sales.
