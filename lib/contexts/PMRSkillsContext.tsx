"use client";

import type { ReactNode } from "react";
import { createContext, useContext } from "react";
import { JSONProps } from "../constants";
import { useLocale } from "./PMRLocaleContext";

type SkillsContextType = {
    skills: JSONProps[];
    skillsTools: JSONProps[];
};

const SkillsContext = createContext<SkillsContextType | undefined>(undefined);

export function useSkills() {
    const context = useContext(SkillsContext);
    if (!context)
        throw new Error("useSkills must be used within SkillsProvider");
    return context;
}

import { useEffect, useState } from "react";
import { PMRSkillsController } from "../controllers/PMRSkillsController";

export function SkillsProviderClient({ children }: { children: ReactNode }) {
    const { locale } = useLocale();
    const [skills, setSkills] = useState<JSONProps[]>([]);
    const [skillsTools, setSkillsTools] = useState<JSONProps[]>([]);

    useEffect(() => {
        async function fetchItems() {
            const skills = await new PMRSkillsController(locale).loadSkills();
            setSkills(skills);
            const skillsTools = await new PMRSkillsController(
                locale
            ).loadSkillsTools();
            setSkillsTools(skillsTools);
        }
        fetchItems();
    }, [locale]);

    return (
        <SkillsContext.Provider value={{ skills, skillsTools }}>
            {children}
        </SkillsContext.Provider>
    );
}
