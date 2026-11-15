import { siteConfig } from "@/lib/site";

/** The linked company name displayed above our office address in every locale. */
export default function BusinessCompanyName() {
  return (
    <strong
      dir="ltr"
      data-business-company-name
      className="mb-2 block w-fit text-[13px] font-semibold tracking-wide text-[#003180] dark:text-[#80bfff]"
    >
      <a
        href={siteConfig.business.companyWebsite}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
      >
        {siteConfig.business.companyName}
      </a>
    </strong>
  );
}
