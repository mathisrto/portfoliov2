"use client";

import type { ReactNode } from "react";
import { createContext, useContext } from "react";
import { JSONProps } from "../constants";
import { PMRExperiencesController } from "../controllers/PMRExperienceController";
import { useLocale } from "./PMRLocaleContext";

type ExperienceContextType = {
    experiences: JSONProps[];
};

const ExperiencesContext = createContext<ExperienceContextType | undefined>(
    undefined
);

export function useExperiences() {
    const context = useContext(ExperiencesContext);
    if (!context)
        throw new Error(
            "useExperiences must be used within ExperiencesProvider"
        );
    return context;
}

import { useEffect, useState } from "react";

export function ExperiencesProviderClient({
    children,
}: {
    children: ReactNode;
}) {
    const { locale } = useLocale();
    const [experiences, setExperiences] = useState<JSONProps[]>([]);

    useEffect(() => {
        async function fetchItems() {
            const experiences = await new PMRExperiencesController(
                locale
            ).loadExperiences();
            setExperiences(experiences);
        }
        fetchItems();
    }, [locale]);

    return (
        <ExperiencesContext.Provider value={{ experiences }}>
            {children}
        </ExperiencesContext.Provider>
    );
}
