"use client";

import { PMRSidebarMenuController } from "@/lib/controllers/PMRSidebarMenuController";
import type { ReactNode } from "react";
import { createContext, useContext } from "react";
import { JSONProps } from "../constants";
import { useLocale } from "./PMRLocaleContext";

type SidebarContextType = {
    sidebarItems: JSONProps[];
    footerLinks: JSONProps[];
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function useSidebar() {
    const context = useContext(SidebarContext);
    if (!context)
        throw new Error("useSidebar must be used within SidebarProvider");
    return context;
}

import { useEffect, useState } from "react";

export function SidebarProviderClient({ children }: { children: ReactNode }) {
    const { locale } = useLocale();
    const [sidebarItems, setSidebarItems] = useState<JSONProps[]>([]);
    const [footerLinks, setFooterLinks] = useState<JSONProps[]>([]);

    useEffect(() => {
        async function fetchItems() {
            const sidebar = await new PMRSidebarMenuController(
                locale
            ).loadItems();
            setSidebarItems(sidebar);
            const footer = await new PMRSidebarMenuController(
                locale
            ).loadBrandItems();
            setFooterLinks(footer);
        }
        fetchItems();
    }, [locale]);

    return (
        <SidebarContext.Provider value={{ sidebarItems, footerLinks }}>
            {children}
        </SidebarContext.Provider>
    );
}
