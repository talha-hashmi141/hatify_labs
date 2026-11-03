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

The form posts to `POST /api/contact`. The route validates the input on the server with the same rules as the client (`src/lib/contact.ts`), has a honeypot and a per-instance rate limit, and sends email through the [Resend](https://resend.com) HTTP API. It adds no SDK dependency.

Copy `.env.example` to `.env.local` (and add the same variables in Vercel → Settings → Environment Variables):

```
RESEND_API_KEY=...
CONTACT_TO_EMAIL=team@hatifylabs.com
CONTACT_FROM_EMAIL="Hatify Labs Website <website@hatifylabs.com>"
```

`CONTACT_FROM_EMAIL` must be on a domain verified in Resend. Until all three are set, the API returns `503 not_configured` and the form tells the visitor plainly that the message was **not** sent, with direct contact options. It never shows a false success.
