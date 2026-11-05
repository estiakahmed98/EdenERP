# Community redesign — Find a Partner excluded

## Scope and audit

The current header menu has 12 Community links in Learn, Get Services and
Collaborate. Redesign the 11 links other than Find a Partner, plus `/community`.
Preserve the other legacy/unlisted Community routes and shared legacy hub
component; do not silently broaden the scope to those routes.

Find a Partner is explicitly excluded. Preserve both its route and
`components/landing/community/get services/find-a-partner/PartnersPage.tsx`,
their translation resources and global styles. Initial SHA-256 values:

- Route: `50B31D4B53FCC5DA5C7F82B6A5C8D33CD1BC3121A4502A123FB63487D847DE6A`
- Component: `EFFD92F006514342CE99F4BDE011CDD432C5D05171A234B174B8FF06476144BA`

Existing pages largely repeat script headings, gradient mock screens,
testimonials and unverified statistics. Many search/category/read-more/action
controls have no handlers, and event/forum links use `#`. Tutorial cards do not
link to real video lessons. Blog currently uses translation sample cards even
though a public read-only `/api/blog` endpoint exists. Support uses placeholder
phone/email values despite real public contact destinations in `lib/site.ts`.
No ticket, event, forum-post, partnership or translation-write endpoint was found.

Keep all included routes, leaf import paths where present, locale alternates,
English content, light/dark tokens, responsive layout and accessibility. Reuse
the established industry typography/control foundation and `LiveDemoButton`,
without modifying that foundation or the booking popup/API. Community learning
content should remain readable; product-demo blur is not applied to guides.

## Page concepts

| Page             | Hero identity                                      | Useful content / interaction                                                 |
| ---------------- | -------------------------------------------------- | ---------------------------------------------------------------------------- |
| Community        | Connected Learn / Get Help / Collaborate directory | Search and filter the real menu destinations                                 |
| Tutorials        | Layered walkthrough cards and a reading path       | Searchable, expandable product-exploration guides                            |
| Documentation    | Reference index and document spread                | Searchable authored public-product guide notes                               |
| Training         | Role-to-module path and learning agenda            | Role/topic selection with real product links                                 |
| Blog             | Editorial journal and typographic article masthead | Real public API posts, search, pagination and inline text reading            |
| Meet an Advisor  | Conversation cards and a workflow brief            | Prepare a local discussion brief; open shared demo request                   |
| Support          | Help routes and contact compass                    | Search FAQs and open a draft to configured support email                     |
| Customer Stories | Context/workflow/review editorial storyboard       | Clearly illustrative workflow journeys, with no invented customer outcomes   |
| Forum            | Layered question and response notes                | Search starter discussions and prepare a local question/email draft          |
| Events           | Personal agenda and topic timeline                 | Prepare topics for a conversation; no invented public event schedule or RSVP |
| Translations     | Parallel-language notes and review flow            | Edit a real configured-label sample locally and download a draft             |
| Become a Partner | Collaboration bridge and practice profiles         | Explore paths, prepare a checklist and open a partnership enquiry draft      |

Content is based on implemented public presentations and new clearly authored
guide notes. No fabricated course videos, certifications, event registrations,
forum activity, translation percentages, partner status or customer testimonials
are presented as real. Blog uses existing GET behavior only, with no API/schema
changes and no fake fallback posts. Rich post content is displayed as escaped
plain text rather than injected HTML. No external messages are sent by the agent;
email-draft links require a visitor action in their own mail application.

Read the installed Next.js guidance per AGENTS.md; apply the Sites presentation
guidance and React review checklist. Implementation and validation results follow.
