# Deploy notes

- Branch: redesign/payment-manual-flow
- Host recommended: Netlify (supports static + Netlify Functions)

Environment variables for functions (set these in Netlify site settings > Build & deploy > Environment):
- ADMIN_EMAIL — email that receives order notifications
- SENDGRID_API_KEY — (optional) SendGrid API key to send emails and receipt attachments
- SUPABASE_URL — (optional) Supabase project URL if you want to store orders
- SUPABASE_SERVICE_ROLE_KEY — (optional) Supabase service role key for server-side inserts
- SITE_URL — public URL of the site (https://flavourco.store)

Functions endpoints after deploy (Netlify):
- /.netlify/functions/create-order
- /.netlify/functions/upload-receipt

Testing:
1. Deploy the branch to Netlify or merge to main and deploy.
2. Set environment variables in Netlify.
3. Fill the order form and submit. If SendGrid is configured you will receive admin emails; otherwise create-order will still return an orderId.
