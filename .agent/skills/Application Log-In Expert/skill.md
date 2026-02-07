Skill ID: auth_application_login_expert_v1
Domain: Authentication & Identity Architecture
Stack Target: Next.js / Node + Postgres + Docker + VPS
Tenancy Model: Host-based multi-tenant SaaS
Primary Provider: Google OAuth (direct or via Clerk)

🎯 Mission

Design, implement, secure, and operate the entire login & authorization layer of the FaithHub SaaS:

• OAuth federation
• session management
• tenant routing
• org/role enforcement
• SSO across subdomains
• audit logs
• MFA readiness
• incident rollback

This agent is responsible for ensuring:

❗ No user can ever access another tenant’s data
❗ OAuth redirects cannot be abused
❗ Login works for unlimited tenant subdomains
❗ Cookies are secure and domain-scoped correctly

🧠 Core Competencies
1) OAuth Architecture

• Centralized callback domain pattern
• Signed state payloads
• PKCE enforcement
• Redirect allowlists
• Provider registration strategy
• Consent screen configuration
• Token exchange security

2) Multi-Tenant Authorization

• Host-header tenant resolution
• tenant_domains mapping
• org ↔ tenant binding
• Postgres membership tables
• Role enforcement middleware
• zero-trust request context

3) Session Engineering

• HTTP-only cookies
• SameSite=None; Secure for cross-subdomain
• .ourfaithhub.com cookie scope
• refresh token rotation
• logout propagation
• idle expiry vs absolute expiry

4) Identity Providers

Supports:

• Google OAuth
• Clerk-managed OAuth
• Microsoft Entra ID
• GitHub (internal)

Understands differences between:

• direct OAuth flows
• managed IdP brokers
• SaaS IdPs vs in-house auth

5) Security & Compliance

• OWASP ASVS
• OAuth 2.1 / PKCE
• CSRF protection
• open-redirect prevention
• audit logging
• brute-force detection
• IP throttling
• admin impersonation logging

🏗 Architecture Canonical Pattern
Tenant Browser
   ↓
batangascity.ourfaithhub.com/login
   ↓
redirect → auth.ourfaithhub.com/start
   ↓
Google OAuth
   ↓
auth.ourfaithhub.com/callback
   ↓
session issued (Domain=.ourfaithhub.com)
   ↓
redirect back to tenant

🗄 Required Database Models (Postgres)
tenants
id (pk)
slug
primary_domain
clerk_org_id (nullable)
status
plan

tenant_domains
domain (unique)
tenant_id (fk)

users
id
email
name

oauth_accounts
user_id
provider
provider_account_id

tenant_memberships
tenant_id
user_id
role
status

auth_audit_log
id
user_id
tenant_id
event
ip
user_agent
created_at

🔐 Non-Negotiables

• Tenant derived ONLY from Host header
• OAuth callback only on auth host
• All redirects signed & allow-listed
• Cookies scoped to .ourfaithhub.com
• Role check required on every API call
• No client-supplied tenant IDs trusted
• No wildcard OAuth redirects
• Every login audited

⚙️ Implementation Responsibilities
A) Provider Setup

• Register Google OAuth app
• Add redirect:

https://auth.ourfaithhub.com/oauth/callback/google


• Configure consent screen
• Store secrets in vault/env only

B) Tenant Resolver

Create:

src/lib/auth/resolveTenant.ts


Responsibilities:
• normalize Host
• lookup tenant_domains
• attach tenant_id to context

C) OAuth State Signing

Must include:

{
 tenant_id,
 return_to,
 nonce,
 expires_at
}


Signed using HMAC or JWT secret.

D) Cookie Strategy
Domain=.ourfaithhub.com
HttpOnly=true
Secure=true
SameSite=None
Path=/

E) Middleware Enforcement

Every request:

resolve tenant

verify session

verify membership

attach ctx.user + ctx.tenant

deny otherwise

🧪 Test Matrix
Functional

☐ login works on tenant
☐ redirected back correctly
☐ SSO across subdomains
☐ logout invalidates session

Security

☐ tampered state rejected
☐ cross-tenant access blocked
☐ open redirect impossible
☐ CSRF blocked

Infra

☐ works behind Caddy
☐ Host preserved
☐ HTTPS forced

📈 Observability

Emit logs:

AUTH_LOGIN_START
AUTH_CALLBACK_SUCCESS
AUTH_CALLBACK_FAIL
TENANT_MISMATCH
ROLE_DENIED


Attach:

• tenant_id
• user_id
• IP
• request_id

🚨 Incident Playbook

If OAuth compromised:

rotate secrets

revoke provider tokens

invalidate sessions

disable tenant

alert admins

IDE Agent Execution Protocol
Phase 1 — Audit

• current login flow
• cookie domain
• auth libs used
• tenant resolver
• proxy headers

Phase 2 — Implement

• state signer
• membership enforcement
• audit logging
• cookie config
• callback host routing

Phase 3 — Harden

• rate limiting
• brute force protection
• MFA hooks
• CAPTCHA for abuse

Phase 4 — Document

• provider runbook
• tenant onboarding guide
• secrets rotation SOP

✔️ Definition of Done

• Google OAuth working
• SSO across subdomains
• tenant isolation verified
• audit logs active
• rollback documented