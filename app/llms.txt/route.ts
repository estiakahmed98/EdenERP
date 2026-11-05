import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const body = `# ${siteConfig.name}

> ${siteConfig.description}

Adon ERP is a modular, multi-language ERP platform covering accounting, CRM, sales & POS, inventory, manufacturing, HR & payroll, fund accounting and industry-specific solutions.

## Key pages
- [Home](${siteConfig.url}/en)
- [Apps](${siteConfig.url}/en/apps)
- [Industries](${siteConfig.url}/en/industries)
- [Pricing](${siteConfig.url}/en/pricing)
- [Contact](${siteConfig.url}/en/contact)
- [Help](${siteConfig.url}/en/help)

## Sitemap
${siteConfig.url}/sitemap.xml
`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
