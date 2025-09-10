import { PMRSidebarMenuProps } from "../constants";
import {
    getBrandIconsFromItems,
    getIconsFromItems,
    getLocalizedItems,
} from "../utils";

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

    async loadFooterLinks(): Promise<PMRSidebarMenuProps[]> {
        try {
            const links = (await import("@/data/PMRSidebarFooter.json")).default
                .links;
            const linksWithIcons = getIconsFromItems(links);
            return getBrandIconsFromItems(linksWithIcons);
        } catch (error) {
            console.error("Error loading PMRSidebarFooterLinks:", error);
            return [];
        }
    }
}
