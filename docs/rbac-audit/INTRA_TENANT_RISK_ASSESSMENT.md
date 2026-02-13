# Intra-Tenant Risk Assessment: Officer Portal
**Date:** 2026-02-07
**Scope:** `apps/web/src/components/member-app/officer-portal` and `apps/web/src/app/actions/officer.ts`

## Executive Summary
The Officer Portal is intended to be a secure, high-privilege area for church officers (Treasurers, Clerks, Elders). However, the current implementation provides **zero security**. 

The portal relies entirely on a client-side generic PIN check ("2026"). Once this client-side gate is passed (or bypassed by invoking server actions directly), the backend (`officer.ts`) blindly executes commands against a hardcoded tenant (`'batangas'`) without validating the requesting user's identity, role, or session.

**Risk Level:** 🚨 **CRITICAL**

## 1. Authentication Architecture Flaws
*   **Client-Side "Security":** The PIN check (`verifyOfficerPin`) happens mostly on the client. While it calls a server action to validate the string, no session cookie or token is issued upon success. The "logged in" state is purely local React state (`view !== 'login'`).
*   **No User Context:** Server actions like `approveOffering` or `createBulletin` do not take a user ID argument, nor do they read cookies/headers. They are anonymous functions execution contexts.
*   **Hardcoded Tenant Context:** All actions call `getTenantId()`, which returns the ID for the slug `'batangas'`. This means the code is not even multi-tenant capable in its current state; it is a single-tenant instance hardcoded at the API layer.

## 2. Workflow Vulnerabilities

### A. Treasury (Giving & Offerings)
**Files:** `views/Treasury.tsx`, `actions/officer.ts`
*   **Workflow:** Officer views pending offerings -> Clicks "Approve" -> Status updates to 'APPROVED'.
*   **Vulnerability:**
    *   **Insecure Direct Object Reference (IDOR):** `approveOffering(id: string)` takes an offering ID. Since there is no auth check, *anyone* (even a non-logged-in user on the internet) who knows or guesses an offering ID can call this server action to approve transactions.
    *   **Data Leak:** `getPendingOfferings` returns financial data (amounts, names) to any caller.
    *   **Configuration Manipulation:** `updateGivingConfig` allows anyone to change the bank account numbers and GCash numbers displayed to members, allowing for potential financial diversion fraud.

### B. Clerk & Membership
**Files:** `views/Members.tsx`, `views/AdminLogistics.tsx`, `actions/officer.ts`
*   **Workflow:** Officer searches for members -> Views details -> Checks inventory.
*   **Vulnerability:**
    *   **PII Leak:** `getMembers(query)` exposes the entire member directory (names, roles, status) to the public internet.
    *   **Inventory Exposure:** `getInventory()` exposes asset data.

### C. Communications
**Files:** `views/Communications.tsx`, `actions/officer.ts`
*   **Workflow:** Officer creates/deletes bulletins and events.
*   **Vulnerability:**
    *   **Unrestricted Write Access:** `createBulletin` and `createEvent` allow unauthenticated creation of content. A malicious actor could flood the church calendar with fake events or inappropriate content.
    *   **Destructive Access:** `deleteBulletin` and `deleteEvent` allow unauthenticated deletion of church records.

### D. Programming (Services)
**Files:** `views/Programming.tsx`, `actions/officer.ts`
*   **Workflow:** Officer views and imports service plans.
*   **Vulnerability:**
    *   **Data Leak:** `getServicePlans` exposes the run sheet and participant names.
    *   **Write Access:** `ingestServicePlans` allows bulk insertion of data without checks.

## 3. Root Cause Analysis
1.  **Missing Auth Middleware:** The application lacks a global guard to ensure only authenticated users reach these actions.
2.  **Missing "User" Object:** The actions are written as utility functions rather than protected procedures. They don't ask "Who is asking?".
3.  **Development Shortcuts:** The use of hardcoded `'batangas'` slug suggests a "get it working" mentality that bypassed all multi-tenancy architecture.

## 4. Remediation Recommendations
1.  **Immediate:** Disable/Comment out the `apps/web/src/app/actions/officer.ts` file exports to prevent public access until fixed.
2.  **Short Term:** Implement the Authentication Plan (Clerk/NextAuth) defined in the main audit.
3.  **Refactor:** Rewrite `officer.ts` to:
    *   Derive `tenantId` from the authenticated user's organization scope.
    *   Throw `UnauthorizedError` if no session exists.
    *   Check `user.role` (e.g., `user.role === 'OFFICER'`) before returning data.
