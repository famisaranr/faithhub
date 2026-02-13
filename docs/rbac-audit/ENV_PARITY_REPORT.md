# Environment Parity Report

## File Comparison

| File | Local Status | Dokploy/Prod Status | Parity |
| :--- | :--- | :--- | :--- |
| `docker-compose.yml` | Exists (DB Only) | Unknown | 🔴 **Mismatch likely** (Prod has App container) |
| `.env.example` | 🔴 **MISSING** | Unknown | 🔴 **Critical** |
| `.env` | 🔴 **MISSING** | Unknown | 🔴 **Critical** |
| `Dockerfile` | Exists (Multistage) | Assumed Used | 🟡 Verified |

## Config Risks
1.  **Missing Defaults:** Code relies on `process.env.SINGLE_TENANT_SLUG` and `process.env.NEXT_PUBLIC_ROOT_DOMAIN`. Without an `.env` file, local dev behavior is undefined or relies on hardcoded fallbacks in `layout.tsx` (which we observed).
2.  **Hardcoded Fallbacks:** `apps/web/src/app/[host]/page.tsx` has `const config = DEV_CENTENNIAL_CONFIG;` which effectively hardcodes the app to one tenant if DB fails or env is missing.
3.  **Database URL:** Passed to `schema.prisma` via env. Without `.env`, migration scripts will fail locally.

## Conclusion
The development environment is not reproducible. A new developer cannot spin this up without guessing environment variables.
