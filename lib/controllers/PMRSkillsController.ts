import { JSONProps } from "../constants";
import PMRController from "./PMRController";

const URL_REQUIRED = false;

export class PMRSkillsController extends PMRController {
    constructor(locale: PMRController["locale"]) {
        super(locale);
    }

    /**
     * Charge les compétences (JSONProps)
     */
    async loadSkills(): Promise<JSONProps[]> {
        const importedModule = await import("@/data/PMRSkills.json");
        const items: JSONProps[] = await this.loadRawData(importedModule);
        return this.loadJSONData(items, URL_REQUIRED);
    }

    /**
     * Charge les outils par catégorie (brand icons)
     */
    async loadSkillsTools(): Promise<JSONProps[]> {
        const importedModule = await import("@/data/PMRSkillsTools.json");
        const items: JSONProps[] = await this.loadRawData(importedModule);
        return this.loadJSONData(items, URL_REQUIRED);
    }
}
