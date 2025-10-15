import {
    BookOpenIcon,
    BriefcaseBusinessIcon,
    CalendarIcon,
    UserIcon,
    ZapIcon,
} from "lucide-react";

export const locales = ["fr", "en"];

export type JSONProps = {
    id: string;
    icon?: JSONIconProps | JSONBrandIconProps;
    category?: string;
    url?: string;
};

export type JSONIconProps = {
    isBrand: boolean;
    icon: string;
    size?: number;
    elm: React.ElementType;
};

export type JSONBrandIconProps = {
    isBrand: true;
    light: string;
    dark: string;
    size?: number;
    title?: string;
    elm: React.ElementType;
};

export const icons: { [key: string]: React.ElementType } = {
    user: UserIcon,
    zap: ZapIcon,
    calendar: CalendarIcon,
    bookopen: BookOpenIcon,
    briefcasebusiness: BriefcaseBusinessIcon,
};

// Import de tous les fichiers SVG des marques
import CPAMIcon from "@/data/icons/cpam.svg";
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
import IUTIcon from "@/data/icons/iut.png";
import JavaIcon from "@/data/icons/java.svg";
import JavascriptIcon from "@/data/icons/javascript.svg";
import JiraIcon from "@/data/icons/jira.svg";
import LaravelIcon from "@/data/icons/laravel.svg";
import LinkedinIcon from "@/data/icons/linkedin.svg";
import LinuxIcon from "@/data/icons/linux.svg";
import McDonaldIcon from "@/data/icons/mcdonald.svg";
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
import SaintCharlesIcon from "@/data/icons/stcharles.jpeg";
import TailwindCSSIcon from "@/data/icons/tailwindcss.svg";
import TrelloIcon from "@/data/icons/trello.svg";
import TypescriptIcon from "@/data/icons/typescript.svg";
import VercelIcon from "@/data/icons/vercel.svg";
import WeekeraIcon from "@/data/icons/weekera.jpeg";

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
    mcdonald: McDonaldIcon,
    cpam: CPAMIcon,
    weekera: WeekeraIcon,
    college: SaintCharlesIcon,
    lycee: SaintCharlesIcon,
    university: IUTIcon,
};

// Import statique des images connues
import geoguide1 from "@/data/images/geoguide/geoguide1.png";
import geoguide2 from "@/data/images/geoguide/geoguide2.png";
import geoguide3 from "@/data/images/geoguide/geoguide3.png";
import geoguide4 from "@/data/images/geoguide/geoguide4.png";

import planifEasy1 from "@/data/images/planifEasy/planifEasy1.png";
import planifEasy2 from "@/data/images/planifEasy/planifEasy2.png";
import planifEasy3 from "@/data/images/planifEasy/planifEasy3.png";
import planifEasy4 from "@/data/images/planifEasy/planifEasy4.png";

import station1 from "@/data/images/station/station1.png";
import station2 from "@/data/images/station/station2.png";
import station3 from "@/data/images/station/station3.png";

import studentManagement1 from "@/data/images/studentManagement/studentManagement1.png";
import studentManagement2 from "@/data/images/studentManagement/studentManagement2.png";
import studentManagement3 from "@/data/images/studentManagement/studentManagement3.png";

import websiteSAE1 from "@/data/images/websiteSAE/websiteSAE1.png";
import websiteSAE2 from "@/data/images/websiteSAE/websiteSAE2.png";
import websiteSAE3 from "@/data/images/websiteSAE/websiteSAE3.png";
import websiteSAE4 from "@/data/images/websiteSAE/websiteSAE4.png";
import websiteSAE5 from "@/data/images/websiteSAE/websiteSAE5.png";

import horaris1 from "@/data/images/horaris/horaris1.png";
import horaris2 from "@/data/images/horaris/horaris2.png";
import horaris3 from "@/data/images/horaris/horaris3.png";
import horaris4 from "@/data/images/horaris/horaris4.png";
import horaris5 from "@/data/images/horaris/horaris5.png";

import memoryGame1 from "@/data/images/memoryGame/memoryGame1.png";
import memoryGame2 from "@/data/images/memoryGame/memoryGame2.png";
import memoryGame3 from "@/data/images/memoryGame/memoryGame3.png";

import { StaticImageData } from "next/image";

export const imageMap: Record<string, Record<string, StaticImageData>> = {
    geoguide: {
        geoguide1,
        geoguide2,
        geoguide3,
        geoguide4,
    },
    planifEasy: {
        planifEasy1,
        planifEasy2,
        planifEasy3,
        planifEasy4,
    },
    station: {
        station1,
        station2,
        station3,
    },
    studentManagement: {
        studentManagement1,
        studentManagement2,
        studentManagement3,
    },
    websiteSAE: {
        websiteSAE1,
        websiteSAE2,
        websiteSAE3,
        websiteSAE4,
        websiteSAE5,
    },
    horaris: {
        horaris1,
        horaris2,
        horaris3,
        horaris4,
        horaris5,
    },
    memoryGame: {
        memoryGame1,
        memoryGame2,
        memoryGame3,
    },
};
