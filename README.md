# Riverside Racing Syndicate

A responsive, three-page static website for a thoroughbred racing syndicate. The pages, styles, scripts, images, and fonts are organized into separate files. No npm dependencies or build framework are required.

## Project structure

```text
public/
├── index.html                 # Home page
├── about.html                 # About page
├── contact.html               # Contact page
└── assets/
    ├── css/                   # Page and section styles
    ├── js/                    # Form, navigation, slider, and animations
    ├── images/                # Images and AI-generated icons
    └── fonts/                 # Locally hosted fonts
licenses/                      # Font license files
README.md
```

The CSS files represent different design layers and updates. Keep the stylesheet order in each HTML file: later files may override earlier styles. The latest designs and animations include `horses-premium.css`, `experience-icons-upgrade.css`, `scroll-and-logo-motion.css`, and `icon-motion.css`.

## Upload to GitHub

1. Extract the ZIP file.
2. Create a new GitHub repository.
3. Upload the `public` and `licenses` folders and `README.md` from inside the extracted folder to the root of the repository. Do not upload the ZIP itself as the website.
4. Commit the files to the `main` branch. If you use a different branch, select that branch in Cloudflare Pages.

## Deploy with Cloudflare Pages

1. In the Cloudflare dashboard, go to **Workers & Pages → Create application → Pages → Import an existing Git repository**.
2. Connect GitHub and select the repository.
3. Use these build settings:

| Setting | Value |
| --- | --- |
| Framework preset | None |
| Production branch | `main` (or your chosen branch) |
| Build command | `exit 0` |
| Build output directory | `public` |
| Root directory | Leave blank / repository root |

4. Select **Save and Deploy**. Once the deployment succeeds, Cloudflare will provide a `*.pages.dev` address. Subsequent GitHub commits trigger new deployments.
5. To use your own domain, open **Custom domains** in the Pages project and follow Cloudflare's DNS instructions.

Cloudflare documentation: https://developers.cloudflare.com/pages/framework-guides/deploy-anything/

## Before publishing

### Connect the enquiry forms

The Home and Contact forms are not currently connected to an inbox. Create a form with Formspree or a compatible service and verify the receiving email address. Then open `public/assets/js/app.js`, find:

```js
const FORM_ENDPOINT = '';
```

Replace the empty value with your own verified HTTPS endpoint. For example:

```js
const FORM_ENDPOINT = 'https://formspree.io/f/your-form-id';
```

The URL above is only an example, not a working endpoint. After deployment, test both forms and confirm email delivery. Add an appropriate privacy notice, consent mechanism, and spam protection as needed. Do not put secret API keys in browser-side files.

### Social links

The Facebook, Instagram, YouTube, and X icons in the footer are placeholders. Add the actual profile URLs to all three HTML pages when available.

### Branding and imagery

The horse images are AI-generated illustrations, not actual syndicate horses. The Riverside name, logo, and horse statuses are concepts or placeholders. Replace or approve these assets and verify the content before publishing.

### SEO

Each page has its own HTML URL and description. Review the final domain, canonical URLs, sitemap, meta descriptions, and brand information before launch.

## Editing

- Edit page content in the three HTML files under `public/`.
- Edit design styles in `public/assets/css/`.
- Edit functionality in `public/assets/js/`.
- Replace images in `public/assets/images/`. If a filename changes, update its references in the HTML and CSS files.
- The header and footer are repeated in each HTML page. Apply any changes consistently across all three pages.

## Local preview

From the repository folder, run:

```bash
python3 -m http.server 8000 --directory public
```

Then open `http://localhost:8000` in your browser.
