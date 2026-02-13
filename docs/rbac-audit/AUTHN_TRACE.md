# AuthN Trace

## Identity Source of Truth
**Current Status:** 🔴 **NON-EXISTENT / MOCKED**

- **Middleware:** `apps/web/src/middleware.ts`
  - Clerk middleware is **commented out**.
  - No session validation logic.
  - Passes requests through based on hostname only.

- **Member App:** `apps/web/src/app/actions/member.ts`
  - Identity is **hardcoded stub**.
  - `getMemberProfile()` returns static data:
    ```typescript
    return {
        id: "mem_123",
        firstName: "Russell",
        ...
        role: "officer"
    };
    ```
  - `verifyOfficerPin()` accepts hardcoded PIN "2026".

- **Admin Dashboard:** `apps/web/src/app/(admin)/layout.tsx`
  - `Verified` UserButton is commented out.
  - Renders "A" (Avatar) statically.
  - No check for "admin" role.

## Tenant Context Derivation
**Current Status:** ⚠️ **MIXED / INSECURE**

- **Public Pages (`[host]/page.tsx`):**
  - Derived correctly from URL path (`params.host`).
  - Queries DB for `slug`.
  - Fallback logic exists for local dev (hardcoded config).

- **Server Actions (`getSabbathSchedule`, `submitOffering`):**
  - **HARDCODED** to `'batangas'` in `getTenantId()`.
  - ignores the actual request context or session.
  - **Risk:** User on "Church A" site will see/interact with "Church B ('batangas')" data if the action is called.

## Conclusion
There is **NO** functioning Authentication system. The app is in a "demo mode" with hardcoded actors.
