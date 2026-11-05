import {
  RetailIndustryPage,
  retailMetadata,
} from "@/components/industries/retail/page";

export function generateMetadata() {
  return retailMetadata("book-store");
}

export default function BookStorePage() {
  return <RetailIndustryPage slug="book-store" />;
}
