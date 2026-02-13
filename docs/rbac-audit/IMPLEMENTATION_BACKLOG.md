# Implementation Backlog

## P0 - Critical Security Fixes

### [SEC-01] Implement Real Authentication
- **Files:** `apps/web/src/middleware.ts`, `apps/web/src/lib/auth.ts`
- **Task:** Uncomment/Implement Clerk middleware. Ensure `auth()` returns valid user ID.
- **Acceptance:** Visiting `/dashboard` without login redirects to Sign In.

### [SEC-02] Secure Admin Dashboard
- **Files:** `apps/web/src/app/(admin)/layout.tsx`
- **Task:** Add Server Component check: `if (user.role !== 'admin') notFound()`.
- **Acceptance:** Non-admin user gets 404 or 403.

### [SEC-03] Remove Hardcoded 'Batangas' Tenant
- **Files:** `apps/web/src/app/actions/member.ts`
- **Task:** Replace `getTenantId()` hardcoded string with lookup based on `headers().get('host')` or `auth().sessionClaims.tenantId`.
- **Acceptance:** Action works for 'Manila' tenant when accessed via `manila.faithhub.com`.

### [SEC-04] Secure 'Create Tenant' Action
- **Files:** `apps/web/src/actions/create-tenant.ts`
- **Task:** Require 'SuperAdmin' role or a valid 'Invite Code'.
- **Acceptance:** Anonymous call returns `{ error: "Unauthorized" }`.

### [SEC-05] Implement Audit Logging for Financials
- **Files:** `apps/web/src/app/actions/member.ts` (`submitOffering`)
- **Task:** Verify user session matches `memberId`. Log IP and User Agent.
- **Acceptance:** Offering created with correct `memberId` from session.

## P1 - Operations & Stability

### [OPS-01] Create Environment Documentation
- **Files:** `.env.example`, `README.md`
- **Task:** Document all required env vars (`DATABASE_URL`, `NEXT_PUBLIC_ROOT_DOMAIN`, `CLERK_SECRET_KEY`).
- **Acceptance:** Developer can `cp .env.example .env` and prompt for values.

### [OPS-02] Docker Parity
- **Files:** `docker-compose.yml`
- **Task:** Add `web` service to compose to mirror production stack locally.
- **Acceptance:** `docker-compose up` spins up full stack.
