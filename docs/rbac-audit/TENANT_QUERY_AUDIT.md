# Tenant Query Audit

## Schema Analysis
**File:** `apps/web/prisma/schema.prisma`

| Model | Scoping Field | Index | Risk |
| :--- | :--- | :--- | :--- |
| `Tenant` | `id`, `slug` | Unique | Low |
| `Member` | `tenantId` | Indexed | Low |
| `ServicePlan` | `tenantId` | Indexed | Low |
| `Event` | `tenantId` | Unique (`tenantId`, `slug`) | Low |
| `Offering` | `tenantId` | Indexed | Low |
| `Hymn` | **None** | Global | Low (if intentional) |

## Query Analysis

### 1. `getHymns` (`actions/hymnal-actions.ts`)
- **Query:** `db.hymn.findMany({})`
- **Filter:** None.
- **Verdict:** ✅ SAFE (Global Data).

### 2. `getSabbathSchedule` (`actions/member.ts`)
- **Query:** `prisma.servicePlan.findMany({ where: { tenantId } })`
- **Filter:** Uses `tenantId`.
- **Risk:** 🚨 **CRITICAL** - `tenantId` is **Hardcoded** to `'batangas'`. The query *structure* is safe, but the *parameter source* is compromised. It forces cross-tenant leakage by design (for demo).

### 3. `submitOffering` (`actions/member.ts`)
- **Query:** `prisma.offering.create({ data: { tenantId ... } })`
- **Filter:** Uses `tenantId`.
- **Risk:** 🚨 **CRITICAL** - Hardcoded `tenantId`.

## Conclusion
The database schema supports multi-tenancy well. However, the application logic explicitly bypasses dynamic tenant resolution in favor of a hardcoded demo tenant, creating a massive logical isolation failure.
