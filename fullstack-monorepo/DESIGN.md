# <!-- TODO: Application name --> — Design Document

## 1. Executive Summary

<!-- TODO: Describe what the application does in 3-5 sentences. Cover:
- What problem it solves
- Who uses it
- Key capabilities (3-5 bullets)

e.g.: "The Newsletter Application is a full-stack monorepo that automates the collection, curation, and distribution of curated content to subscribers."

Key Capabilities:
- Multi-source content aggregation
- Admin-driven editorial workflow
- AI-powered summarization
- Email distribution
- Subscriber management with invite-based registration
-->

---

## 2. Architecture Overview

### 2.1 Technology Stack

<!-- TODO: Fill in your chosen technologies for each layer. -->

**Backend:**
- Runtime: <!-- TODO: e.g.: "Node.js (TypeScript)" -->
- Framework: <!-- TODO: e.g.: "Hono", "Express", "Fastify", "Rails", "Django" -->
- Database: <!-- TODO: e.g.: "SQLite-first with Drizzle ORM; MySQL-ready migration path" -->
- Authentication: <!-- TODO: e.g.: "JWT in HTTP-only cookies" -->
- <!-- TODO: Any additional backend services. e.g.: "Email: Nodemailer + Handlebars", "AI: Anthropic SDK", "Scheduling: node-cron" -->

**Frontend:**
- Framework: <!-- TODO: e.g.: "React" -->
- Build Tool: <!-- TODO: e.g.: "Vite" -->
- Styling: <!-- TODO: e.g.: "Tailwind CSS" -->

**Infrastructure:**

- <!-- TODO: e.g.: "Docker & Docker Compose", "AWS", "Railway", "Fly.io" -->

### 2.2 Source Tree

```
<!-- TODO: Paste your key directory structure here. e.g.:
<backend-path>/
├── app.<ext>               # App factory; mounts all routes
├── entry.<ext>             # Entry point: env, migrations, server start
├── db/
│   ├── schema.<ext>        # DB schema definitions (source of truth)
│   ├── client.<ext>        # DB connection singleton
│   └── writeHelpers.<ext>  # Cross-dialect insert/update helpers (if needed)
├── middleware/             # Auth, permissions
├── routes/                 # One file per resource
└── services/               # Business logic
<shared-path>/              # Cross-boundary types and logic
<frontend-path>/            # Frontend application
    ├── components/
    ├── pages/
    └── hooks/

<tests-path>/
├── helpers/
├── integration/
└── unit/
-->
```

### 2.3 Development Conventions

<!-- TODO: name the key library choices already made and which alternatives to avoid. e.g.: "Prefer proven libraries — for this stack: use Express over Hono for HTTP routing, use pg over a query-builder when raw performance matters." -->

- **Keep handlers thin.** <!-- TODO: remove if the project has no HTTP handler/controller layer --> Route handlers own input parsing, service delegation, and response shaping only. Conditions, calculations, and multi-step operations belong in the service layer.
- **Wire i18n from the first line of UI code.** <!-- TODO: remove if the project has no UI layer or no i18n requirement --> Do not hardcode user-visible strings in components. All display text goes through the translation helper, even before a second locale exists.

---

## 3. Data Model

<!-- TODO: Document each table/collection with its fields and purpose.
Use the format below for each entity. -->

### 3.1 Tables and Relationships

<!-- TODO: Add one subsection per entity. Example entries below — replace with your own. -->

<!-- TODO: Add one `####` subsection per entity. Repeat the pattern below for every table/collection.
Document junction tables, audit logs, and key-value settings stores too. -->

#### users <!-- TODO: rename to your entity -->

<!-- TODO: Brief description. e.g.: "Authentication credentials and profile for admin users." -->

- `id`: Primary key
- <!-- TODO: Field: e.g.: `email`: Unique email address -->
- <!-- TODO: Field: e.g.: `passwordHash`: bcrypt-hashed password -->
- <!-- TODO: Field: e.g.: `role`: `'admin' | 'editor'` — controls access level -->
- <!-- TODO: Field: e.g.: `createdAt`: Account creation timestamp -->

### 3.2 Key Data Conventions

<!-- TODO: Note any cross-cutting data conventions agents must know. e.g.:
- JSON-serialized columns (e.g. `tags`) are parsed/stringified at route boundaries.
- Soft deletes use a `deletedAt` / `revokedAt` timestamp rather than hard deletes.
- All API responses normalize `Date` values to Unix seconds before JSON serialization.
- Settings are stored in a key-value `appSettings` table; rows there override env defaults.
-->

---

## 4. Core Features

<!-- TODO: Document each major feature area. Use the format below. -->

### 4.1 <!-- TODO: Feature area name, e.g.: "Content Acquisition" -->

<!-- TODO: Describe the feature. Cover:
- What it does
- How it is triggered (user action, schedule, API call)
- Key implementation details
- Any concurrency or deduplication logic

e.g.:
#### RSS Feed Scraping
- Fetch articles from configured RSS feeds
- Runs on a scheduled interval or on-demand via admin endpoint
- Deduplicates articles by URL

#### Scheduler
- Cron job (configurable schedule, default: `'0 18 * * 0'`)
- Runs all active sources sequentially
- Creates a run record for tracking and error logging
-->

### 4.2 <!-- TODO: Feature area name -->

<!-- TODO: Continue for each major feature. -->

---

## 5. REST API

<!-- TODO: Document each route group. Use the table format below. -->

### 5.1 <!-- TODO: Route group name, e.g.: "Authentication Routes (`/api/auth`)" -->

<!-- TODO: Access level note. e.g.: "Public" or "Admin Only" or "Authenticated" -->

| Method | Endpoint | Payload | Returns | Notes |
| --- | --- | --- | --- | --- |
| POST | `/login` | `{ username, password }` | `{ ok }` | <!-- TODO: e.g.: "Sets HTTP-only session cookie" --> |
| POST | `/logout` | — | `{ ok }` | <!-- TODO --> |

### 5.2 <!-- TODO: Route group name, e.g.: "Resource Routes (`/api/resources`)" -->

<!-- TODO: Access level. -->

| Method | Endpoint | Payload | Returns | Notes |
| --- | --- | --- | --- | --- |
| GET | `/` | — | Resource[] | <!-- TODO --> |
| POST | `/` | Resource data | Resource | <!-- TODO --> |
| PATCH | `/:id` | Partial Resource | Resource | <!-- TODO --> |
| DELETE | `/:id` | — | `{ ok }` | <!-- TODO --> |

### 5.3 Health Check

| Method | Endpoint | Returns |
| --- | --- | --- |
| GET | `/api/health` | `{ status: 'ok' }` |
<!-- TODO: Add a DB health check endpoint if applicable. e.g.:
| GET | `/api/health/db` | `{ ok, driver, version }` |
-->

<!-- TODO: Continue with all route groups. -->

---

## 6. Frontend Pages

### 6.1 Public Pages

<!-- TODO: List public (unauthenticated) pages. e.g.:
#### Join Page (`/join`)
- Accepts invite token from URL
- User enters name and email to register

#### Unsubscribe Page (`/unsubscribe`)
- Self-service unsubscribe via signed token
-->

### 6.2 Authenticated Pages

<!-- TODO: List authenticated pages. e.g.:
#### Dashboard
- Overview with key metrics
- Navigation hub

#### Resource List (`/resources`)
- Table of records with filter controls
- Inline actions: edit, delete
-->

---

## 7. Services and Business Logic

<!-- TODO: Add one subsection per service. For each, document:
- Service name and file path
- What external system or concern it wraps (email, AI, scheduling, storage, etc.)
- Which env vars control its behavior
- The injection hook that allows mocks in tests (e.g. setTransport(), setClient())
- For background services: trigger type (scheduled, on-demand, event-driven) and error handling strategy
-->

---

## 8. Workflows

<!-- TODO: Document key multi-step workflows as flow diagrams or step lists. e.g.:

### 8.1 Content Collection Workflow
```
Trigger (scheduled or manual)
    ↓
Fetch all active sources
    ↓
Deduplicate against existing records
    ↓
Insert new records with `pending` status
    ↓
Batch-process with AI service
    ↓
Record run completion
```

### 8.2 <!-- TODO: Workflow name -->
```
Step 1
    ↓
Step 2
    ↓
...
```
-->

---

## 9. Authentication & Authorization

### 9.1 Authentication

<!-- TODO: Describe your auth mechanism. e.g.:
- Credentials: Username + bcrypt-hashed password
- Flow: Login → server verifies hash → issues JWT in HTTP-only cookie (7-day expiry)
- Middleware: `requireAuth` verifies token and injects user context into each request
-->

### 9.2 Public Routes

<!-- TODO: List routes that bypass authentication. e.g.:
- `/login` — public
- `/join` — public; requires valid invite token
- `/api/health*` — public
-->

### 9.3 Role-Based Authorization

<!-- TODO: Describe your role model. e.g.:
- Roles: `'admin' | 'editor'`
- Admins: full access
- Editors: content management only; admin-management pages hidden
- Frontend: `PermissionGate` component wraps role-restricted UI
-->

---

## 10. Configuration & Environment

### 10.1 Required Environment Variables

```bash
# <!-- TODO: Group by concern. e.g.: -->

# Database
# DATABASE_DRIVER=sqlite
# DATABASE_PATH=./data/app.db

# Authentication
# JWT_SECRET=<strong 32+ char random string>

# SMTP (Email)
# SMTP_HOST=localhost
# SMTP_PORT=1025
# SMTP_FROM=app@localhost

# App
# APP_URL=http://localhost:3000
# PORT=3000

# External APIs
# THIRD_PARTY_API_KEY=<key>
```

### 10.2 Scaling / Migration Considerations

<!-- TODO: Document known scaling triggers and migration paths. e.g.:
**When to consider migrating from SQLite to MySQL/Postgres:**
- Active user count exceeds ~10,000
- Multiple concurrent write processes cause contention
- Deployment target requires a managed database

Migration checklist:
1. Provision target database
2. Set connection env vars
3. Verify startup diagnostics
4. Confirm health endpoint
5. Rollback: restore original env vars and restart
-->

### 10.3 Development Commands

```bash
# <!-- TODO: Repeat your primary commands here for quick reference. -->
```

---

## 11. Testing Architecture

### 11.1 Test Organization

<!-- TODO: Describe your test split. e.g.:
- **Unit Tests**: Service logic tested in isolation
- **Integration Tests**: Full request/response flows with in-memory database
-->

### 11.2 Test Helpers

<!-- TODO: List your shared test utilities. e.g.:
- `tests/helpers/db.ts`: `createTestDb()` — in-memory database with applied migrations
- `tests/helpers/server.ts`: `makeTestServer()` — wraps app for HTTP testing
- `tests/helpers/auth.ts`: `seedAdmin()`, `makeAuthCookie()` — auth test utilities
-->

### 11.3 Service Mocking

<!-- TODO: Describe how external service clients are replaced in tests. e.g.:
- `mailer.ts` exposes `setTransport()` for mock email transport
- `summarizer.ts` exposes `setClient()` for mock AI client
- Test setup resets singletons before each test via `tests/setup.ts`
-->

---

## 12. Deployment

### 12.1 Local Development

```bash
<!-- TODO: Commands to start local dev environment. e.g.:
docker compose up          # Start app + dev services (e.g. Mailpit at :8025)
docker compose up --build  # Rebuild after code changes
-->
```

### 12.2 Production Build

```bash
<!-- TODO: Build and start commands. e.g.:
npm run build   # Compile backend + build frontend SPA
npm start       # Run compiled output
-->
```

<!-- TODO: Note any static file serving or CDN configuration. -->

### 12.3 Public Exposure

<!-- TODO: Describe how the app is exposed publicly. e.g.:
**Cloudflare Tunnel:**
```bash
npm run cloudflare:up    # Start app + cloudflared tunnel
npm run cloudflare:down  # Stop tunnel stack
```
Required env vars: `CF_TUNNEL_TOKEN`, `APP_URL`.

OR: Standard port-forwarding / reverse proxy setup.
-->

---

## 13. Key Design Decisions

<!-- TODO: Document the most important design choices and why they were made.
Use the format below. This section is your project's lightweight ADR (Architecture Decision Record). -->

### 13.1 <!-- TODO: Decision title, e.g.: "Modular Route Composition" -->
<!-- TODO: Rationale. e.g.:
- Each route module exports `createRoutes(db)` for dependency injection
- Enables testing without network overhead
- Keeps route files thin; business logic lives in services
-->

### 13.2 <!-- TODO: Decision title, e.g.: "Soft-Delete Pattern" -->
<!-- TODO: Rationale. e.g.:
- Records use a `deletedAt`/`revokedAt` timestamp rather than hard deletes
- Maintains audit trail and supports restoration
- Queries filter on `IS NULL` for active records
-->

### 13.3 <!-- TODO: Decision title, e.g.: "Async Background Jobs" -->
<!-- TODO: Rationale. e.g.:
- Long-running jobs (scraping, email delivery) run in the background
- HTTP response returns immediately; client polls for status
- Errors are logged without crashing the server
-->

<!-- TODO: Add one subsection per significant design choice. Aim for 5-10 decisions.
Good candidates: data storage format choices, caching strategy, auth approach,
API versioning, event sourcing vs. mutable state, multi-tenancy model. -->
