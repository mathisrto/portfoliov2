import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";
import { brandIcons, PMRBrandIconProps } from "../constants";

const PMRBrandIcon = ({ name, mode, size = 24 }: PMRBrandIconProps) => {
    const { theme } = useTheme();
    const [url, setUrl] = useState<string>("");

    const updateIconUrl = (currentTheme: string | undefined) => {
        let resolvedTheme = currentTheme;

        if (currentTheme === "system") {
            const mq = window.matchMedia("(prefers-color-scheme: dark)");
            resolvedTheme = mq.matches ? "dark" : "light";
        }

        const themeKey = resolvedTheme === "dark" ? "dark" : "light";
        const logo = mode?.[themeKey];
        const iconUrl = brandIcons[logo as keyof typeof brandIcons];

        setUrl(iconUrl);
    };

    useEffect(() => {
        updateIconUrl(theme);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [theme, mode]);

    if (!url) return null;

    return <Image src={url} alt={name} width={size} height={size} />;
};

export default PMRBrandIcon;
