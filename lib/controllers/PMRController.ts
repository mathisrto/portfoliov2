import { JSONBrandIconProps, JSONProps } from "@/lib/constants";
import { localizeItems, mapIcons } from "@/lib/utils";

/**
 * Classe de base pour le chargement et la transformation des données JSON
 */
class PMRController {
    protected locale: string;

    constructor(locale: string) {
        this.locale = locale;
    }

    /**
     * Étape 1: Chargement des données brutes depuis un module JSON
     */
    protected async loadRawData(importedModule: {
        [key: string]: unknown;
    }): Promise<JSONProps[]> {
        const data = importedModule["items"];

        if (!data) {
            throw new Error(`Key "items" not found in imported module`);
        }

        if (!Array.isArray(data)) {
            throw new Error(
                `Expected "items" to be an array but got ${typeof data}`
            );
        }

        // Validation minimale de structure
        const validatedItems = (data as JSONProps[]).map((item) => {
            if (!item.id) {
                throw new Error("Each JSON item must have an 'id' property");
            }

            if (item.icon?.isBrand) {
                if (
                    !(item.icon as JSONBrandIconProps).light ||
                    !(item.icon as JSONBrandIconProps).dark
                ) {
                    throw new Error(
                        `Brand icon for item "${item.id}" must have 'light' and 'dark' properties`
                    );
                }
            }

            return item;
        });

        return validatedItems;
    }

    /**
     * Charge et transforme les données JSON
     * Pipeline : Localisation -> Conversion des icônes
     */
    async loadJSONData(
        items: JSONProps[],
        urlRequired: boolean = true
    ): Promise<JSONProps[]> {
        let processedItems = items;

        if (urlRequired) {
            processedItems = this.localizeItems(processedItems);
        }

        processedItems = this.mapIcons(processedItems);

        return processedItems;
    }

    /**
     * Localise les URLs des items
     */
    private localizeItems(items: JSONProps[]): JSONProps[] {
        if (!this.locale?.trim()) {
            throw new Error(
                "Locale is required for URL localization but is empty"
            );
        }

        try {
            return localizeItems(items, this.locale);
        } catch (error) {
            throw new Error(
                `URL localization failed: ${
                    error instanceof Error ? error.message : String(error)
                }`
            );
        }
    }

    /**
     * Transforme les icônes pour qu’elles soient prêtes à être rendues
     */
    private mapIcons(items: JSONProps[]): JSONProps[] {
        try {
            return mapIcons(items);
        } catch (error) {
            throw new Error(
                `Icon mapping failed: ${
                    error instanceof Error ? error.message : String(error)
                }`
            );
        }
    }

    /**
     * Méthode utilitaire pour changer la locale
     */
    setLocale(locale: string): void {
        if (!locale?.trim()) {
            throw new Error("Locale must be a non-empty string");
        }
        this.locale = locale;
    }

    /**
     * Getter pour la locale actuelle
     */
    getLocale(): string {
        return this.locale;
    }
}

export default PMRController;
