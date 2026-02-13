# AuthZ Pattern Report

## Pattern Inventory
Search executed for: `authorize`, `can`, `guard`, `requireRole`, `permission`.

**Results:**
- **Matches:** 0
- **Guards:** 0
- **Middleware Rules:** 0

## Findings

### 1. Admin Dashboard (`(admin)/dashboard`)
- **Pattern:** None.
- **Status:** 🔴 **Open to Public**.
- **Impact:** Any user knowing the URL can view dashboard stats (mocked or real).

### 2. Member Actions
- **Pattern:** None.
- **Status:** 🔴 **Implicit Trust**.
- **Impact:** `submitOffering` assumes the caller is `mem_123`.

### 3. Tenant Creation
- **Pattern:** None.
- **Status:** 🔴 **Publicly Executable**.
- **Impact:** `createTenant` action can be called by anyone to spam database or squat on slugs.

## Consistency Rating
**Score:** 0/5
Consistently **INSECURE**. No patterns established.
