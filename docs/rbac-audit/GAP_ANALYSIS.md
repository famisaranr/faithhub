# Gap Analysis & Target State

## Maturity Score: 0/5 (Critical Risk)
The application currently functions as a **Prototype / Demo** with **Zero Real Security**. It relies entirely on:
- Mocked identities
- Hardcoded tenant IDs
- Commented-out security code
- Security through obscurity (hidden routes)

**It is NOT SAFE for production deployment.**

## Top Risks (Ranked)

1.  🚨 **Mocked AuthN:** `actions/member.ts` returns a hardcoded user identity (`mem_123`). Any user is effectively logged in as this user.
2.  🚨 **No AuthZ on Admin:** `(admin)/dashboard` has NO protection. Anyone can access it.
3.  🚨 **Hardcoded Tenant:** `getSabbathSchedule` and `submitOffering` force all data to 'batangas'. This breaks multi-tenancy.
4.  🚨 **Unsecured Write:** `submitOffering` allows writing financial records without verifying the user is actually `mem_123`.
5.  🚨 **Unsecured Tenant Creation:** `create-tenant` is public. Attackers can flood the DB.
6.  ⚠️ **Missing Config:** No `.env.example` means deployment is guesswork.
7.  ⚠️ **No Audit Logs:** No tracing of who changed what (except `ImportLog`).
8.  🚨 **Deep Dive Finding:** Officer Portal (Treasury/Clerk) actions rely on client-side PIN and hardcoded tenant. **Total bypass possible.**

## Stop-Ship Items
You **CANNOT DEPLOY** until:
- [ ] Real AuthN is enabled (Clerk/NextAuth).
- [ ] Mocks are removed from `member.ts`.
- [ ] Admin routes are protected.
- [ ] Tenant ID is derived from Session/Context, NOT hardcoded.

## Recommended Target State (Phase 1)
- **AuthN:** Restore Clerk or NextAuth. Only allow verified sessions or valid API keys.
- **Tenant Context:** Middleware extracts tenant from Host, passes strictly to App.
- **AuthZ:**
  - Admin: `requireRole('admin')` check on layout.
  - Member: `requireRole('member')` check on actions.
  - Tenant: Queries MUST use `where: { tenantId: session.tenantId }`.

## Rollout Plan
1.  **Local Fix:** Configure `.env.local` to use a real Dev Tenant.
2.  **Staging:** Deploy with Auth guard in WARN mode (log violations).
3.  **Prod:** Deploy with Auth guard in ERROR mode (block violations).
