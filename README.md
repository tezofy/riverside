# Riverside Racing Syndicate

A responsive, static website for a thoroughbred racing syndicate. Plain HTML, CSS and JavaScript. No npm packages, build tools or server are required.

## Pages

| File | Page |
|---|---|
| `public/index.html` | Home (hero slider, experience, our horses, FAQ, enquiry form) |
| `public/about.html` | About us (story, mission, upcoming horses) |
| `public/contact.html` | Contact (enquiry form: name, email, phone, optional message) |
| `public/privacy.html` | Privacy policy (needs legal review before launch) |
| `public/404.html` | Page shown for missing URLs (not indexed) |

## Project structure

```
public/                        # the website (this is what gets deployed)
├── index.html, about.html, contact.html, privacy.html, 404.html
├── robots.txt, sitemap.xml
└── assets/
    ├── css/                   # one stylesheet per layer (see note below)
    ├── js/                    # form, navigation, hero slider, join popup, animations
    ├── images/                # photos, AI-generated images and icons (WebP)
    ├── video/                 # FAQ racing video (MP4)
    └── fonts/                 # locally hosted fonts (Open Sans, Inter)
licenses/                      # font licence files (SIL Open Font License 1.1)
SETUP.md                       # handover guide for the client
README.md
```

**Stylesheet order matters.** Each HTML file links its stylesheets in a fixed order; later files override earlier ones. Keep that order when editing. The `?v=` numbers on stylesheet links are cache-busters: increase the number after you change a CSS or JS file.

## Typography

- Titles (h1–h4): Open Sans, bold.
- Body text, buttons and form fields: Inter.
- Both fonts are bundled in `public/assets/fonts/`. No external font requests are made.

## Enquiry forms

The Home and Contact forms are **not yet connected to an inbox**. Create a form with Formspree (or a compatible service), verify the receiving address, then set the endpoint in `public/assets/js/app.js`:

```js
var FORM_ENDPOINT = 'https://formspree.io/f/your-form-id';
```

The value is empty until this is done, so visitors see a "temporarily unavailable" message. Test both forms after deployment and confirm the email arrives. Do not place secret API keys in browser-side files.

## Before publishing

- **Client details:** legal entity name, registered address, registration number, jurisdiction, and contact email/phone (footer, privacy policy and structured data).
- **Privacy policy:** `public/privacy.html` is a draft and needs legal review.
- **Social links:** footer Facebook, Instagram, YouTube and X icons are placeholders. Add real profile URLs to all pages when available.
- **Imagery:** horse images and the racing video are AI-generated illustrations, not photographs of the syndicate's horses. Replace them with real photos when available, keeping the same filenames or updating the references.
- **Domain:** the sitemap, robots.txt, canonical links, Open Graph URLs and structured data use `https://riverside-c27.pages.dev`. Replace this with the final domain everywhere before launch.
- **Join popup:** opens once per browser session after the visitor scrolls about a third of the page. Confirm the wording and design with the client.

## Editing

- Page content: the `.html` files in `public/`. Keep the surrounding tags intact.
- Styling: `public/assets/css/`.
- Behaviour: `public/assets/js/`.
- Images: `public/assets/images/`. If a filename changes, update every reference in the HTML and CSS.
- The header, footer and join popup are repeated in each HTML page. Apply changes to every page.

## Local preview

From the repository root:

```
python3 -m http.server 8000 --directory public
```

Then open `http://localhost:8000`.

## Deploy with Cloudflare Pages

1. In the Cloudflare dashboard, go to **Workers & Pages → Create application → Pages → Import an existing Git repository**.
2. Connect GitHub and select this repository.
3. Use these build settings:

| Setting | Value |
|---|---|
| Framework preset | None |
| Production branch | `main` |
| Build command | `exit 0` |
| Build output directory | `public` |
| Root directory | Leave blank (repository root) |

4. Select **Save and Deploy**. Later commits to `main` deploy automatically.
5. For your own domain, open **Custom domains** in the Pages project and follow Cloudflare's DNS instructions.

Cloudflare documentation: https://developers.cloudflare.com/pages/framework-guides/deploy-anything/

## Upload to GitHub

1. Extract the ZIP file.
2. Upload the contents of the extracted folder (`public/`, `licenses/`, `README.md`, `SETUP.md`) to the root of the repository, on the `main` branch.
3. Do not upload the ZIP file itself as the website.

## Licences

- Open Sans and Inter are licensed under the SIL Open Font License 1.1. See `licenses/`.
- Site code and content: © Riverside Racing Syndicate. Add the client's licence or copyright statement before publishing.
