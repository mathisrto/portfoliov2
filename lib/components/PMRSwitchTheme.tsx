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
import React from "react";

const PMRSwitchTheme: React.FC = () => {
    const { theme, setTheme } = useTheme();
    const t = useTranslations("PMRSwitchTheme");

    const handleChange = (value: string) => {
        setTheme(value);
        document.cookie = `theme=${value}; path=/; max-age=31536000`;
    };

    return (
        <Select value={theme} onValueChange={handleChange}>
            <SelectTrigger className="w-[200px]">
                <SelectValue placeholder={t("select_theme")} />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="system">
                    <Monitor className="mr-2 h-5 w-5 text-primary" />
                    {t("system")}
                </SelectItem>
                <SelectItem value="light">
                    <Sun className="mr-2 h-5 w-5 text-primary" />
                    {t("light")}
                </SelectItem>
                <SelectItem value="dark">
                    <Moon className="mr-2 h-5 w-5 text-primary" />
                    {t("dark")}
                </SelectItem>
            </SelectContent>
        </Select>
    );
};

export default PMRSwitchTheme;
