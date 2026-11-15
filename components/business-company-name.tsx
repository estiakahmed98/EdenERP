import { siteConfig } from "@/lib/site";

/** The company name displayed below our office address in every locale. */
export default function BusinessCompanyName() {
  return (
    <strong
      dir="ltr"
      data-business-company-name
      className="mt-2 block w-fit text-[13px] font-semibold tracking-wide text-[#003180] dark:text-[#80bfff]"
    >
      {siteConfig.business.companyName}
    </strong>
  );
}
