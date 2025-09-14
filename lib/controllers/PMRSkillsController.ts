import { PMRSkillsToolsProps } from "../constants";
import { getBrandIconsFromItems } from "../utils";

export class PMRSkillsController {
    locale: string;

    constructor(locale: string) {
        this.locale = locale;
    }

    async loadSkills(): Promise<Array<string>> {
        try {
            const skills = (await import("@/data/PMRSkills.json")).default;
            return skills["skills"];
        } catch (error) {
            console.error("Error loading PMRSkills:", error);
            return [];
        }
    }

    async loadSkillsTools(): Promise<
        Record<string, Array<PMRSkillsToolsProps>>
    > {
        try {
            const items: Record<string, Array<PMRSkillsToolsProps>> = (
                await import("@/data/PMRSkillsTools.json")
            ).default;
            for (const category in items) {
                items[category] = getBrandIconsFromItems(items[category]);
            }
            return items;
        } catch (error) {
            console.error("Error loading PMRSkills tools:", error);
            return {};
        }
    }
}
