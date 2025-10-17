import { JSONProps } from "../constants";
import PMRController from "./PMRController";

const URL_REQUIRED = false;

export class PMRPortfolioController extends PMRController {
    constructor(locale: PMRController["locale"]) {
        super(locale);
    }

    /**
     * Charge les projets (JSONProps)
     */
    async loadProjects(): Promise<JSONProps[]> {
        const importedModule = await import("@/data/PMRPortfolio.json");
        const items: JSONProps[] = await this.loadRawData(importedModule);
        return this.loadJSONData(items, URL_REQUIRED);
    }
}
