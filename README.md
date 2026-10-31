# Riverside Racing Syndicate — ওয়েবসাইট ফাইল

এই ফোল্ডারে ওয়েবসাইটের তিনটি পেজ, CSS, JavaScript, ছবি ও ফন্ট আলাদা করে সাজানো আছে। এটি একটি static site; npm বা কোনো build framework প্রয়োজন নেই।

## ফোল্ডারের গঠন

```text
public/
├── index.html                 # Home
├── about.html                 # About
├── contact.html               # Contact
└── assets/
    ├── css/                   # পেজ ও সেকশনভিত্তিক স্টাইল
    ├── js/                    # ফর্ম, নেভিগেশন, স্লাইডার ও অ্যানিমেশন
    ├── images/                # ছবি ও AI আইকন
    └── fonts/                 # ব্যবহৃত ফন্ট
licenses/                      # ফন্টের লাইসেন্স
README.md
```

CSS ফাইলগুলো ডিজাইনের বিভিন্ন স্তর ও আপডেট অনুযায়ী সাজানো। প্রতিটি HTML ফাইলে stylesheets যে ক্রমে আছে, সেই ক্রম বজায় রাখুন; পরের ফাইল আগের স্টাইল সংশোধন করতে পারে। `horses-premium.css`, `experience-icons-upgrade.css`, `scroll-and-logo-motion.css` এবং `icon-motion.css` সর্বশেষ ডিজাইন ও অ্যানিমেশনগুলোর অংশ।

## GitHub repository-তে আপলোড

1. ZIP আনজিপ করুন।
2. GitHub-এ একটি নতুন repository তৈরি করুন।
3. আনজিপ করা ফোল্ডারের **ভেতরের** `public`, `licenses` ও `README.md` repository-র মূল স্তরে আপলোড করুন। ZIP ফাইলটি সরাসরি repository-তে আপলোড করবেন না।
4. পরিবর্তনগুলো `main` branch-এ commit করুন। অন্য branch হলে Cloudflare-এ সেটি নির্বাচন করুন।

## Cloudflare Pages-এ লাইভ করুন

1. Cloudflare dashboard-এ **Workers & Pages → Create application → Pages → Import an existing Git repository** নির্বাচন করুন।
2. GitHub সংযুক্ত করে এই repository নির্বাচন করুন।
3. Build settings:

| সেটিং | মান |
| --- | --- |
| Framework preset | None |
| Production branch | `main` (অথবা আপনার branch) |
| Build command | `exit 0` |
| Build output directory | `public` |
| Root directory | খালি / repository root |

4. **Save and Deploy** চাপুন। সফল হলে `*.pages.dev` ঠিকানা পাওয়া যাবে। GitHub-এ নতুন commit করলে Cloudflare আবার deploy করবে।
5. নিজস্ব ডোমেইন ব্যবহার করতে Pages project-এর **Custom domains** থেকে সেটি যুক্ত করুন এবং Cloudflare-এর নির্দেশনা অনুযায়ী DNS কনফিগার করুন।

Cloudflare নির্দেশনা: https://developers.cloudflare.com/pages/framework-guides/deploy-anything/

## পরিবর্তন ও প্রকাশের আগে করণীয়

- **Contact ও Home ফর্ম:** বর্তমানে কোনো inbox-এ বার্তা পাঠায় না। Formspree বা সামঞ্জস্যপূর্ণ form service-এ ফর্ম তৈরি ও প্রাপক ইমেইল যাচাই করে `public/assets/js/app.js`-এ `const FORM_ENDPOINT = '';` খুঁজে আপনার HTTPS endpoint বসান। যেমন `const FORM_ENDPOINT = 'https://formspree.io/f/your-form-id';`—এটি উদাহরণ, আপনার আসল endpoint ব্যবহার করুন। প্রকাশের পর দুটি ফর্ম ও ইমেইল ডেলিভারি পরীক্ষা করুন। প্রয়োজন অনুযায়ী privacy notice, consent ও spam protection যুক্ত করুন। গোপন API key browser-side ফাইলে রাখবেন না।
- **Social links:** footer-এর Facebook, Instagram, YouTube ও X placeholder; আসল URL পাওয়া গেলে তিনটি HTML পেজেই উপযুক্ত লিংক যুক্ত করুন।
- **ছবি ও ব্র্যান্ডিং:** ঘোড়ার ছবিগুলো AI-generated illustration; এগুলো আসল syndicate horse নয়। Riverside নাম, লোগো এবং ঘোড়ার স্ট্যাটাস placeholder/concept; প্রকাশের আগে ক্লায়েন্টের অনুমোদিত পরিচয়, ছবি ও তথ্য যোগ করুন।
- **SEO:** তিন পেজের নিজস্ব HTML URL ও description আছে। প্রকাশের আগে চূড়ান্ত domain, canonical URL, sitemap, meta descriptions ও ব্র্যান্ড তথ্য পর্যালোচনা করুন।
- **সম্পাদনা:** পেজের কনটেন্ট HTML-এ, ডিজাইন `assets/css/`-এ, ফাংশন `assets/js/`-এ এবং ছবি `assets/images/`-এ পরিবর্তন করুন। ফাইলের নাম পরিবর্তন করলে HTML/CSS-এর path-ও বদলাতে হবে। Header/footer প্রতিটি HTML পেজে আলাদা, তাই পরিবর্তন তিন জায়গাতেই মিলিয়ে করুন।

## লোকাল প্রিভিউ

টার্মিনালে repository folder থেকে:

```bash
python3 -m http.server 8000 --directory public
```

তারপর `http://localhost:8000` খুলুন।
