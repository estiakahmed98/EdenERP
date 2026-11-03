import type { ComponentType } from "react";
import { BomHero, RoutingsHero, WorkCentersHero } from "./foundation-heroes";
import {
  AllocationHero,
  ApsHero,
  CapacityHero,
  LineBoardHero,
  MpsHero,
  MrpHero,
} from "./planning-heroes";
import {
  ProductionOrdersHero,
  ScrapHero,
  ShopFloorHero,
  SubcontractHero,
} from "./execution-heroes";
import {
  BatchesHero,
  QcTemplatesHero,
  QualityHero,
  SerialsHero,
} from "./quality-trace-heroes";
import { ActualCostHero, StandardCostHero } from "./cost-heroes";
import type { HeroCopy, HeroProps, HeroSlug } from "./hero-parts";

/** Dedicated compositions; shared primitives only establish brand typography and controls. */
export const manufacturingHeroes = {
  "work-centers": WorkCentersHero,
  routings: RoutingsHero,
  "bill-of-materials": BomHero,
  "mrp-planning": MrpHero,
  "capacity-planning": CapacityHero,
  "master-schedule-mps": MpsHero,
  "scheduling-aps": ApsHero,
  "line-planning-board": LineBoardHero,
  "order-allocation": AllocationHero,
  "production-orders": ProductionOrdersHero,
  "shop-floor": ShopFloorHero,
  "batches-lots": BatchesHero,
  "serial-numbers": SerialsHero,
  "qc-templates": QcTemplatesHero,
  "quality-control": QualityHero,
  "scrap-waste": ScrapHero,
  subcontracting: SubcontractHero,
  "standard-costing": StandardCostHero,
  "production-costing": ActualCostHero,
} satisfies Record<HeroSlug, ComponentType<HeroProps>>;

export default function ManufacturingHero({
  slug,
  copy,
  target,
}: {
  slug: HeroSlug;
  copy: HeroCopy;
  target?: string;
}) {
  const Hero = manufacturingHeroes[slug];
  return <Hero copy={copy} target={target} />;
}
