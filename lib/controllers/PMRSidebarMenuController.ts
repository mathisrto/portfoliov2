import { JSONProps } from "../constants";
import PMRController from "./PMRController";

const URL_REQUIRED = true;

export class PMRSidebarMenuController extends PMRController {
    constructor(locale: PMRController["locale"]) {
        super(locale);
    }

    /**
     * Charge les items du sidebar menu (icônes classiques)
     */
    async loadItems(): Promise<JSONProps[]> {
        const importedModule = await import("@/data/PMRSidebarMenu.json");
        const items: JSONProps[] = await this.loadRawData(importedModule);
        return this.loadJSONData(items, URL_REQUIRED);
    }

    /**
     * Charge les liens du footer (brand icons)
     */
    async loadBrandItems(): Promise<JSONProps[]> {
        const importedModule = await import("@/data/PMRSidebarFooter.json");
        const items: JSONProps[] = await this.loadRawData(importedModule);
        return this.loadJSONData(items, URL_REQUIRED);
    }
}
