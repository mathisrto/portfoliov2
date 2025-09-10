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
    color?: string;
};

export const icons: { [key: string]: React.ElementType } = {
    user: UserIcon,
    zap: ZapIcon,
    calendar: CalendarIcon,
    bookopen: BookOpenIcon,
    briefcasebusiness: BriefcaseBusinessIcon,
};

export const locales = ["fr", "en"];

export type PMRThemeProps = {
    light: string;
    dark: string;
};

export type PMRBrandIconProps = {
    name: string;
    size?: number;
    mode: PMRThemeProps;
};

// Import de tous les fichiers SVG des marques
import GithubDarkIcon from "@/data/icons/github-dark.svg";
import GithubLightIcon from "@/data/icons/github-light.svg";
import InstagramIcon from "@/data/icons/instagram.svg";
import LinkedinIcon from "@/data/icons/linkedin.svg";

export const brandIcons = {
    instagram: InstagramIcon,
    githubLight: GithubDarkIcon,
    githubDark: GithubLightIcon,
    linkedin: LinkedinIcon,
};
