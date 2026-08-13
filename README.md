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

## Before launch
- Wire the "See if you qualify" form to SmileOx — see the TODO in `assets/js/site.js` (currently shows a success state only).
- Doctor portraits and before/after images are hotlinked from greystreetdentist.com.au / synergydentalgroup.com.au — rehost locally at launch.
- Confirm GA availability per location and hours if they change (open-now logic hours are set in `site.js`).
