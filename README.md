# Aspect — Frontend Prototype

A fully interactive React + Tailwind frontend for the Aspect software studio platform. No real backend — all data is mocked in `src/data/`, and state lives in React context.

## Run it

```bash
npm install
npm run dev
```

## Architecture (workspace shell)

- **Sidebar** (`Sidebar.jsx`): persistent, collapsible left nav — Dashboard, War Room, Services, Developers, Settings. Only renders once a role is active; visitors get the marketing navbar instead.
- **Navbar** (`Navbar.jsx`): for authenticated roles it's a slim workspace utility bar — global search (⌘K/Ctrl+K), "+ New request" quick action, notifications, profile menu. For visitors it falls back to marketing links (Services, Pricing, Developers, Transparency, Bulletins).
- **Global Search** (`GlobalSearchPalette.jsx`): a real Cmd+K command palette for jumping to any page or action.
- **Dashboard** (`Dashboard.jsx`): a tabbed workspace — **Overview** (role-specific: project progress for clients, pending-project queue for developers, CRUD/broadcast for admins), **Tasks** (the same Kanban board used in War Room), **System Health** (the same live charts used on the public Transparency page) — sitting under a **Top Summary Bar** (Active Tickets / System Status / API Usage).
- **Settings** (`Settings.jsx`): account fields (username, email, password, avatar, language) plus the Transparency/Privacy/Terms links — informational pages now live here and in the footer, not scattered through the UI.
- **Help Hub** (`HelpHub.jsx`): the single floating bottom-right widget that replaced four separate ones (chat, sticky-note feedback, WhatsApp bubble, accessibility menu) — each is now a tab in one popover, plus a realistic WhatsApp tile at the bottom.

## Iconography

- **Realistic tier** (`components/icons/`, `RealisticIconTile.jsx`): multi-layer SVGs with real gradients and edge highlights (WhatsApp #25D366→#075E54, GitHub charcoal gradient) wrapped in a reusable glassmorphism tile — reserved for brand marks and high-impact tiles.
- **Structural tier**: everything else (nav, tables, inputs, buttons) stays flat single-color Lucide icons, per a strict two-tier hierarchy.
- **StatusDot** (`StatusDot.jsx`): the uniform micro-indicator (muted dot + label) used everywhere a status used to be a bespoke colored pill — `TechBadge`, the contribution/activity chart legend, ticket status, dev availability.

## What's implemented (cumulative — see git history/prior context for earlier rounds)

- Login/Signup page (`/login`) — pick a role, sign in or create an account (mocked, but sets a real session-like role)
- Accessibility menu (read aloud, theme, dyslexia font, text scale, **language switcher**) now lives inside the Help Hub, and closes when you click anywhere outside it or press Escape — same click-outside behavior on the profile and notification dropdowns
- Card-level i18n: switching language now translates the service card names/blurbs on the fly, not just nav chrome (subcategory long-form descriptions are still English-only)
- Settings is a dedicated tabbed page (Account / Resources) with a pick-from-a-list avatar option alongside upload, notification preferences, and an account deactivation flow
- Start a Project now shows a payment step — price, minimum deposit, and the M-Pesa/PayPal/Bitcoin picker — before the final summary
- Developers page: taller hero banner for the background video, a confidential "report misconduct" form (visible only on the admin dashboard), and a "why you matter" client-feedback section
- Bulletins/Changelog entries are tagged by platform (Web/Mobile/iOS/Android)
- Dashboard's Sync widget removed
- Careers page shows only admin-toggled open vacancies, with an inline apply form (CV upload optional) that surfaces in the admin dashboard's Applications panel; staff roles are redirected away from the public listing
- War Room is fully removed — page, route, sidebar entry, and every reference in copy and search
- KES-only pricing (30,000–95,000) with deposits, category browsing
- Psychologically-ordered Start a Project wizard with a live budget-vs-estimate comparison
- Two-pane "What We Build" with an auto-scrolling, scrollbar-hidden card rail and hover-lift cards
- Charcoal-black + golden-brown dark mode, warm low-contrast sand + brick-red light mode
- Sidebar + slim workspace navbar (⌘K search, quick actions, notifications, profile) for authenticated roles; marketing nav for visitors
- Tabbed Dashboard (Overview / Tasks / System Health) with a Top Summary Bar
- Realistic multi-layer WhatsApp/GitHub icons + `RealisticIconTile`; `StatusDot` micro-indicators used consistently

## What's partial / mocked (no real backend)

- Payments (M-Pesa/PayPal/Bitcoin): real UI, no live processor
- Translation coverage: the system works, but not every string on every page is translated yet
- Auth/"logged-in users": simulated via the role switcher
- Email: represented as toast notifications

## Stack

React 19, React Router 7, Tailwind CSS 3, Framer Motion, Recharts, Lucide icons.
