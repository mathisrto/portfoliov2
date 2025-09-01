import {
    BookOpenIcon,
    BriefcaseBusinessIcon,
    CalendarIcon,
    UserIcon,
    ZapIcon,
} from "lucide-react";

export type PMRSidebarMenuProps = {
    id: number;
    title: string;
    url: string;
    icon: React.ElementType;
};

export const icons: { [key: string]: React.ElementType } = {
    user: UserIcon,
    zap: ZapIcon,
    calendar: CalendarIcon,
    bookopen: BookOpenIcon,
    briefcasebusiness: BriefcaseBusinessIcon,
};

export const locales = ["fr", "en"];
