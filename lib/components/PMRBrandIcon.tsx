"use client";

import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { brandIcons, JSONBrandIconProps, JSONProps } from "../constants";

type PMRBrandIconProps = JSONProps & {
    size?: number;
};

const PMRBrandIcon = ({ id, icon, size = 32 }: PMRBrandIconProps) => {
    const { theme } = useTheme();
    const [url, setUrl] = useState<string>("");
    const t = useTranslations("PMRIcons");

    const updateIconUrl = useCallback(
        (currentTheme: string | undefined) => {
            if (!icon || !icon.isBrand) {
                console.error(
                    `PMRBrandIcon: l'icon de l'item "${id}" n'est pas une icône de marque (isBrand: true).`
                );
                return;
            }

            let resolvedTheme = currentTheme;
            if (currentTheme === "system") {
                const mq = window.matchMedia("(prefers-color-scheme: dark)");
                resolvedTheme = mq.matches ? "dark" : "light";
            }

            const themeKey = resolvedTheme === "dark" ? "dark" : "light";
            const iconName = (icon as JSONBrandIconProps)[themeKey];
            const iconUrl = brandIcons[iconName as keyof typeof brandIcons];

            setUrl(iconUrl);
        },
        [icon, id]
    );

    useEffect(() => {
        updateIconUrl(theme);
    }, [theme, updateIconUrl]);

    if (!url) return null;

    return <Image src={url} alt={t(id)} width={size} height={size} />;
};

export default PMRBrandIcon;
