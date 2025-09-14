"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import me from "@/data/images/me.webp";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { PMRMenuProps, PMRMenuPropsBrand } from "../constants";
import { useSidebar } from "../contexts/PMRSidebarContext";
import PMRSelectLanguage from "./PMRSelectLanguage";
import PMRSwitchTheme from "./PMRSwitchTheme";

export default function PMRSidebarMenu() {
    const { sidebarItems, footerLinks } = useSidebar();
    const t = useTranslations("PMRSidebarMenu");

    return (
        <Sidebar>
            <SidebarHeader>
                <div className="flex flex-col justify-center items-center space-y-2">
                    <Image
                        src={me}
                        alt="Photo de Mathis Ratron"
                        className="w-1/2 h-auto rounded-full border-primary border-2 my-4"
                        priority
                    />
                    <h1 className="font-bold text-lg">{t("title")}</h1>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>{t("settings")}</SidebarGroupLabel>
                    <SidebarGroupContent className="space-y-3 py-2">
                        <PMRSwitchTheme />
                        <PMRSelectLanguage />
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>{t("section")}</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {sidebarItems.map(
                                (
                                    item: PMRMenuProps<React.ElementType, true>
                                ) => (
                                    <SidebarMenuItem key={item.id}>
                                        <SidebarMenuButton asChild>
                                            <Link href={item.url}>
                                                <item.icon className="!h-5 !w-5" />
                                                <span className="text-base">
                                                    {t(item.name)}
                                                </span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            )}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <div className="flex justify-center items-center space-x-4">
                    {footerLinks.map((link: PMRMenuPropsBrand<true>) => (
                        <Link
                            key={link.id}
                            href={link.url}
                            className="flex flex-col items-center space-y-1"
                        >
                            <link.icon />
                            <span className="font-bold">{link.name}</span>
                        </Link>
                    ))}
                </div>
                <div className="flex justify-center">
                    <p className="text-xs">{t("copyright")}</p>
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}
