import { JSONProps } from "../constants";
import PMRController from "./PMRController";

const URL_REQUIRED = false;

export class PMRExperiencesController extends PMRController {
    constructor(locale: PMRController["locale"]) {
        super(locale);
    }

    /**
     * Charge les expériences (JSONProps)
     */
    async loadExperiences(): Promise<JSONProps[]> {
        const importedModule = await import("@/data/PMRExperiences.json");
        const items: JSONProps[] = await this.loadRawData(importedModule);
        return this.loadJSONData(items, URL_REQUIRED);
    }
}
