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
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { JSONBrandIconProps, JSONProps } from "../constants";
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
                        src={"/images/mathis-ratron.webp"}
                        width={1024}
                        height={1024}
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
                            {sidebarItems.map((item: JSONProps) =>
                                item.url && item.icon ? (
                                    <SidebarMenuItem key={item.id}>
                                        <SidebarMenuButton asChild>
                                            <Link href={item.url}>
                                                <item.icon.elm className="!h-5 !w-5" />
                                                <span className="text-base">
                                                    {t(item.id)}
                                                </span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ) : null
                            )}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <div className="flex justify-center items-center space-x-4">
                    {footerLinks.map((link: JSONProps) =>
                        link.url && link.icon ? (
                            <Link
                                key={link.id}
                                href={link.url}
                                className="flex flex-col items-center space-y-1"
                            >
                                <link.icon.elm className="!h-5 !w-5" />
                                <span className="font-bold">
                                    {(link.icon as JSONBrandIconProps).title}
                                </span>
                            </Link>
                        ) : null
                    )}
                </div>
                <div className="flex justify-center">
                    <p className="text-xs">{t("copyright")}</p>
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}
