/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { icons } from "./constants";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getIconsFromItems(items: any[]) {
    const newItems = items.map((item) => {
        const icon = icons[item.icon];
        return { ...item, icon };
    });
    return newItems;
}

export function getLocalizedItems(items: any[], locale: string) {
    return items.map((item) => {
        const url = `/${locale}${item.url}`;
        return { ...item, url };
    });
}
