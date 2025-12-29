# Payment configuration

This file describes where to update the payment details used by the site. The live site and the frontend read payment display values from `assets/data/payment.json`.

To update the payment details:

- Edit `assets/data/payment.json` and replace the placeholder numbers with your real numbers:
  - `jazzcash_number` — your JazzCash phone or merchant number (include country code, e.g. +92 ...)
  - `easypaisa_number` — your Easypaisa phone number
  - `bank.account_title` — account holder name
  - `bank.account_number` — account or IBAN
  - `bank.iban` — IBAN if you prefer to show it
  - `bank.bank_name` — bank name

After saving the file, deploy the site (merge the branch and deploy to Netlify or your hosting). The frontend will read the new values automatically.

Notes:
- For now, these values are display-only. The serverless functions will provide instructions and accept receipt uploads but will NOT initiate automated transfers.
- Fields marked beta are placeholders for future API integrations (JazzCash/Easypaisa merchant APIs).
