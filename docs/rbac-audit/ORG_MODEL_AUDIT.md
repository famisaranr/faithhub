# Org Model Audit

## Organizational Structure Analysis
**File:** `apps/web/prisma/schema.prisma`

### Current Model
The current schema implements a **Flat Multi-Tenancy** model:
- `Tenant` table represents a Church.
- `Member` belongs to `Tenant`.
- `Event`/`Offering`/`Bulletin` belong to `Tenant`.

**Missing Entities:**
- `Conference` (Regional HQ)
- `Union`
- `Division`
- `District`
- `Department` (e.g., Youth, Treasury, Secretariat) within a Church.
  - *Note:* `Member` has specific roles (`officer`, `elder`), but no table defining the "Treasury Department" as an entity that owns resources.

### Hierarchy & Scoping
- **Parent-Child:** 🔴 **None.** Tenants are islands. No way to aggregate reports at a "District" level.
- **Subtree Scoping:** 🔴 **Impossible** with current schema. A "Conference Admin" cannot verify "Church" data without logging into that specific church context.

## Recommendations
1. **Short Term:** Maintain flat model but fix the leakage.
2. **Long Term:**
   - Add `parentId` to `Tenant` (Adjacency List) or...
   - Create `Organization` table with Closure Table pattern for efficient subtree queries.
   - Add `Department` entity to scope `InventoryItem`, `Offering`, `Bulletin` to specific internal groups (e.g., "Youth Dept" vs "Treasury").
