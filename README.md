# The Implant Standard — website

Static site. No build step required.

## Deploy on GitHub Pages
1. Upload the contents of this folder to the root of your repository.
2. Repo Settings → Pages → Source: "Deploy from a branch" → branch `main`, folder `/ (root)`.
3. Site serves at your Pages URL. Point the custom domain when ready.

## Structure
- `index.html` — homepage
- `single-tooth-implants.html`, `all-on-4.html`, `implant-supported-dentures.html`, `crowns-and-bridges.html`, `full-mouth-restorative.html`, `sleep-dentistry.html` — service pages
- `dr-hyun-soo-yu.html`, `dr-nelson-ung.html`, `dr-david-kim.html` — dentist profiles
- `assets/css/styles.css`, `assets/js/site.js`, `assets/img/`

## SEO
- `sitemap.xml` and `robots.txt` are included. Canonical URLs, Open Graph/Twitter share tags, favicons and JSON-LD structured data (LocalBusiness/Dentist, FAQ, breadcrumbs, procedures, dentist Person profiles) are baked into every page.
- **Domain**: everything currently points to `https://theimplantstandard.com.au`. If the final domain differs, find-and-replace that string across all files (or update `DOMAIN` in the build script and re-run).
- 22 suburb landing pages (`dental-implants-<suburb>.html`) target "dental implants [suburb]" around both clinics, linked from the homepage Areas section, `areas-we-serve.html` and the footer.
- After launch: submit `sitemap.xml` in Google Search Console, and create/link Google Business Profiles for both locations.

## Performance
- Fonts are self-hosted (subset woff2 in `assets/fonts/`) — no Google Fonts requests, no render-blocking third-party CSS.
- All local images are responsive WebP (480/800/1200 srcset) with explicit dimensions; service-page hero images are high-priority, everything below the fold lazy-loads.
- The biggest remaining weight is the hotlinked doctor portraits and before/after images from the live sites (~300KB+ PNGs). Rehosting them as compressed WebP at launch is the last step to a top mobile score.

## Before launch
- Wire the "See if you qualify" form to SmileOx — see the TODO in `assets/js/site.js` (currently shows a success state only).
- Doctor portraits and before/after images are hotlinked from greystreetdentist.com.au / synergydentalgroup.com.au — rehost locally at launch.
- Confirm GA availability per location and hours if they change (open-now logic hours are set in `site.js`).
