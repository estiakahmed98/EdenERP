# Shared live demo popup — frontend scope

The final instruction for this task is **no backend work**. Booking schema
additions were reverted. `prisma/schema.prisma` matches its original tracked
version. No migrations, database writes, new booking API, email sender or external
calendar integration were created.

## Implemented experience

The homepage Hero's former Watch Demo button now uses `LiveDemoButton`. All
39 source placements across 20 files use that component. It is a native button
that opens one shared Radix dialog through `DemoBookingProvider`; it retains the
translated label, EdenERP gradient, hover lift, focus outline and responsive text.
The locale layout owns one public popup. The existing protected Admin layout has
a separate preview of the same implementation.

The popup has an editorial navy illustration panel, a three-step progress
indicator, responsive form panels, a keyboard-operable calendar, timezone-aware
time choices, a review screen and an animated draft-ready state. It supports
light/dark themes, reduced motion, inline validation, error announcements,
step-heading focus and return focus to the originating CTA when closed.

1. **Client details:** name, company, business email, phone, country, ERP module
   choices and an optional message. Required values, email syntax, phone digits
   and field lengths are validated locally with Zod.
2. **Preferred date and time:** the advisor calendar uses its configured timezone.
   Time labels convert to the visitor's selected timezone, including fractional
   offsets and daylight-saving changes. Past dates/times, excluded weekdays,
   lead-time violations and dates outside the planning horizon are unavailable
   as preferences. The interface explicitly says these are **not published
   availability or reservations**.
3. **Review and prepare:** details and time can be edited. An acknowledgement
   explains that this is an unsubmitted draft. Preparing it opens a draft-ready
   screen with a working plain-text download containing the actual entered
   information and an explicit unsubmitted/unconfirmed notice.

There is no booking reference, fake successful booking, generated meeting link,
email-sent claim or simulated network submission. Actual duplicate booking
prevention and conflict detection across clients require a backend and are not
represented as implemented. Repeated clicks cannot create records because this
version does not submit or create bookings.

## Defaults and local Admin settings

`/admin/demo-bookings` uses the existing Admin authentication. The sidebar links
to this frontend settings screen. It allows duration, advisor timezone, working
days, start/end hours, lead time and planning horizon to be changed.

- Duration: 30 minutes.
- Advisor timezone: Asia/Dhaka.
- Working days: Sunday–Thursday; Friday and Saturday excluded.
- Working hours: 10:00–18:00.
- Planning lead time: two hours; horizon: 90 days, both editable.

Save and Restore Defaults write **only non-personal schedule settings** to
`eden.demo-planner.settings.v1` in this browser's localStorage. Same-window events
and cross-tab storage events refresh the popup. Storage failures show an error;
an invalid saved setting falls back to defaults. These settings are not a
published schedule, and do not sync to other devices or customers.

Client details remain in React state while this application surface is mounted.
They are never written to localStorage or sent to a booking endpoint. Closing
and reopening the modal can resume that in-memory draft; refreshing clears it.
The only persistent copy of client details is the text file the client explicitly
chooses to download.

Admin shows truthful empty booking management and unconnected booking storage,
availability, email and Google/Microsoft calendar statuses. There is no credential
collection or fake integration toggle.

## Files and verification

- `components/demo-booking/`: shared provider, dialog, scoped styles and local
  Admin settings screen.
- `lib/live-demo-planner.ts`: frontend validation, schedule configuration,
  timezone conversion and draft export.
- `messages/en.json`: `common.demoBooking` UI copy; other locales receive the
  existing English fallback. The shared CTA retains all eight label translations.
- `node scripts/check-demo-planner.mjs`: working hours/weekends, lead time,
  date bounds, fractional offsets, DST gaps/repeats, midnight boundaries, settings
  validation, details validation, storage fallback, no personal-data persistence,
  draft disclosures, copy coverage and no booking API/database dependency.
- `node scripts/check-live-demo.mjs`: shared-component usage and label audit.

Focused TypeScript and ESLint checks cover the changed/new frontend files and
their imports. Representative HTTP renders cover the homepage, Accounting,
Manufacturing, QMS and University CTAs; the Admin route retains its existing
sign-in redirect. Browser visual and click verification could not run because
the browser access host is unavailable. HTTP/source checks do not substitute for
interactive viewport or keyboard testing.
