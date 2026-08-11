"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { createContext, useContext, useState } from "react";

type LocaleContextType = {
    locale: string;
    setLocale: (locale: string) => void;
};

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const useLocale = () => {
    const context = useContext(LocaleContext);
    if (!context)
        throw new Error("useLocale must be used within LocaleProvider");
    return context;
};

export const LocaleProvider: React.FC<{
    initialLocale: string;
    children: React.ReactNode;
}> = ({ initialLocale, children }) => {
    const [contextLocale, setContextLocale] = useState(initialLocale);
    const router = useRouter();
    const pathname = usePathname();

    const setLocale = (newLocale: string) => {
        const oldLocale = contextLocale;
        const pathnameWithoutLocale = pathname.replace(
            new RegExp(`^/${oldLocale}(/|$)`),
            "/"
        );
        const newPath = `/${newLocale}${pathnameWithoutLocale}`;

        setContextLocale(newLocale);
        router.push(newPath);
    };

    return (
        <LocaleContext.Provider value={{ locale: contextLocale, setLocale }}>
            {children}
        </LocaleContext.Provider>
    );
};
