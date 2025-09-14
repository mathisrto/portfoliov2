import { PMRMenuProps, PMRMenuPropsBrand } from "../constants";
import PMRController from "./PMRController";

const URL_REQUIRED = true;

export class PMRSidebarMenuController extends PMRController {
    constructor(locale: PMRController["locale"]) {
        super(locale);
    }

    async loadItems(): Promise<
        PMRMenuProps<React.ElementType, typeof URL_REQUIRED>[]
    > {
        const importedModule = await import("@/data/PMRSidebarMenu.json");
        const items = await this.loadRawData(importedModule, "items");
        return this.loadJSONData<
            PMRMenuProps<React.ElementType, typeof URL_REQUIRED>[]
        >(items, URL_REQUIRED, false);
    }

    async loadBrandItems(): Promise<PMRMenuPropsBrand<typeof URL_REQUIRED>[]> {
        const importedModule = await import("@/data/PMRSidebarFooter.json");
        const items = await this.loadRawData(importedModule, "links");
        return this.loadJSONData<PMRMenuPropsBrand<typeof URL_REQUIRED>[]>(
            items,
            URL_REQUIRED,
            true
        );
    }
}
