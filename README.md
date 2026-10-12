# Shiva Bharti - Full-Stack Developer & Aspiring AI Engineer Portfolio

A premium, production-grade, fully responsive, full-stack personal portfolio website engineered with Next.js App Router, React 19, TypeScript, Tailwind CSS, PostgreSQL, Prisma ORM, Framer Motion, and Recharts.

---

## 🌟 Architecture & Design Features

- **Transparent Glassmorphism System:** Dark aesthetics (`#080808` background, `rgba(255,255,255,0.045)` glass surfaces, and `rgba(255,255,255,0.12)` fine borders) with subtle `#F4B400` yellow glows and backdrop-filter blur effects.
- **Dynamic Hero Section:** Animated cycling roles (`Full-Stack Developer`, `Web Developer`, `App Developer`, `Automation Developer`, `Aspiring AI Engineer`), real profile avatar, floating technology badges, and immediate CTA shortcuts.
- **Honest Personal Branding:** Authentic representation of Shiva Bharti without fabricated employment history or awards.
- **Interactive Skills Dashboard (4 Dynamic Visualizations):**
  1. **Horizontal Bar Chart:** Category-filtered technical skills with color-coded learning statuses (*Learning*, *Practicing*, *Proficient*).
  2. **Radar Chart:** Relative full-stack balance across all domains.
  3. **Distribution Donut Chart:** Technological breakdown by category.
  4. **Learning Milestones Journey:** Chronological verified timeline milestones.
- **Detailed Project Case Studies:**
  - **StayNest:** Rental & local services platform concept.
  - **ZipIt:** Mobility & hyperlocal delivery super-app concept.
  - **WorkxSphere:** Collaboration & productivity management workspace.
  - **NoveXora:** Digital technology brand and product incubator.
  - **AI Resume Analyzer:** Resume parsing & job description matcher concept.
  - **AI Study Assistant:** Document-grounded Q&A engine concept.
  - **Personal Automation Toolkit:** Practical automation scripts & webhooks.
  - **Data Analytics Dashboard:** Interactive CSV dataset visualizer.
- **Dynamic Case Study Detail Pages:** Individual routes (`/projects/[slug]`) detailing problem statement, proposed solution, system architecture, challenges learned, roadmap, and completed vs. planned module verification.
- **Live GitHub REST API Integration:** Direct repository fetching with server-side caching, star/fork counts, and graceful rate-limit fallbacks.
- **Experience & Education Timeline:** Verifiable engineering timeline entries.
- **Services Section:** Focus areas including full-stack web, mobile apps with Flutter, automation pipelines, and AI prototypes.
- **Secure Admin Dashboard (`/admin`):**
  - Project management (CRUD, status toggles, publishing/unpublishing).
  - Skills proficiency and learning status editor.
  - Profile and contact details editor (including configurable LinkedIn URL).
  - Resume file manager with PDF upload validation.
  - Contact Inbox with read/archive/delete capabilities.
  - Secure JWT sessions stored in HTTP-only cookies with server-side authorization.
- **Protected Contact Form:** Rate-limited submissions, Zod input validation, database persistence, and optional Resend email dispatch.
- **SEO & Accessibility:** Open Graph metadata, semantic HTML, `sitemap.xml`, and `robots.txt` (excluding admin and api routes).

---

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS & Glassmorphism Utility Classes
- **Database & ORM:** PostgreSQL & Prisma ORM
- **Visualizations:** Recharts
- **Animations:** Framer Motion
- **Icons:** Lucide React & Custom SVG Social Icons
- **Authentication:** Custom JWT with `jose` and `bcryptjs`
- **Validation:** Zod
- **Testing:** Vitest

---

## 🚀 Getting Started Locally

### 1. Prerequisites
- Node.js (v20+ or v24+)
- PostgreSQL (e.g. Supabase, Neon, Railway, or local PostgreSQL instance)

### 2. Installation
```bash
git clone <repository_url>
cd portfolio-website
npm install
```

### 3. Environment Variables Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Fill in the following variables:
```env
# PostgreSQL Connection URL
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/portfolio_db?schema=public"

# Auth Secret for JWT (generate using `openssl rand -base64 32`)
AUTH_SECRET="shiva_bharti_secure_portfolio_auth_secret_key_2026_super_safe"
AUTH_URL="http://localhost:3000"

# Initial Admin Credentials for Seeding and Fallback Access
ADMIN_EMAIL="shivaharti9080@gmail.com"
ADMIN_PASSWORD="AdminSecurePassword2026!"
ADMIN_NAME="Shiva Bharti"

# GitHub REST API (Optional for higher rate limits)
GITHUB_TOKEN=""
NEXT_PUBLIC_GITHUB_USERNAME="shivabharti9080"

# Resend Email Delivery (Optional)
RESEND_API_KEY=""
CONTACT_FROM_EMAIL="onboarding@resend.dev"
CONTACT_TO_EMAIL="shivaharti9080@gmail.com"
```

### 4. Database Setup & Seeding
Push the Prisma schema to your PostgreSQL database and seed the verified data:
```bash
npx prisma db push
npm run db:seed
```

> **Note on Offline / Pre-Database Mode:**  
> The application includes a resilient service layer with fallback mechanisms. If your PostgreSQL database is offline or not configured yet, the site automatically loads and renders all verified profile data, projects, case studies, skills graphs, and timeline entries without crashing!

### 5. Running the Application
```bash
# Start development server
npm run dev

# Or build and run production bundle
npm run build
npm start
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔒 Admin Dashboard Access

- **URL:** [http://localhost:3000/admin](http://localhost:3000/admin)
- **Default Email:** `shivaharti9080@gmail.com`
- **Default Password:** `AdminSecurePassword2026!` *(Change via `.env` or password update)*

From the dashboard you can:
1. Update project statuses (*Concept*, *In Progress*, *Completed*, *Published*).
2. Edit or add skill proficiency ratings and learning stages.
3. Manage resume files and upload new PDFs.
4. Review submitted contact form messages.
5. Update your LinkedIn URL and availability status.

---

## 🧪 Automated Testing

Run the automated Vitest test suite:
```bash
npm test
```
Tests verify input validation rules (Zod) and cryptographic token encryption/verification (`jose`).

---

## 🌐 Production Deployment

### Deploying to Vercel
1. Push this repository to GitHub.
2. Import the project into [Vercel](https://vercel.com).
3. Connect a PostgreSQL database (such as Neon, Supabase, or Vercel Postgres).
4. Add the environment variables from `.env.example` in the Vercel project settings.
5. Trigger deployment. Build script automatically generates Prisma client and optimizes all static and dynamic routes.
