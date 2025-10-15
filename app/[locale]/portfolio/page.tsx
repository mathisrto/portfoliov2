"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { usePortfolio } from "@/lib/contexts/PMRPortfolio";
import { loadImage } from "@/lib/utils";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function PortfolioPage() {
    const t = useTranslations("PMRPortfolio");
    const { projects } = usePortfolio();

    // Tu peux remplacer ces valeurs par des données dynamiques si besoin
    const firstName = "Mathis";
    const lastName = "Ratron";

    return (
        <div className="flex flex-col items-center gap-6 p-6">
            <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold text-center"
            >
                {t("title")} — {firstName} {lastName}
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-muted-foreground max-w-2xl"
            >
                {t("description")}
            </motion.p>

            {projects.map((project) => (
                <Card
                    key={project.id}
                    className="w-full max-w-4xl shadow-lg rounded-2xl p-4"
                >
                    <CardContent>
                        <h2 className="text-2xl font-semibold mb-2">
                            {t(`${project.id}.projectName`)}
                        </h2>
                        <p className="text-sm text-muted-foreground mb-4">
                            {t(`${project.id}.description`)}
                        </p>

                        {t.raw(`${project.id}.images`) &&
                        t.raw(`${project.id}.images`).length > 0 ? (
                            <Carousel className="w-full">
                                <CarouselContent>
                                    {t
                                        .raw(`${project.id}.images`)
                                        .map(
                                            (
                                                imageName: string,
                                                index: number
                                            ) => (
                                                <CarouselItem
                                                    key={index}
                                                    className="flex justify-center"
                                                >
                                                    <div className="w-full max-h-[400px] flex justify-center items-center">
                                                        {loadImage(
                                                            project.id,
                                                            imageName,
                                                            `${t(
                                                                `${project.id}.projectName`
                                                            )} - Image ${
                                                                index + 1
                                                            }`
                                                        )}
                                                    </div>
                                                </CarouselItem>
                                            )
                                        )}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                        ) : (
                            <p className="text-sm text-gray-500 italic">
                                Aucune image disponible pour ce projet.
                            </p>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
