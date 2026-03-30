# SS Associates — Project Documentation

This document describes the **SS Associates** web application: purpose, architecture, main features, routes, APIs, and data models. It is intended for developers and stakeholders who need an overview of how the system works.

---

## 1. Overview

**SS Associates** is a **Next.js** full-stack application that combines:

- A **public marketing website** (landing page, about, services, projects portfolio, contact, legal pages).
- A **protected admin / user dashboard** for managing website content: projects, categories, services, testimonials, FAQs, clients, contact submissions, subscribers, admins, and email tooling.

The stack emphasises **MongoDB** for persistence, **JWT** for authenticated API access, **Cloudinary** for image uploads, and **Material UI** for the dashboard UI.

---

## 2. Technology Stack

| Area | Technology |
|------|------------|
| Framework | Next.js 16 (App Router), React 19 |
| UI | Material UI (MUI) 7, Emotion, Framer Motion, GSAP, Three.js (where used on marketing pages) |
| Forms & validation | Formik, Yup; React Hook Form + resolvers in some flows |
| Database | MongoDB via Mongoose 9 |
| Auth | JWT (`jsonwebtoken`), bcrypt for passwords, OTP model for verification flows |
| File uploads | Cloudinary (`/api/upload/cloudinary`) |
| Email | Nodemailer; bulk send and templates via dedicated APIs |
| Payments / subscriptions | Stripe packages present (`@stripe/react-stripe-js`, `stripe`) — integrate where configured in env |
| Charts | Recharts (dashboard) |
| Alerts | SweetAlert2 |
| Spinners | react-spinners |

---

## 3. High-Level Architecture

```
src/app/
├── (website)/          # Public site routes
├── (user)/user/        # Authenticated dashboard (UserGuard + layout)
├── (auth)/             # Login
├── api/                # REST-style Route Handlers
└── setup/              # Initial setup page (if used)

src/components/
├── website/            # Landing, projects, services, contact, etc.
├── user/               # Dashboard pages, forms, navbar, sidebar
└── utils/              # Shared colours, globals

src/models/             # Mongoose schemas
src/lib/                # DB connection, auth helpers, normalisers, etc.
```

- **Public APIs** (e.g. `GET /api/projects`, `GET /api/services`) feed the marketing site.
- **Protected APIs** require `Authorization: Bearer <token>` from the logged-in user stored in `localStorage` (`src/lib/auth-storage.js`).

---

## 4. Public Website — Functionality

| Route | Purpose |
|-------|---------|
| `/` | Landing page (hero, sections, services/projects teasers, testimonials, FAQs, contact CTA, etc.) |
| `/about` | About the company |
| `/services` | Services listing |
| `/services/[id]` | Single service detail |
| `/projects` | Projects listing |
| `/projects/[id]` | Single project detail (loads project from DB, normalised challenges/solutions) |
| `/contact` | Contact form (submissions stored via API) |
| `/privacy-policy` | Privacy policy |
| `/terms-&-conditions` | Terms and conditions |

**Typical behaviours**

- Content for services, projects, testimonials, and FAQs is largely **driven by the admin dashboard** and exposed through public `GET` APIs.
- **Newsletter / subscribe**: `POST /api/subscribe` creates subscribers and can trigger notification flows (`subscriber-signup` helper).
- **Contact**: `POST /api/contact` persists **ContactSubmission** records for staff to review in the dashboard.

---

## 5. Authentication — Functionality

| Route / API | Purpose |
|-------------|---------|
| `/login` | Admin/user login UI |
| `POST /api/auth/login` | Email + password → JWT + user payload |
| `POST /api/auth/signup` | Registration (with team/school name field on User model) |
| `POST /api/auth/verify-otp` | Email verification via OTP |
| `POST /api/auth/resend-otp` | Resend OTP |
| `POST /api/auth/forgot-password` | Initiate password reset |
| `POST /api/auth/reset-password` | Complete password reset |
| `GET /api/auth/me` | Current user (with valid token) |

**Client storage**

- `localStorage`: `cstoken`, `csuser`, `csemail` (see `AUTH_KEYS` in `auth-storage.js`).
- Dashboard routes are wrapped in **UserGuard** so unauthenticated users are redirected to login.

---

## 6. User Dashboard — Modules & Routes

The sidebar (`sidebarMenuConfig.js`) drives navigation. Main areas:

### 6.1 Dashboard (`/user/dashboard`)

- Aggregates counts and charts: projects, categories, admins, clients, contact submissions, subscribers, services, testimonials, FAQs.
- Uses `useDashboardData` to parallel-fetch multiple authenticated APIs and build Recharts datasets (e.g. projects by category/status, trends).

### 6.2 Admins (`/user/admins`)

- CRUD for **Admin** records via `/api/admins` and `/api/admins/[id]`.

### 6.3 Clients (`/user/clients`)

- CRUD for **Client** records via `/api/clients` and `/api/clients/[id]`.

### 6.4 Contact submissions (`/user/contact-submissions`)

- Lists **ContactSubmission** entries from `/api/contact-submissions`.

### 6.5 Subscribers (`/user/subscribers`)

- Lists / manages **Subscriber** records (`/api/subscribers`, `/api/subscribers/[id]`).

### 6.6 Project pages (submenu)

**Category** (`/user/category`)

- Manage **Category** entities used to classify projects (`/api/categories`, `/api/categories/[id]`).

**Projects** (`/user/projects`)

- Table of all projects: search, date filters, status filter, **sequence reorder** (up/down) via `POST /api/projects/reorder`.
- Actions: **view** (modal with full detail), **edit**, **delete**.
- **Add**: `/user/projects/new`.

**Project create / edit** (`/user/projects/new`, `/user/projects/[id]/edit`)

- Large **ProjectForm** (Formik + Yup): cover image (required, Cloudinary), gallery (multiple images), metadata, specifications, video URL, **challenges** and **solutions** as **dynamic lists** (add/remove rows), unique approach, CTA, dates, etc.
- **Challenges / solutions** are stored as **arrays of strings** in the database; legacy single-string values are normalised on read (`src/lib/project-challenges-solutions.js`).

**Project detail route** (`/user/projects/[id]`)

- If implemented in your branch: full-page project detail (otherwise the list modal remains the primary quick view).

### 6.7 Services (`/user/services`)

- CRUD + **ordering** (`/api/services/reorder`).
- List supports search, pagination, view/edit/delete; responsive table with horizontal scroll where needed.

### 6.8 Testimonials (`/user/testimonials`)

- CRUD with optional client image (Cloudinary), star rating, dialogs for add/edit/view.
- APIs: `/api/testimonials`, `/api/testimonials/[id]`.

### 6.9 FAQs (`/user/faqs`)

- CRUD, search, reorder (`/api/faqs/reorder`), pagination.
- Table uses horizontal scroll and wider columns for readability on small screens.

### 6.10 Email tooling (API-level)

- **Email templates**: `/api/email-templates`, `/api/email-templates/[id]`.
- **Send bulk email**: `POST /api/send-bulk-email`.
- **Email logs**: `/api/email-logs`, `/api/email-logs/stats`.

These support newsletter / campaign style workflows when wired in the UI.

---

## 7. API Reference (Summary)

Authenticated routes expect header: `Authorization: Bearer <JWT>` unless noted.

| Method | Path | Notes |
|--------|------|--------|
| GET/POST | `/api/projects` | List (normalised challenges/solutions); POST create |
| GET/PATCH/DELETE | `/api/projects/[id]` | Single project; PATCH whitelisted fields |
| POST | `/api/projects/reorder` | Reorder projects |
| GET/POST | `/api/categories` | Categories |
| GET/PATCH/DELETE | `/api/categories/[id]` | Single category |
| GET/POST | `/api/services` | Services |
| GET/PATCH/DELETE | `/api/services/[id]` | Single service |
| POST | `/api/services/reorder` | Reorder services |
| GET/POST | `/api/testimonials` | Testimonials |
| GET/PATCH/DELETE | `/api/testimonials/[id]` | Single testimonial |
| GET/POST | `/api/faqs` | FAQs |
| GET/PATCH/DELETE | `/api/faqs/[id]` | Single FAQ |
| POST | `/api/faqs/reorder` | Reorder FAQs |
| GET/POST | `/api/clients` | Clients |
| GET/PATCH/DELETE | `/api/clients/[id]` | Single client |
| GET | `/api/contact-submissions` | List submissions (protected) |
| POST | `/api/contact` | Public contact form |
| GET/POST | `/api/subscribers` | Subscribers (protected list) |
| GET/PATCH/DELETE | `/api/subscribers/[id]` | Single subscriber |
| POST | `/api/subscribe` | Public newsletter signup |
| GET/POST | `/api/admins` | Admins |
| GET/PATCH/DELETE | `/api/admins/[id]` | Single admin |
| POST | `/api/upload/cloudinary` | Image upload (authenticated) |
| — | `/api/auth/*` | Login, signup, OTP, password reset, me |
| — | `/api/email-*`, `/api/send-bulk-email` | Email campaigns / logs |

---

## 8. Data Models (Mongoose) — Overview

| Model | Role |
|-------|------|
| **User** | Registered users (first/last name, email, password, team name, email verified) |
| **Admin** | Dashboard admin users |
| **Otp** | OTP codes for verification |
| **Category** | Project categories |
| **Project** | Full project case studies (banner, copy, specs, gallery, video, **challengesFaced[]**, **solutionsImplemented[]**, order, userId) |
| **Service** | Service offerings for website |
| **Testimonial** | Client quotes, ratings, images |
| **Faq** | Questions and answers with order |
| **Client** | Business clients directory |
| **ContactSubmission** | Contact form entries |
| **Subscriber** | Email subscribers |
| **EmailTemplate** | Reusable email bodies |
| **EmailLog** | Sent email history / stats |
| **Team** | Team-related data (if used on site) |

Indexes and refs are defined per schema (e.g. `Project` indexed by `userId`, `order`, `createdAt`).

---

## 9. Shared Utilities & Conventions

- **`src/lib/db.js`**: Mongo connection for API routes.
- **`src/lib/get-user-from-request.js`**: Extract user from JWT for protected handlers.
- **`src/lib/project-challenges-solutions.js`**: `toStringArray` / `normalizeProjectChallengesSolutions` for consistent API responses and forms.
- **`src/components/utils/Colors.js`**: Brand colours (primary orange, status colours, etc.) used across user UI.
- **SweetAlert2**: Confirmations and success/error toasts (often `confirmButtonColor` aligned with primary).

---

## 10. Environment & Operations

Typical environment variables (names may vary; check `.env.example` if present):

- `MONGODB_URI` (or project-specific DB URL)
- `JWT_SECRET` (or equivalent)
- Cloudinary: `CLOUDINARY_*` or configured in upload route
- Nodemailer / SMTP settings for email
- Stripe keys if payment features are enabled

**Scripts** (`package.json`)

- `npm run dev` — development server (default port 3000)
- `npm run build` — production build
- `npm run start` — production server
- `npm run lint` — ESLint

---

## 11. UX Notes (Dashboard)

- **Responsive tables**: Several list pages use `overflow-x: auto`, `minWidth` on tables, and compact action icon rows so **view / edit / delete** stay on one line on small screens.
- **Project list view**: Modal (or full page) shows structured sections: overview, facts, CTA, video, specifications, challenges & solutions (lists), gallery.

---

## 12. Document Maintenance

- Update this file when you add **new routes**, **APIs**, or **major features** (e.g. new models, payment flows, or public pages).
- Keep the **API table** in sync with `src/app/api/**/route.js`.
- For deep field-level schema documentation, refer to the files under `src/models/`.

---

*Generated from the repository structure and source code. Last reviewed against the SS Associates codebase layout (App Router, user dashboard, and public site).*
