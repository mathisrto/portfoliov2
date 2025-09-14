import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import me from "@/data/images/me.webp";
import PMRTypewriter from "@/lib/components/PMRTypeWriter";
import { HomeIcon, MailIcon, PhoneIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Home() {
    const t = useTranslations("About");

    const words = [t("developer"), t("student")];

    return (
        <div className="flex justify-center items-center bg-background flex-1 text-foreground overflow-hidden">
            <div className="relative w-full max-w-6xl mx-auto h-full grid grid-cols-1 lg:grid-cols-2 items-center gap-8 px-4 py-12">
                {/* Infos à gauche */}
                <div className="flex flex-col gap-4 w-full justify-center items-start z-10">
                    <h1 className="text-primary text-5xl font-bold mb-4">
                        {t("hello")}
                        <span className="text-secondary">{t("name")}</span>
                    </h1>
                    <h2 className="text-primary text-3xl mb-6 font-semibold">
                        {t("description")}
                        <span className="text-secondary">
                            <PMRTypewriter words={words} />
                        </span>
                    </h2>
                    <p className="mb-4 text-base lg:text-lg">{t("about_me")}</p>
                    <Popover>
                        <PopoverTrigger className="px-4 py-2 rounded-md bg-secondary text-primary font-medium shadow hover:bg-tertiary hover:cursor-pointer transition">
                            {t("about_me_btn")}
                        </PopoverTrigger>
                        <PopoverContent className="bg-background p-4 rounded-md shadow-lg text-primary">
                            <div>
                                <p className="font-semibold mb-3">
                                    {t("contact")}
                                </p>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 text-base">
                                        <PhoneIcon className="h-5 w-5 text-secondary" />
                                        <span className="font-medium">
                                            07 83 62 86 27
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-base">
                                        <HomeIcon className="h-5 w-5 text-secondary" />
                                        <span className="font-medium">
                                            13280 Arles
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-base">
                                        <MailIcon className="h-5 w-5 text-secondary" />
                                        <span className="font-medium">
                                            ratronmathis@gmail.com
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
                {/* Image à droite, masquée sur mobile */}
                <div className="hidden lg:flex items-center justify-center w-full h-full z-5">
                    <Image
                        src={me}
                        alt="Photo Mathis Ratron"
                        className="rounded-2xl shadow-lg object-cover w-3/4 h-auto"
                        priority
                    />
                </div>
            </div>
        </div>
    );
}
