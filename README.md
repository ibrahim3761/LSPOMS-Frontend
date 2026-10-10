# LSPOMS — Load Shedding & Power Outage Management System

A full-stack web application for managing, reporting, and tracking power outages in Bangladesh. Built as a B7A7 frontend assignment.

**Live Demo:** https://your-frontend-url.vercel.app  
**Backend API:** https://load-shedding-power-outage-manageme.vercel.app  
**Postman Docs:** https://documenter.getpostman.com/view/54409963/2sBYAxP8zE  
**Backend Repo:** https://github.com/ibrahim3761/Load-Shedding-Power-Outage-Management-System-Backend

---

## Demo Login

Use the **Demo Login** buttons on the login page.

---

## Features

### Public
- View scheduled power outages (filterable by area and status)
- View unexpected outages by area
- Browse and purchase premium packages via bKash

### Customer
- Register and verify email via OTP
- Report unexpected power outages
- View all personal outage reports with status tracking
- Buy premium subscription (bKash payment + PDF invoice via email)
- View payment history with transaction details

### Technician
- Apply as a technician (resume upload to Cloudinary)
- View unexpected and scheduled assignments
- Update outage status (In Progress → Resolved) with notes

### Admin / Super Admin
- Full analytics dashboard with Recharts visualizations
- Manage users (block/unblock/delete)
- Manage areas (CRUD)
- Manage technicians (approve/reject applications)
- Manage scheduled outages (create/update/cancel/delete)
- Manage unexpected outages (assign technicians)
- Manage premium packages (CRUD)
- View all payment transactions

---

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| State Management | TanStack Query v5 |
| Forms | TanStack Form |
| Validation | Zod |
| HTTP Client | ofetch |
| Auth | Bearer token (localStorage) + Google OAuth |
| Package Manager | Bun |
| Linter/Formatter | Biome |
| Charts | Recharts |

---

## Project Structure

```
src/
├── api/              # ofetch API calls (one file per domain)
├── app/              # Next.js App Router pages
│   ├── (public)/     # Public pages — Navbar + Footer layout
│   ├── (private)/    # Auth-protected public pages (profile)
│   ├── admin/        # Admin dashboard
│   ├── dashboard/    # Customer dashboard
│   └── technician/   # Technician dashboard
├── components/
│   ├── ui/           # shadcn/ui components
│   ├── shared/       # Reusable shared components
│   ├── form/         # Form components
│   └── modules/      # Feature-specific components
│       ├── admin/
│       ├── customer/
│       ├── technician/
│       ├── homepage/
│       └── public/
├── hooks/            # TanStack Query hooks (one file per domain)
├── lib/              # apiClient, utils
├── providers/        # QueryProvider, GoogleAuthProvider
├── routes/           # Sidebar route configs per role
├── types/            # TypeScript interfaces
├── utils/            # Helper utilities
└── validation/       # Zod schemas
```

---

## Architecture Decisions

### Server vs Client Components
- **Server Components** — all page files that only export `metadata` and render a client component. Keeps SEO metadata on the server where Next.js requires it.
- **Client Components** — anything with hooks, state, forms, or event handlers. Marked with `"use client"`.

### Route Groups
- `(public)` — pages with Navbar + Footer, no auth required
- `(private)` — pages with Navbar + Footer, requires login (profile)
- `admin/`, `dashboard/`, `technician/` — dashboard layouts with sidebar, role-guarded

### Auth Flow
- Bearer token stored in `localStorage`
- `useGetMe` hook fetches current user — drives navbar state, AuthGuard, RoleGuard
- Automatic token refresh via `/auth/refresh-token` on 401 responses
- Google OAuth via `@react-oauth/google`

### API Layer
- `ofetch` with a wrapper that handles 401 → refresh token → retry
- One API file per domain, all exported through `src/api/index.ts`
- One hook file per domain, all exported through `src/hooks/index.ts`

---

## Getting Started

### Prerequisites
- Bun >= 1.0
- Node.js >= 18

### Installation

```bash
# Clone the repo
git clone https://github.com/ibrahim3761/load-shedding-frontend
cd load-shedding-frontend

# Install dependencies
bun install

# Copy env file
cp .env.example .env.local
```

### Environment Variables

```env
NEXT_PUBLIC_API_URL=https://load-shedding-power-outage-manageme.vercel.app
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id

# Demo credentials
NEXT_PUBLIC_DEMO_ADMIN_EMAIL=Your admin email
NEXT_PUBLIC_DEMO_ADMIN_PASSWORD=Your admin password
NEXT_PUBLIC_DEMO_CUSTOMER_EMAIL=Your customer email
NEXT_PUBLIC_DEMO_CUSTOMER_PASSWORD=Your customer password
NEXT_PUBLIC_DEMO_TECHNICIAN_EMAIL=Your technician email
NEXT_PUBLIC_DEMO_TECHNICIAN_PASSWORD=Your technician password
```

### Run

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Pages (23+)

| Route | Description |
|-------|-------------|
| `/` | Homepage — hero, features, packages, FAQ |
| `/about` | About Us |
| `/services` | Services |
| `/contact` | Contact |
| `/outages` | Public scheduled + unexpected outages |
| `/login` | Login + demo login buttons |
| `/register` | Customer registration |
| `/register/verify-account` | Email OTP verification |
| `/apply` | Technician application |
| `/apply/verify-account` | Technician email verification |
| `/reset-password` | Reset password with OTP |
| `/profile` | Update profile + change password |
| `/dashboard` | Customer overview |
| `/dashboard/report-outage` | Report unexpected outage |
| `/dashboard/my-reports` | My outage reports |
| `/dashboard/payments` | My payments + bKash callback handler |
| `/technician` | Technician overview |
| `/technician/assignments` | Unexpected + scheduled assignments |
| `/admin` | Admin analytics dashboard |
| `/admin/users` | User management |
| `/admin/areas` | Area management |
| `/admin/technicians` | Technician approval |
| `/admin/scheduled-outages` | Scheduled outage management |
| `/admin/unexpected-outages` | Unexpected outage management |
| `/admin/packages` | Premium package management |
| `/admin/payments` | All payment transactions |

---

## Author

**Ibrahim Abdullah**  
B.Sc. CSE — International Islamic University Chittagong (IIUC)  
GitHub: [@ibrahim3761](https://github.com/ibrahim3761)