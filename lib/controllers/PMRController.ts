import { PMRMenuProps, PMRMenuPropsBrand } from "@/lib/constants";
import {
    getBrandIconsFromItems,
    getIconsFromItems,
    getLocalizedItems,
} from "@/lib/utils";

// Types pour une meilleure lisibilité
type MenuDataInput =
    | PMRMenuProps<string, boolean>[]
    | PMRMenuPropsBrand<boolean>[];
type MenuDataOutput =
    | PMRMenuProps<React.ElementType, boolean>[]
    | PMRMenuProps<React.ComponentType, boolean>[]
    | PMRMenuPropsBrand<boolean>[];

/**
 * Classe de base pour le chargement et la transformation des données de menu JSON
 */
class PMRController {
    protected locale: string;

    constructor(locale: string) {
        this.locale = locale;
    }

    /**
     * Charge et transforme les données JSON de menu
     * Pipeline : Chargement -> Localisation (si URL obligatoire) -> Conversion des icônes
     *
     * @param fileName - Nom du fichier JSON dans /data/
     * @param key - Clé des données dans le JSON
     * @param urlRequired - Si true, localise les URLs avec la locale
     * @param brandIcons - Si true, utilise getBrandIconsFromItems, sinon getIconsFromItems
     * @returns Données transformées
     */
    protected async loadJSONData<T extends MenuDataOutput>(
        items: MenuDataInput,
        urlRequired: boolean,
        brandIcons: boolean
    ): Promise<T> {
        // 1. Localisation des URLs si nécessaire
        if (urlRequired) {
            items = this.localizeItems(items);
        }

        // 3. Conversion des icônes
        const finalItems = this.convertIcons(items, brandIcons);

        return finalItems as T;
    }

    /**
     * Étape 1: Chargement des données brutes depuis le JSON
     */
    protected async loadRawData(
        importedModule: { [key: string]: unknown },
        key: string
    ): Promise<MenuDataInput> {
        if (!key?.trim()) {
            throw new Error("key must be a non-empty string");
        }

        const data = importedModule[key];

        if (!data) {
            throw new Error(`Key "${key}" not found in imported module`);
        }

        if (!Array.isArray(data)) {
            throw new Error(
                `Expected array for key "${key}" but got ${typeof data}`
            );
        }

        return data;
    }

    /**
     * Étape 2: Localisation des URLs avec vos fonctions utils
     */
    private localizeItems(items: MenuDataInput): MenuDataInput {
        if (!this.locale?.trim()) {
            throw new Error(
                "Locale is required for URL localization but is empty"
            );
        }

        try {
            return getLocalizedItems(items, this.locale);
        } catch (error) {
            throw new Error(
                `URL localization failed: ${
                    error instanceof Error ? error.message : String(error)
                }`
            );
        }
    }

    /**
     * Étape 3: Conversion des icônes avec vos fonctions utils
     */
    private convertIcons(
        items: MenuDataInput,
        brandIcons: boolean
    ): MenuDataOutput {
        try {
            if (brandIcons) {
                // Validation pour brand icons
                const brandItems = items as PMRMenuPropsBrand<boolean>[];
                const invalidItems = brandItems.filter(
                    (item) => !item.mode || !item.name
                );

                if (invalidItems.length > 0) {
                    throw new Error(
                        `Brand icons conversion failed: ${invalidItems.length} items missing required "mode" or "name" property. ` +
                            `Items: ${invalidItems
                                .map((item) => item.id || "unknown")
                                .join(", ")}`
                    );
                }

                // Utilisation de votre fonction utils
                return getBrandIconsFromItems(
                    brandItems as PMRMenuPropsBrand<true>[]
                );
            } else {
                // Validation pour icônes régulières
                const menuItems = items as PMRMenuProps<string, boolean>[];
                const invalidItems = menuItems.filter(
                    (item) => !item.icon || typeof item.icon !== "string"
                );

                if (invalidItems.length > 0) {
                    throw new Error(
                        `Regular icons conversion failed: ${invalidItems.length} items missing or invalid "icon" property. ` +
                            `Items: ${invalidItems
                                .map((item) => item.id || "unknown")
                                .join(", ")}`
                    );
                }

                // Utilisation de votre fonction utils
                return getIconsFromItems(menuItems);
            }
        } catch (error) {
            throw new Error(
                `Icon conversion failed: ${
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
