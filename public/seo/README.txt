S&S Associates — public/seo/ (reference assets)
==============================================

Why not robots.txt / sitemap.xml here?
--------------------------------------
Next.js 16 serves these from the App Router:
  /robots.txt  → src/app/robots.js
  /sitemap.xml → src/app/sitemap.js (includes MongoDB service & project URLs)

Putting public/robots.txt or public/sitemap.xml would cause a runtime conflict.

Files in this folder
--------------------
  robots-reference.txt  — Full rules + comments; backup for static hosts.
  sitemap-static.xml    — Core marketing URLs only (no dynamic IDs).
                          Live crawlers should use /sitemap.xml for the full index.

Production domain
-----------------
Replace https://www.ssassociates.com in both files with NEXT_PUBLIC_SITE_URL
when you change domain, or regenerate mirrors via: npm run seo
(output also written to seo-static/ at project root).
