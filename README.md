# Hatify Labs — website

Marketing site and portfolio for Hatify Labs. Next.js 16 (App Router), Tailwind CSS v4, framer-motion, lucide-react.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Editing content

All content lives in `src/data/*.json` and is typed in `src/lib/types.ts`. Nothing on the site is hard-coded per client.

| File | What it controls |
| --- | --- |
| `site.json` | Name, tagline, contact channels, social links, navigation, placeholder switch |
| `services.json` | The 11 service pages (`/services/[slug]`) |
| `projects.json` | Case studies (`/work/[slug]`): overview, problem, solution, architecture, stack, features, results, media |
| `testimonials.json` | Client quotes, linked to case studies by `projectSlug` |
| `clients.json` | Client logo wall on the home page |
| `achievements.json` | Company facts and figures (About section and the About page) |
| `capabilities.json`, `process.json`, `faq.json` | Technical capabilities, delivery process, FAQ |

### Placeholders and verification

The site never shows an unverified claim as fact. Pending content renders as a dashed **placeholder** slot, which is easy to spot in the browser and to find in the DOM (`[data-placeholder]`).

- **Metrics** (`results` in projects, `achievements.json`): set `value` **and** `verified: true`, and add a `source`. Unverified metrics never show a number.
- **Clients**: set `client` and `clientApproved: true` on a project, and `name`, `logo` (e.g. `/clients/acme.svg` in `public/`) and `approved: true` in `clients.json`.
- **Testimonials**: fill `quote`, `author`, `role` and `company`, then set `approved: true` only once written client approval is on file.
- **Screenshots**: put images in `public/work/<slug>/` and set `media.cover` and the `gallery[].src` paths.
- **Live demos**: set `links.live`.
- **Contact details / socials**: set `value`, `href` and `verified: true` in `site.json → contact`; set `href` for socials. Socials with `href: null` are not rendered.

`site.content.showPlaceholders` toggles every placeholder at once:
- `true` (current): pending items are visible as placeholders, which is useful while collecting content.
- `false`: pending items are hidden entirely, so you can publish before all content has arrived.

### Logo

`src/components/brand/Logo.tsx` and `src/app/icon.svg` contain a vector redraw of the brand mark. If an official SVG export exists, replace the paths in both files.

## Contact form email

The form posts to `POST /api/contact`. The route validates the input on the server with the same rules as the client (`src/lib/contact.ts`), has a honeypot and a per-instance rate limit, and sends email over SMTP with [Nodemailer](https://nodemailer.com), so any mailbox provider works (Gmail, Outlook/365, Zoho, your host's mail server).

Copy `.env.example` to `.env.local` (and add the same variables in Vercel → Settings → Environment Variables):

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=website@hatifylabs.com
SMTP_PASS=...            # Gmail: an App Password, not the normal password
CONTACT_TO_EMAIL=team@hatifylabs.com,other@hatifylabs.com
# CONTACT_FROM_EMAIL="Hatify Labs <hello@hatifylabs.com>"   # optional, defaults to SMTP_USER
```

Optional: `CONTACT_AUTOREPLY=true` also sends the visitor a short confirmation email. A failed confirmation is only logged, because the enquiry has already been delivered. SMTP has no built-in duplicate protection, so the route remembers what it has sent: an identical submission within 24 hours, or one still being sent, is not sent again. This memory is per server instance and resets on restart.

`CONTACT_FROM_EMAIL` must be `SMTP_USER` or an alias your provider lets that mailbox send as. Otherwise the provider rejects or rewrites it. The route runs on the Node.js runtime, because Nodemailer can't run on Edge. Until `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS` and `CONTACT_TO_EMAIL` are set, the API returns `503 not_configured` and the form tells the visitor plainly that the message was **not** sent, with direct contact options. It never shows a false success.
