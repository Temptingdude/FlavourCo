# FlavourCo — Static Website

A clean, mobile-first static website for FlavourCo, a frozen food brand in Pakistan.

What's included:
- `index.html`, `products.html`, `about.html`, `contact.html`
- `css/style.css` — responsive, mobile-first styles
- `js/main.js` — small handlers for contact form and UI
- `assets/images` — SVG placeholders and logo

Run locally (quick):

```bash
# from workspace root
python3 -m http.server 8000
# then open http://localhost:8000
```

Notes:
- WhatsApp number is set to `+92 339 0791989` in `index.html` and `contact.html`.
- The contact form currently opens the user's mail client as a fallback; can be connected to a backend or third-party form service later.
- Designed for local SEO in Pakistan: edit meta descriptions and keywords in each HTML file as needed.
 - Serverless form example: the contact and quick-order forms include a `data-endpoint` and `action` configured for Formspree. Replace `https://formspree.io/f/yourFormID` with your Formspree form ID (or another endpoint) to receive submissions directly.
 - Product data is stored in `assets/data/products.json` and used to populate `products.html` and `order.html`. Add or update product entries there.

Deploying to GitHub Pages
 - A GitHub Actions workflow is included at `.github/workflows/deploy.yml`. On every push to `main` the site will be deployed to GitHub Pages (site content = repository root).
 - To publish to a custom domain (example: flavourco.pk):
	 1. Add your domain in the repository Settings → Pages (or create a `CNAME` file containing your domain at the repository root).
	 2. For an apex domain (flavourco.pk) set A records to GitHub Pages IPv4 addresses: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
	 3. For a subdomain (www.flavourco.pk) create a `CNAME` DNS record pointing to `<your-github-username>.github.io`.
	 4. Allow DNS to propagate, then verify in Settings → Pages that the custom domain is active and HTTPS is enabled.

Domain setup status:
 - Custom domain: `flavourco.store` — a `CNAME` file has been added to the repository root with this domain. GitHub Pages will pick this up on the next deploy.
 - Next DNS step (apex domain): add A records to the GitHub Pages IPv4 addresses: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
 - If you prefer `www.flavourco.store` as the public hostname, create a `CNAME` record for `www` pointing to `<your-github-username>.github.io` and set an HTTP redirect from the apex to `www` at your registrar.
 - After DNS propagates, verify the domain in the repository Settings → Pages and enable HTTPS (GitHub will provision a TLS certificate).

If you want, I can also push a commit that creates a `www` redirect page or help configure DNS at your registrar if you provide access.
