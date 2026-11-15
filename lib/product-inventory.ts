import { appsMegaMenu } from "./apps-menu";
import { industriesMegaMenu } from "./industries-menu";

/** A module is one Apps-menu group; a page is a distinct linked route.
 * These are public presentation-directory counts, not deployed tenant features,
 * licenses, customers, or a count of every route in this repository.
 * "App" and "tool" are descriptive terms, not additional counted inventories.
 */
export const productInventory = {
  modules: appsMegaMenu,
  appPages: [
    ...new Set(
      appsMegaMenu.flatMap((module) => module.links.map((link) => link.href)),
    ),
  ],
  sectors: industriesMegaMenu,
  industryPages: [
    ...new Set(
      industriesMegaMenu.flatMap((sector) =>
        sector.links.map((link) => link.href),
      ),
    ),
  ],
} as const;

export const productCounts = {
  modules: productInventory.modules.length,
  appPages: productInventory.appPages.length,
  sectors: productInventory.sectors.length,
  industryPages: productInventory.industryPages.length,
} as const;
