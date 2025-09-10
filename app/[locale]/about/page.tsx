import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import me from "@/data/images/me.webp";
import PMRTypewriter from "@/lib/components/PMRTypeWriter";
import Image from "next/image";

export default function Home() {
    // const t = useTranslations("Home");

    const words = [
        "développeur full stack",
        "étudiant en informatique",
        "passionné de technologie",
    ];

    return (
        <div className="flex justify-center items-center bg-background flex-1 text-foreground overflow-hidden">
            <div className="relative w-full max-w-6xl mx-auto h-full grid grid-cols-1 lg:grid-cols-2 items-center gap-8 px-4 py-12">
                {/* Infos à gauche */}
                <div className="flex flex-col gap-4 w-full justify-center items-start z-10">
                    <h1 className="text-primary text-5xl font-bold mb-4">
                        Bonjour, je m&apos;appelle{" "}
                        <span className="text-secondary">Mathis Ratron</span>
                    </h1>
                    <h2 className="text-primary text-3xl mb-6 font-semibold">
                        Je suis un{" "}
                        <span className="text-secondary">
                            <PMRTypewriter words={words} />
                        </span>
                    </h2>
                    <p className="mb-4 text-base lg:text-lg">
                        Je poursuis actuellement ma 3ème année de BUT
                        Informatique à Arles. Passionné par les jeux vidéo, la
                        programmation et le sport, je pratique la boxe et la
                        musculation. Je possède le permis B, le BIA (Brevet
                        d&apos;Initiation Aéronautique) ainsi que la
                        certification PIX.
                    </p>
                    <Popover>
                        <PopoverTrigger className="px-4 py-2 rounded-md bg-secondary text-white font-medium shadow hover:bg-primary transition">
                            A propos de moi
                        </PopoverTrigger>
                        <PopoverContent className="bg-white dark:bg-slate-900 p-4 rounded-md shadow-lg text-black dark:text-white">
                            Place content for the popover here.
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
