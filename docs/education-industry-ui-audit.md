# Education industry pages — audit and design plan

Scope: the four existing menu routes `/industries/school`, `/industries/college`,
`/industries/university` and `/industries/lms`. All render `ComingSoonPage`.
Keep their URLs, metadata alternates, global header/footer and shared booking
popup. The industry index and Education/University app routes are outside scope.

The Education module already has 20 illustrative showcase pages and shared
school-themed components. University has dashboard/admissions showcases but eight
other app routes remain placeholders. `/apps/website/elearning` is an existing
eLearning marketing presentation. No learning-record backend is added here.
Links should lead to existing implemented presentations; no feature is presented
as a newly connected production service.

Use the Sites skill's local presentation workflow. Maintain the established
Rubik typography,  Adon ERP blue/navy/green, light/dark tokens, shared LiveDemoButton
and DemoPreview. No module navigation strip. Keep breadcrumb/hero spacing compact.

| Industry   | Visual story                                                     | Working local example                                           |
| ---------- | ---------------------------------------------------------------- | --------------------------------------------------------------- |
| School     | Open school-day notebook, illustrated campus and classroom cards | Attendance for four anonymous fictional learners                |
| College    | Editorial session prospectus and timetable ribbon                | Room/tutor/group overlap against three example lessons          |
| University | Campus architecture, academic journey and term dossier           | Example course-credit basket, never an eligibility decision     |
| LMS        | Learning studio with a lesson outline and practice diagram       | Reading lessons, explanatory quiz and resettable local progress |

Each page develops from its own hero into role-specific context, a working local
example, relevant existing product links, an illustrative half-blurred canvas,
practical FAQs and related education industries. No institution records were
supplied with this task: the image only identifies the four navigation entries.
Every record, count, schedule, course and progress display is illustrative.
Do not invent real customer claims, endorsements, statistics or integrations.

Implemented all four existing routes through `components/education/industry`.
The school-day illustration, session prospectus, architectural campus stage and
lesson studio have separate hero structures. Role buttons change the supporting
story. The local attendance register, timetable conflict checker, credit basket,
lesson reader, knowledge check and completion controls work through component
state. No persistence, enrolment, eligibility, grade, certificate or booking API
was added. The global live-demo popup remains the sole booking mechanism.

Completed verification:

- Focused TypeScript compilation passes for the six implementation files, four
  industry routes, imports and project declarations.
- Focused ESLint passes for all eleven TypeScript/TSX/validation files.
- `node scripts/check-education-industries.mjs` passes time-overlap, room/tutor/
  group collisions, adjacent non-overlapping sessions, invalid times, duplicate
  credit selection, unknown courses and invalid credits. It also verifies the
  four route mappings and that product links point to implemented previews.
- `node scripts/check-live-demo.mjs` passes 50 shared CTA placements across 28
  source files and all eight translation catalogs.
- All twelve industry responses across `en`, `bn` and `ar` return HTTP 200 with
  the right industry identity, one H1, English content, the working-example
  section, half-blurred canvas and three shared CTA instances.
- All thirteen unique linked product-preview destinations return HTTP 200 in
  English; no link points to a `ComingSoonPage` implementation.
- CSS parses and all static CSS-module references resolve. Desktop, tablet,
  mobile and narrow-screen rules are implemented, with focus treatments, native
  labelled form controls, native FAQ details and reduced-motion styles.
  `git diff --check` passes.

The existing development server is reused. Its generated prerender manifest was
valid at the start of route verification; no repair or server restart was needed.
Browser discovery again reports that the browser access host is unavailable.
Desktop/mobile screenshot review and in-browser keyboard/click/overflow testing
remain incomplete. HTTP and source validation do not replace visual QA. No full
production build or repository-wide lint result is claimed.
