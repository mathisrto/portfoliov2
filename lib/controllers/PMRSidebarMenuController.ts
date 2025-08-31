import { PMRSidebarMenuProps } from "../constants";
import { getIconsFromItems, getLocalizedItems } from "../utils";

export class PMRSidebarMenuController {
    locale: string;

    constructor(locale: string) {
        this.locale = locale;
    }

    // Méthode principale pour charger les items
    async loadItems(): Promise<PMRSidebarMenuProps[]> {
        try {
            const items = (await import("@/data/PMRSidebarMenu.json")).default
                .items;
            const itemsWithIcons = getIconsFromItems(items);
            return getLocalizedItems(itemsWithIcons, this.locale);
        } catch (error) {
            console.error("Error loading PMRSidebarMenuItems:", error);
            return [];
        }
    }
}
