"use client";

import {
    Sidebar,
    SidebarContent,
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
import { PMRSidebarMenuProps } from "../constants";
import { useSidebar } from "../contexts/PMRSidebarContext";
import PMRSelectLanguage from "./PMRSelectLanguage";
import PMRSwitchTheme from "./PMRSwitchTheme";

export default function PMRSidebarMenu() {
    const { sidebarItems } = useSidebar();
    const t = useTranslations("PMRSidebarMenu");

    return (
        <Sidebar>
            <SidebarHeader>
                <div className="flex flex-col justify-center items-center space-y-2">
                    <Image
                        src={me}
                        alt="Photo de Mathis Ratron"
                        className="w-3/4 h-auto rounded-full border-primary border-2"
                        priority
                    />
                    <h1 className="font-bold">{t("title")}</h1>
                </div>
                <SidebarGroup>
                    <SidebarGroupLabel>{t("settings")}</SidebarGroupLabel>
                    <SidebarGroupContent className="space-y-2">
                        <PMRSwitchTheme />
                        <PMRSelectLanguage />
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>{t("section")}</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {sidebarItems.map((item: PMRSidebarMenuProps) => (
                                <SidebarMenuItem key={item.id}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{t(item.title)}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
