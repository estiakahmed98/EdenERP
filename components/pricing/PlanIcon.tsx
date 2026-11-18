import {
  BriefcaseBusiness,
  Building2,
  Gem,
  Network,
  Sprout,
  TrendingUp,
} from "lucide-react";
import css from "./pricing.module.css";

const planIcons = {
  basic: { icon: Sprout, tone: "sage" },
  professional: { icon: BriefcaseBusiness, tone: "blue" },
  star: { icon: TrendingUp, tone: "amber" },
  platinum: { icon: Gem, tone: "violet" },
  enterpriselite: { icon: Building2, tone: "blue" },
  enterprise: { icon: Network, tone: "sage" },
} as const;

// Keep the existing admin icon choices compatible with the presentation.
const iconAliases: Record<string, keyof typeof planIcons> = {
  "🌱": "basic",
  "⚡": "professional",
  "🚀": "star",
  "🏢": "platinum",
  "🏬": "enterpriselite",
  sprout: "basic",
  briefcase: "professional",
  growth: "star",
  gem: "platinum",
  building: "enterpriselite",
  network: "enterprise",
};

export function PlanIcon({
  planId,
  icon,
  className = "",
}: {
  planId: string;
  icon: string;
  className?: string;
}) {
  const key = Object.hasOwn(planIcons, planId)
    ? (planId as keyof typeof planIcons)
    : iconAliases[icon];
  const { icon: Icon, tone } = planIcons[key] ?? planIcons.professional;

  return (
    <span
      className={`${css.planIllustration} ${className}`}
      data-tone={tone}
      aria-hidden="true"
    >
      <Icon size={23} strokeWidth={1.65} />
    </span>
  );
}
