# Riverside Racing Syndicate — Website Setup & Handover

This is a fast, static website (plain HTML, CSS and JavaScript). No database or server is needed.

## 1. Files
| File | What it is |
|---|---|
| `index.html` | Landing page |
| `about.html` | Our story, values and upcoming horses |
| `contact.html` | Enquiry form (name, email, phone, optional message) |
| `privacy.html` | Privacy policy (review before launch — see section 5) |
| `404.html` | Page shown for missing URLs |
| `robots.txt`, `sitemap.xml` | Search engine files |
| `assets/images/` | All photos and graphics |
| `assets/css/site-*.css` | Styling (one bundle per page) |
| `assets/js/app.js` | Enquiry form behaviour (see section 3) |

## 2. Changing text
Open the `.html` file in any text editor, find the sentence, edit it, and save. Keep the surrounding tags (for example `<p>` ... `</p>`) intact.

## 3. Connecting the enquiry form (required before launch)
Enquiries will not reach your inbox until this step is done. Visitors currently see "enquiries are temporarily unavailable".

1. Create a free account at https://formspree.io and create a new form. Set the notification email to your inbox and verify it.
2. Copy the form endpoint (looks like `https://formspree.io/f/abcd1234`).
3. Open `assets/js/app.js` and set:
   `var FORM_ENDPOINT = 'https://formspree.io/f/abcd1234';`
4. Submit a test enquiry from the live contact page and confirm it arrives.

Any other form service (Netlify Forms, your own email API) can be used the same way: it only needs to accept a POST of the form data and return a success response.

## 4. Changing images
- Replace a file in `assets/images/` using the **same file name** and a similar shape/size. The layout will stay the same.
- Recommended: JPG for photos (around 1600–2000 px wide, under 300 KB), WebP or PNG for logos and cut-outs.
- Every image has an `alt` text in its `<img>` tag. Update it to describe the new photo.
- To use a new file name, update the name in the `src="..."` attribute of the `<img>` tag.

## 5. Before you launch — checklist
- [ ] Form endpoint set in `assets/js/app.js` and a test enquiry received
- [ ] `privacy.html` reviewed by a qualified adviser for your jurisdiction (the text is a general template)
- [ ] Legal entity name, registered address and any regulatory/licence details added (not yet on the site)
- [ ] Social media links added to the footer (currently "coming soon")
- [ ] Domain set: replace `https://riverside-c27.pages.dev` with your final domain in `sitemap.xml`, `robots.txt`, and the `canonical` / `og:url` / JSON-LD values in each page `<head>`
- [ ] Real racing photos swapped in for any illustrative or AI-generated images

## 6. Publishing
The easiest route is **Cloudflare Pages** (free):
1. Create a Cloudflare Pages project and choose "Direct upload".
2. Upload the whole folder (or the zip file).
3. Add your custom domain in the project settings.

Netlify or any static host also works. After every change, re-upload the folder.

## 7. Notes
- Clean URLs are used (e.g. `/about`, `/contact`). `.html` links also work.
- Racing returns are uncertain. The FAQ states this clearly. Keep any new copy consistent with it.
