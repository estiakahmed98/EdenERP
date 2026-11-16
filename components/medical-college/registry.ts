export const collegePages = [
  { slug: "intake-admission", visual: "intake", next: "cards-items" },
  { slug: "cards-items", visual: "assessment", next: "professional-exams" },
  { slug: "professional-exams", visual: "examination", next: "ward-placement" },
  { slug: "ward-placement", visual: "rotation", next: "interns" },
  { slug: "interns", visual: "internship", next: "postgraduate-trainees" },
  { slug: "postgraduate-trainees", visual: "postgraduate", next: "governance" },
  { slug: "governance", visual: "governance", next: "college-settings" },
  {
    slug: "college-settings",
    visual: "configuration",
    next: "intake-admission",
  },
] as const;
export type CollegeSlug = (typeof collegePages)[number]["slug"];
export const collegeHref = (slug: string) => `/apps/medical-college/${slug}`;
