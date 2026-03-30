# SEO audit & recommendations — S&S Associates

This checklist complements the implemented SEO stack (`app/sitemap.js`, `app/robots.js`, metadata, JSON-LD, `scripts/generate-seo.js`). Use it for periodic reviews and before major launches.

---

## Implemented (baseline)

| Item | Location / behaviour |
|------|----------------------|
| Dynamic `robots.txt` | `src/app/robots.js` — allows public site, blocks `/user/`, `/api/`, `/login`, `/setup` |
| Dynamic `sitemap.xml` | `src/app/sitemap.js` — static routes + MongoDB `services` / `projects` with `lastModified` |
| Static mirrors (optional) | `npm run seo` writes `seo-static/*` for FTP/nginx — **never** `public/robots.txt` or `public/sitemap.xml` (Next.js conflict) |
| Public reference copies | `public/seo/robots-reference.txt` & `public/seo/sitemap-static.xml` — **different URLs** (`/seo/...`) so no conflict; for docs / static hosting handoff |
| Site URL | `NEXT_PUBLIC_SITE_URL` (default `https://www.ssassociates.com`) — **set in production** |
| Global metadata | Root + `(website)/layout.js` — `metadataBase`, title template, description, OG, Twitter, keywords |
| Per-page metadata | Home, about, services list, projects list, contact, privacy, terms — title, description (≤160 chars), canonical |
| Dynamic metadata | `/services/[id]`, `/projects/[id]` — DB-driven title/description, OG/Twitter images, canonical |
| JSON-LD | `src/components/seo/SEO.js` — Organization, LocalBusiness, WebSite (layout); Service + Breadcrumb; CreativeWork + Breadcrumb (projects) |
| Hreflang (single locale) | `alternates.languages`: `en`, `en-US`, `x-default` → same canonical origin |
| Noindex private areas | `(user)/layout.js`, `(auth)/layout.js`, `setup/page.js` — `robots: noindex, nofollow` |
| Build hook | `prebuild` → `node scripts/generate-seo.js` |

---

## Heading structure (recommendations)

- [ ] **H1**: One clear H1 per public page (landing sections sometimes use styled `Typography`; ensure a single logical H1 for crawlers).
- [ ] **Hierarchy**: Avoid skipping levels (H1 → H2 → H3). Audit `LandingPage`, `About`, `Services`, `Projects`, `Contact`.
- [ ] **Project / service detail**: Ensure the main title is an H1 (or equivalent semantic heading) in `Banner` / hero components.

---

## Images & media

- [ ] **Alt text**: All meaningful images should have descriptive `alt` (project cards already use `project.title`; extend to gallery thumbs and icons where missing).
- [ ] **Lazy loading**: Project listing uses `next/image` with `priority` only for the first cards — good pattern; apply similarly on services listing if large grids exist.
- [ ] **Dimensions**: Prefer explicit `width`/`height` or `fill` + `sizes` to reduce CLS (LCP/CLS affect SEO indirectly).

---

## Internal linking

- [ ] Footer and navbar already link to core pages — keep **Projects ↔ Services** cross-links in body copy where relevant.
- [ ] From long **project descriptions**, link to related **service** pages (and vice versa) using descriptive anchor text.
- [ ] Add a small “Related projects” block on service pages (optional feature).

---

## Performance & Core Web Vitals

- [ ] Enable **production** caching headers on CDN for static assets.
- [ ] **Minification**: Next.js minifies JS/CSS in production by default — avoid shipping huge client bundles on the landing page (dynamic import heavy sections if needed).
- [ ] **Fonts**: `next/font` is in use — good; subset weights actually used.
- [ ] **Third-party scripts**: Defer non-critical widgets; audit GTM/analytics if added later.

---

## Schema & rich results

- [ ] Validate live URLs with [Google Rich Results Test](https://search.google.com/test/rich-results) and [Schema.org Validator](https://validator.schema.org/).
- [ ] **LocalBusiness**: Update `src/lib/seo-schemas.js` with real **street address**, **postal code**, **geo coordinates** (`geo` / `GeoCoordinates`) when available.
- [ ] **Organization.sameAs**: Add Facebook, LinkedIn, etc., in `buildOrganizationSchema` once URLs are final.
- [ ] **Twitter** `site` handle in layout metadata — replace placeholder if you use a real `@handle`.

---

## Search Console & analytics

- [ ] Submit **sitemap** `https://<your-domain>/sitemap.xml` in Google Search Console.
- [ ] Confirm **domain property** or URL-prefix property matches `NEXT_PUBLIC_SITE_URL`.
- [ ] Monitor **coverage** for `/user/*` — should show excluded/blocked (noindex + robots disallow).

---

## Content & copy

- [ ] Keep meta descriptions **unique** per URL; avoid duplicate titles across dynamic project/service pages.
- [ ] **Project** summaries for SERPs use `description` or `tagline` (truncated) — ensure first ~160 characters are compelling.
- [ ] Legal pages: keep titles distinct (“Privacy policy” vs “Terms & conditions”).

---

## Security / accidental indexing

- [ ] Never remove `robots` noindex from `(user)` or `(auth)` layouts.
- [ ] API routes under `/api/*` are disallowed for crawlers; they are not HTML — good.

---

## Environment checklist (production)

```bash
NEXT_PUBLIC_SITE_URL=https://www.ssassociates.com
MONGODB_URI=mongodb+srv://...
# Optional — adds <meta name="google-site-verification"> in page source for Search Console
GOOGLE_SITE_VERIFICATION=your_token_here
# or NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=...
BING_SITE_VERIFICATION=your_msvalidate_token
# Optional Twitter cards
NEXT_PUBLIC_TWITTER_HANDLE=@YourHandle
```

- [ ] **Vercel**: Add the same variables under Project → Settings → Environment Variables (Production + Preview as needed). Crawlers use the **deployed** HTML; wrong `NEXT_PUBLIC_SITE_URL` breaks canonical and Open Graph URLs.
- [ ] `NEXT_PUBLIC_SITE_URL` must match the **canonical** public origin (no trailing slash).
- [ ] `npm run seo` with `MONGODB_URI` set regenerates `seo-static/sitemap.xml` including all service/project IDs for offline mirrors.

### View Page Source (what crawlers see)

- Public marketing routes are **server-rendered**; **View Page Source** shows the full `<head>` (title, meta description, robots, OG, Twitter, geo, keywords) plus `<body>` including **pretty-printed `application/ld+json`** blocks.
- **Googlebot** does not execute JavaScript for all pages the same way; static HTML + metadata in the initial response is what you want — this setup keeps SEO data in the first HTML payload.

---

## Manual verification commands

```bash
npm run seo          # Regenerate seo-static/* + log sample JSON-LD (no public/ — avoids Next conflict)
npm run build        # Runs prebuild (seo) then next build
```

After deploy, curl checks:

```bash
curl -sS https://www.ssassociates.com/robots.txt | head
curl -sS https://www.ssassociates.com/sitemap.xml | head
```

---

## Summary

The codebase now has **App Router–native** SEO (metadata API, `sitemap.js`, `robots.js`), **structured data** for key templates, and **automation** for static SEO files. Remaining work is mostly **content** (headings, alt text, real address/social), **Search Console** setup, and ongoing **performance** monitoring.
