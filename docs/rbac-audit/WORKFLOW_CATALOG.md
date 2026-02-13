# Workflow Catalog

## 1. Tenant Onboarding
- **Actor:** Anonymous User
- **Status:** 🔴 **Unsecured**
- **Trigger:** `actions/create-tenant.ts`
- **Data:** Creates `Tenant`, `Member` (Admin), `ServicePlan`
- **Risk:** Spam, Slug Squatting, Unverified Admins.

## 2. Member Profile Access
- **Actor:** Member / App User
- **Status:** 🔴 **Mocked / Fake**
- **Trigger:** `actions/member.ts` (`getMemberProfile`)
- **Data:** Returns hardcoded identity.
- **Risk:** Development artifact in production path.

## 3. Offering Submission
- **Actor:** Member
- **Status:** 🔴 **Mocked Context / Real Write**
- **Trigger:** `actions/member.ts` (`submitOffering`)
- **Data:** Writes to `Offering` table.
- **Risk:**
  - Hardcoded tenant (`batangas`) means all uploads go to one bucket/tenant.
  - No check if user `mem_123` actually exists in that tenant.
  - Financial data integrity risk.

## 4. Event RSVP
- **Actor:** Public User
- **Status:** 🟠 **Open**
- **Trigger:** `actions/submit-rsvp.ts`
- **Data:** Writes to `Rsvp` table.
- **Risk:** Valid for public events, but needs rate limiting and event existence validation.

## 5. Hymn Search
- **Actor:** Public / Member
- **Status:** 🟢 **Safe**
- **Trigger:** `actions/hymnal-actions.ts`
- **Data:** Reads `Hymn` table.
- **Risk:** Low. Hymns are public domain or global resources.

## 6. Officer Treasury Management
- **Actor:** Church Treasurer / Officer
- **Status:** 🔴 **Unsecured**
- **Trigger:** `actions/officer.ts` (`approveOffering`, `updateGivingConfig`)
- **Data:** Reads/Writes `Offering` transactions and tenant financial config.
- **Risk:**
  - **Critical IDOR:** Any user can approve any offering ID.
  - **Fraud:** Unauthenticated users can change the bank details (`updateGivingConfig`) to divert funds.
  - **Privacy:** `getPendingOfferings` exposes donor names and amounts.

## 7. Officer Member Management
- **Actor:** Church Clerk / Officer
- **Status:** 🔴 **Unsecured**
- **Trigger:** `actions/officer.ts` (`getMembers`)
- **Data:** Reads `Member` directory.
- **Risk:**
  - **PII Leak:** Exposes full member list, phones, emails, and addresses to the public.
  - No audit log of who accessed the directory.

## 8. Officer Communications (Bulletin/Events)
- **Actor:** Communications Secretary
- **Status:** 🔴 **Unsecured**
- **Trigger:** `actions/officer.ts` (`createBulletin`, `createEvent`, `deleteBulletin`)
- **Data:** Writes `Bulletin` and `Event` records.
- **Risk:**
  - **Defacement:** Unauthenticated users can post fake events or malicious bulletins.
  - **Data Loss:** Unauthenticated users can delete legitimate records.

## 9. Officer Service Planning
- **Actor:** Elder / Music Coordinator
- **Status:** 🔴 **Unsecured**
- **Trigger:** `actions/officer.ts` (`getServicePlans`, `ingestServicePlans`)
- **Data:** Reads/Writes `ServicePlan`.
- **Risk:**
  - **Data Leak:** Exposes upcoming service details and participants.
  - **Integrity:** Allows bulk injection of invalid or malicious service plans via CSV ingest.
