"use client";

import type { ReactNode } from "react";
import { createContext, useContext } from "react";
import { JSONProps } from "../constants";
import { useLocale } from "./PMRLocaleContext";

type PortfolioContextType = {
    projects: JSONProps[];
};

const PortfolioContext = createContext<PortfolioContextType | undefined>(
    undefined
);

export function usePortfolio() {
    const context = useContext(PortfolioContext);
    if (!context)
        throw new Error("usePortfolio must be used within PortfolioProvider");
    return context;
}

import { useEffect, useState } from "react";
import { PMRPortfolioController } from "../controllers/PMRPortfolioController";

export function PortfolioProviderClient({ children }: { children: ReactNode }) {
    const { locale } = useLocale();
    const [projects, setProjects] = useState<JSONProps[]>([]);

    useEffect(() => {
        async function fetchItems() {
            const projects = await new PMRPortfolioController(
                locale
            ).loadProjects();
            setProjects(projects);
        }
        fetchItems();
    }, [locale]);

    return (
        <PortfolioContext.Provider value={{ projects }}>
            {children}
        </PortfolioContext.Provider>
    );
}
