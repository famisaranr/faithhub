# ASD-CHURCH-000: Application Specification Document - FaithHub

## 4.1 Application Domains
Tenant Management, Event Builder, Public Site Renderer, RSVP System, PWA Layer, Domain Routing, Admin Console.

## 4.2 Non-Functional Requirements
- **Multi-tenant isolation:** Strict data separation.
- **Performance:** Lighthouse >90, Edge routing for speed.
- **Security:** SSL by default, RBAC, Rate limits, Audit logs.
- **Compliance:** GDPR-ready data export.

## 4.3 Deployment Doctrine
- **Default:** `events.faithhub.com` (Subdomain)
- **Pro:** `events.church.org` (Custom Domain, Auto-SSL)
- **Mobile:** PWA manifest per tenant (Installable).
