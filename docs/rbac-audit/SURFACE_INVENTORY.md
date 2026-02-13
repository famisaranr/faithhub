# Surface Inventory

| Surface | Path | Purpose | Inputs | AuthN | AuthZ | Tenant Filter | Org Scope | Risk |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **API Route** | `apps/web/src/app/api/manifest/route.ts` | PWA Manifest Generation | `Host` header | **None** | **None** | Implicit (via Host) | None | Low (Public Info) |
| **Server Action** | `apps/web/src/actions/create-tenant.ts` | Create new Church Tenant | `churchName`, `slug`, `adminEmail`, etc. | **None** | **None** | N/A (Creates Tenant) | None | **Critical** (Unrestricted Tenant Creation) |
| **Server Action** | `apps/web/src/actions/hymnal-actions.ts` (`getHymns`) | Search Hymns | `search` string | **None** | **None** | **None** (Global) | None | Low (Public Data) |
| **Server Action** | `apps/web/src/actions/hymnal-actions.ts` (`getHymn`) | Get Single Hymn | `hymnId` | **None** | **None** | **None** (Global) | None | Low (Public Data) |
| **Server Action** | `apps/web/src/app/actions/submit-rsvp.ts` | Submit Event RSVP | `eventId`, `name`, `email` | **None** | **None** | Checks `eventId` existence (mocked comment) | None | Medium (Unverified Write) |
| **Server Action** | `apps/web/src/app/actions/member.ts` (`getMemberProfile`) | Get Member Profile | None | **Mocked** (Hardcoded delay & return) | **None** | None | None | **Critical** (Fake Identity) |
| **Server Action** | `apps/web/src/app/actions/member.ts` (`getSabbathSchedule`) | Get Service Schedule | None | **Mocked** (Hardcoded 'batangas' tenant) | **None** | Hardcoded 'batangas' | None | High (Hardcoded Tenant) |
| **Server Action** | `apps/web/src/app/actions/member.ts` (`submitOffering`) | Submit Offering | `breakdown`, `proof` | **Mocked** (Hardcoded 'batangas' tenant) | **None** | Hardcoded 'batangas' | None | **Critical** (Financial Data, Mocked Auth) |
| **Page** | `apps/web/src/app/(admin)/dashboard/page.tsx` | Admin Dashboard | None | **None** | **None** | None | None | **Critical** (Open Admin Access) |
| **Page** | `apps/web/src/app/[host]/page.tsx` | Tenant Home Page | `params.host` | **None** | **None** | Yes (`findUnique` by slug) | None | Low (Public Landing) |
