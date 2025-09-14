import { clsx, type ClassValue } from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";
import PMRBrandIcon from "./components/PMRBrandIcon";
import { icons, PMRMenuProps, PMRMenuPropsBrand } from "./constants";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getIconsFromItems<T extends string, U extends boolean>(
    items: PMRMenuProps<T, U>[]
): PMRMenuProps<React.ElementType, U>[] {
    return items.map(({ icon, ...rest }) => ({
        ...rest,
        icon: icons[icon] as React.ElementType,
    })) as PMRMenuProps<React.ElementType, U>[];
}

export function getLocalizedItems<
    T extends React.ElementType | string,
    U extends boolean
>(
    items: PMRMenuProps<T, U>[] | PMRMenuPropsBrand<U>[],
    locale: string
): PMRMenuProps<T, U>[] | PMRMenuPropsBrand<U>[] {
    return items.map((item) => {
        const url = `/${locale}${item.url}`;
        return { ...item, url };
    }) as PMRMenuProps<T, U>[] | PMRMenuPropsBrand<U>[];
}

export function getBrandIconsFromItems(items: PMRMenuPropsBrand<true>[]) {
    return items.map((item) => {
        const iconComponent = (
            <PMRBrandIcon name={item.name} mode={item.mode} size={item.size} />
        );
        return { ...item, icon: () => iconComponent };
    });
}
