import {
    BookOpenIcon,
    BriefcaseBusinessIcon,
    CalendarIcon,
    UserIcon,
    ZapIcon,
} from "lucide-react";

export const locales = ["fr", "en"];

export type PMRMenuProps<IconType, UrlRequired extends boolean = false> = {
    id: number;
    name: string;
    icon: IconType;
} & (UrlRequired extends true ? { url: string } : { url?: string });

export type PMRMenuPropsBrand<UrlRequired extends boolean = false> = {
    id: number;
    name: string;
    mode: PMRThemeProps;
    size: number;
    icon: React.ElementType;
} & (UrlRequired extends true ? { url: string } : { url?: string });

export type PMRThemeProps = {
    light: string;
    dark: string;
};

export const icons: { [key: string]: React.ElementType } = {
    user: UserIcon,
    zap: ZapIcon,
    calendar: CalendarIcon,
    bookopen: BookOpenIcon,
    briefcasebusiness: BriefcaseBusinessIcon,
};

// Import de tous les fichiers SVG des marques
import CPPIcon from "@/data/icons/cpp.svg";
import CSSIcon from "@/data/icons/css.svg";
import DockerIcon from "@/data/icons/docker.svg";
import ElectronIcon from "@/data/icons/electron.svg";
import FigmaIcon from "@/data/icons/figma.svg";
import GitIcon from "@/data/icons/git.svg";
import GithubDarkIcon from "@/data/icons/github-dark.svg";
import GithubLightIcon from "@/data/icons/github-light.svg";
import HTMLIcon from "@/data/icons/html.svg";
import InstagramIcon from "@/data/icons/instagram.svg";
import JavaIcon from "@/data/icons/java.svg";
import JavascriptIcon from "@/data/icons/javascript.svg";
import JiraIcon from "@/data/icons/jira.svg";
import LaravelIcon from "@/data/icons/laravel.svg";
import LinkedinIcon from "@/data/icons/linkedin.svg";
import LinuxIcon from "@/data/icons/linux.svg";
import MongoDBIcon from "@/data/icons/mongodb.svg";
import MySQLIcon from "@/data/icons/mysql.svg";
import NextJSIcon from "@/data/icons/nextjs.svg";
import NodeJSIcon from "@/data/icons/nodejs.svg";
import PHPIcon from "@/data/icons/php.svg";
import PostgreSQLIcon from "@/data/icons/postgresql.svg";
import PythonIcon from "@/data/icons/python.svg";
import QtIcon from "@/data/icons/qt.svg";
import ReactIcon from "@/data/icons/react.svg";
import SQLiteIcon from "@/data/icons/sqlite.svg";
import TailwindCSSIcon from "@/data/icons/tailwindcss.svg";
import TrelloIcon from "@/data/icons/trello.svg";
import TypescriptIcon from "@/data/icons/typescript.svg";
import VercelIcon from "@/data/icons/vercel.svg";

export const brandIcons = {
    instagram: InstagramIcon,
    githubLight: GithubDarkIcon,
    githubDark: GithubLightIcon,
    linkedin: LinkedinIcon,
    javascript: JavascriptIcon,
    typescript: TypescriptIcon,
    python: PythonIcon,
    java: JavaIcon,
    cpp: CPPIcon,
    html: HTMLIcon,
    css: CSSIcon,
    php: PHPIcon,
    react: ReactIcon,
    nextjs: NextJSIcon,
    nodejs: NodeJSIcon,
    tailwindcss: TailwindCSSIcon,
    electron: ElectronIcon,
    qt: QtIcon,
    laravel: LaravelIcon,
    mysql: MySQLIcon,
    postgresql: PostgreSQLIcon,
    sqlite: SQLiteIcon,
    mongodb: MongoDBIcon,
    git: GitIcon,
    docker: DockerIcon,
    linux: LinuxIcon,
    vercel: VercelIcon,
    trello: TrelloIcon,
    jira: JiraIcon,
    figma: FigmaIcon,
};
