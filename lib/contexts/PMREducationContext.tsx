"use client";

import type { ReactNode } from "react";
import { createContext, useContext } from "react";
import { JSONProps } from "../constants";
import { PMREducationController } from "../controllers/PMREducationController";
import { useLocale } from "./PMRLocaleContext";

type EducationContextType = {
    educations: JSONProps[];
};

const EducationsContext = createContext<EducationContextType | undefined>(
    undefined
);

export function useEducations() {
    const context = useContext(EducationsContext);
    if (!context)
        throw new Error("useEducations must be used within EducationsProvider");
    return context;
}

import { useEffect, useState } from "react";

export function EducationsProviderClient({
    children,
}: {
    children: ReactNode;
}) {
    const { locale } = useLocale();
    const [educations, setEducations] = useState<JSONProps[]>([]);

    useEffect(() => {
        async function fetchItems() {
            const educations = await new PMREducationController(
                locale
            ).loadEducations();
            setEducations(educations);
        }
        fetchItems();
    }, [locale]);

    return (
        <EducationsContext.Provider value={{ educations }}>
            {children}
        </EducationsContext.Provider>
    );
}
