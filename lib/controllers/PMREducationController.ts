import { JSONProps } from "../constants";
import PMRController from "./PMRController";

const URL_REQUIRED = false;

export class PMREducationController extends PMRController {
    constructor(locale: PMRController["locale"]) {
        super(locale);
    }

    /**
     * Charge les formations (JSONProps)
     */
    async loadEducations(): Promise<JSONProps[]> {
        const importedModule = await import("@/data/PMREducation.json");
        const items: JSONProps[] = await this.loadRawData(importedModule);
        return this.loadJSONData(items, URL_REQUIRED);
    }
}
