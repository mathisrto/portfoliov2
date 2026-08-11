"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

const PMRSwitchTheme: React.FC = () => {
    const { theme, setTheme } = useTheme();
    const t = useTranslations("PMRSwitchTheme");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleChange = (value: string) => {
        setTheme(value);
        localStorage.setItem("theme", value);
    };

    return (
        <Select value={mounted ? theme : undefined} onValueChange={handleChange}>
            <SelectTrigger className="w-[200px]">
                <SelectValue placeholder={t("select_theme")} />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="system">
                    <Monitor className="mr-2" />
                    {t("system")}
                </SelectItem>
                <SelectItem value="light">
                    <Sun className="mr-2" />
                    {t("light")}
                </SelectItem>
                <SelectItem value="dark">
                    <Moon className="mr-2" />
                    {t("dark")}
                </SelectItem>
            </SelectContent>
        </Select>
    );
};

export default PMRSwitchTheme;
