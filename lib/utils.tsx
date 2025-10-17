import { clsx, type ClassValue } from "clsx";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import PMRBrandIcon from "./components/PMRBrandIcon";
import {
    icons,
    JSONBrandIconProps,
    JSONIconProps,
    JSONProps,
} from "./constants";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Transforme un tableau de JSONProps en ajoutant l'élément React à utiliser
 */
export function mapIcons(items: JSONProps[]): JSONProps[] {
    return items.map((item) => {
        if (!item.icon) return item;

        if (item.icon.isBrand === undefined) {
            throw new Error(
                `L'icône pour l'élément avec l'id "${item.id}" n'a pas de propriété "isBrand" définie.`
            );
        }

        if (item.icon.isBrand) {
            // Icône de marque
            return {
                ...item,
                icon: {
                    ...item.icon,
                    elm: () => (
                        <PMRBrandIcon
                            id={item.id}
                            icon={item.icon as JSONBrandIconProps}
                            size={(item.icon as JSONBrandIconProps).size}
                        />
                    ),
                },
            };
        } else {
            const iconName = (item.icon as JSONIconProps).icon;
            return {
                ...item,
                icon: {
                    ...(item.icon as JSONIconProps),
                    elm: icons[iconName],
                },
            };
        }
    });
}

/**
 * Préfixe les urls avec le locale
 */
export function localizeItems(items: JSONProps[], locale: string): JSONProps[] {
    return items.map((item) => ({
        ...item,
        url:
            item.url && !/^https?:\/\//.test(item.url)
                ? `/${locale}${item.url}`
                : item.url,
    }));
}

export const loadImage = (
    projectId: string,
    imageName: string,
    alt: string,
    options?: { width?: number; height?: number; className?: string }
) => {
    try {
        const url = `/images/${projectId}/${imageName}.png`;

        return (
            <div className="w-full h-full relative" style={{ ...options }}>
                <Image src={url} alt={alt} fill className="object-contain" />
            </div>
        );
    } catch (error) {
        console.error("Error loading image:", error);
        return <></>;
    }
};
