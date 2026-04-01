This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


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
