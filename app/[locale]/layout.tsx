import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import PMRSidebarMenu from "@/lib/components/PMRSideMenu";
import { PMRSidebarMenuController } from "@/lib/controllers/PMRSidebarMenuController";

export default async function Layout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    const { locale } = await params;
    const PMRSidebarMenuItems = await new PMRSidebarMenuController(
        locale
    ).loadItems();

    return (
        <SidebarProvider>
            <PMRSidebarMenu items={PMRSidebarMenuItems} />
            <main>
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    );
}
