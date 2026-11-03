# Compact live demo request

## Current behavior

The former calendar planner is replaced by one small white request popup.
All 39 shared CTA placements still use LiveDemoButton and the same provider.
There is no calendar, date/time selection, country field, stepper, local schedule
configuration or downloadable unsubmitted draft.

The public form requires only Full Name, Company Name and Phone Number. The
question “Would you like to share any additional information?” defaults to No.
Yes reveals optional Email, Interested ERP Modules and Message fields. Returning
to No clears these fields in memory; the server independently discards hidden
optional information. Choosing Yes does not make any optional field required.

The visual redesign uses a 500 px maximum width, a soft-white surface and a
compact default height. A small vector conversation illustration, pale blue/green
header glow and a fine decorative curve frame the title without a dark sidebar.
These graphics are decorative, not product data or endorsements. Navy typography,
the blue/navy CTA and small green accents retain the brand palette.

The three required inputs are integrated rows in one contact card, with field
icons, quiet dividers, clear labels and focus-within highlights. Yes/No is a
compact segmented control; optional fields expand inside their own light panel.
The footer has a restrained translucent surface and the primary action has a
small arrow detail. No reviews, customer counts or trust badges were added.

Header/footer remain outside one scrollable body. Visual Viewport handling
accommodates mobile keyboards; short viewports use a compact header. Mobile
inputs use 16 px text, and narrow-screen spacing preserves access to all controls.
Reduced motion, Radix focus trapping, Escape/close behavior, validation
announcements and return focus remain. The optional section expands only within
the visible viewport bounds.

## Real submission and storage

POST /api/demo-requests validates the payload and saves it to PostgreSQL through
the existing parameterized Prisma connection. The client shows the exact message:

> Thank you! Our team will contact you shortly to arrange your demo.

only after a successful HTTP response containing saved: true and a valid saved
request UUID. Database/network failures show a retryable error and preserve
input. There is no simulated submit, fake reference or email-delivery claim.
A completed request clears the form’s personal data from memory.

Server-side controls include required/length/phone/email/module validation,
strict payload shape, a 16 KB body bound, same-origin POST checks, a honeypot,
database-backed rate limiting and database uniqueness. The browser uses one
request key per normalized payload and retains it on retry. Identical normalized
payloads are also deduplicated within the UTC day; a successful duplicate response
refers to an existing committed record. No request data is stored in localStorage.

Rate limits use hashed address/hour buckets (five new requests per hour). On a
production deployment, forwarded address headers must come from the trusted
reverse proxy. These controls do not depend on process-local memory.

## Admin inbox

The existing /admin/demo-bookings URL now displays Demo requests and remains
protected by the existing Admin session requirement. Its API separately checks
the ADMIN role for both reads and writes.

The inbox provides real database counts, name/company/phone/email search,
status filtering, pagination, contact details and follow-up notes. Statuses are
New, Contacted, Demo arranged and Closed. Demo arranged is a manual follow-up
status; there is no calendar booking or availability claim.

Updates use a version check. A stale concurrent edit returns HTTP 409 rather
than overwriting another administrator’s changes. Refreshing the list does not
silently advance an in-progress editor’s version. Successful saves display the
actual persisted row returned by the API. Loading, errors and empty results are
explicit; no demo records are seeded.

## Schema and deployment

The additive migration is:

prisma/migrations/20261103_add_demo_requests/migration.sql

It creates only DemoRequestStatus, demo_requests and demo_request_rate_limits,
with uniqueness and lookup indexes. It does not alter or delete existing tables.
It has already been applied to the audited local PostgreSQL database. The
existing database has no Prisma migration-history table; this task did not
re-baseline unrelated tables or apply the older pricing migration.

For another environment with the same existing schema, apply this SQL once
through its schema deployment process, then generate the Prisma client. For the
repository’s current manually managed setup, the equivalent commands are:

    npx prisma db execute --file prisma/migrations/20261103_add_demo_requests/migration.sql
    npx prisma generate

Do not execute the migration twice. Baseline the existing database before
adopting Prisma migrate deploy for the repository’s full migration history.
DATABASE_URL must identify the intended PostgreSQL database. No email or external
calendar configuration is required for this contact-request flow.

## Validation

- node scripts/check-demo-requests.mjs checks required/optional inputs, hidden-data
  stripping, phone normalization, acknowledgement validation, request body/origin
  limits, database-failure responses and admin role boundaries.
- node scripts/check-demo-requests.mjs --integration exercises the running local
  app and real PostgreSQL: saving, retry and concurrent deduplication, rate limits,
  admin search/status/notes and concurrent-edit protection. It accepts a local
  --base-url value and refuses remote app/database targets. Only this run’s
  synthetic rows and rate buckets are removed afterward; no seed data remains.
- node scripts/check-live-demo.mjs checks shared CTA usage across all modules.
- Focused TypeScript, ESLint, Prisma validation and representative HTTP renders
  cover the changed feature. API and database integration checks have passed.

Browser access was attempted again, but its access host is unavailable. Visual,
mobile keyboard and in-browser click checks remain unverified. No browser pass
or production visual certification is claimed.

For the latest visual redesign, the supplied message contained no attached
reference screenshots. The implementation follows its written visual brief.
Desktop/mobile screenshot capture was attempted through browser discovery, which
returned “The browser access host is unavailable.” No substitute mockups are
presented as QA screenshots. TypeScript, ESLint, request unit tests, shared CTA
checks and presentation source checks pass. A comparison against a pre-redesign
snapshot confirms that the request handlers, API, validation, database schema,
shared provider and shared button were not changed by this visual work.
