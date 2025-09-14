import { PMRMenuPropsBrand } from "../constants";
import PMRController from "./PMRController";

const URL_REQUIRED = false;

export class PMRSkillsController extends PMRController {
    constructor(locale: string) {
        super(locale);
    }

    async loadSkills(): Promise<string[]> {
        const importedModule: Record<string, unknown> = await import(
            "@/data/PMRSkills.json"
        );
        return importedModule.skills as string[];
    }

    async loadSkillsTools(): Promise<
        Record<string, PMRMenuPropsBrand<typeof URL_REQUIRED>[]>
    > {
        const items: Record<string, PMRMenuPropsBrand<typeof URL_REQUIRED>[]> =
            {};
        const importedModule: Record<string, unknown> = await import(
            "@/data/PMRSkillsTools.json"
        );
        for (const key in importedModule) {
            if (importedModule[key] && Array.isArray(importedModule[key])) {
                const datas = await this.loadRawData(importedModule, key);
                items[key] = await this.loadJSONData<
                    PMRMenuPropsBrand<typeof URL_REQUIRED>[]
                >(datas, URL_REQUIRED, true);
            }
        }
        return items;
    }
}
