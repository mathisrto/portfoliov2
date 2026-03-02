"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { loadImage } from "@/lib/utils";
import { easeOut, motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { JSONProps } from "../constants";
import { useLocale } from "../contexts/PMRLocaleContext";

interface PMRProjectCardProps {
    project: JSONProps;
    onImageClick: (projectId: string, images: string[]) => void;
    compact?: boolean;
}

export default function PMRProjectCard({
    project,
    onImageClick,
    compact = false,
}: PMRProjectCardProps) {
    const t = useTranslations("PMRPortfolio");
    const { locale } = useLocale();
    const router = useRouter();
    const ref = useRef<HTMLDivElement | null>(null);
    const isInView = useInView(ref, { once: false, amount: 0.3 });

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, easeOut },
        },
    };

    const images = t.raw(`${project.id}.images`) || [];

    if (compact) {
        const firstImage = images.length > 0 ? images[0] : null;
        return (
            <motion.div
                ref={ref}
                id={project.id}
                variants={itemVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="h-full"
            >
                <Card
                    className="shadow-lg rounded-2xl overflow-hidden border-2 border-border hover:border-secondary transition-all duration-300 bg-card h-full cursor-pointer group"
                    onClick={() =>
                        router.push(`/${locale}/portfolio/${project.id}`)
                    }
                >
                    <CardContent className="p-0 flex flex-col h-full">
                        {/* Image de couverture */}
                        <div className="relative w-full h-44 overflow-hidden bg-muted/50">
                            {firstImage ? (
                                <motion.div
                                    className="w-full h-full"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.3 }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onImageClick(project.id, images);
                                    }}
                                >
                                    {loadImage(
                                        project.id,
                                        firstImage,
                                        t(`${project.id}.projectName`)
                                    )}
                                </motion.div>
                            ) : (
                                <div className="flex items-center justify-center h-full">
                                    <p className="text-muted-foreground text-sm italic">
                                        Aucune image
                                    </p>
                                </div>
                            )}
                        </div>
                        {/* Infos */}
                        <div className="p-4 flex flex-col flex-1">
                            <h3 className="text-lg font-bold text-primary line-clamp-1 group-hover:text-secondary transition-colors">
                                {t(`${project.id}.projectName`)}
                            </h3>
                            <p className="text-muted-foreground text-sm mt-1 line-clamp-3 flex-1">
                                {t(`${project.id}.description`)}
                            </p>
                            <div className="mt-3 flex items-center text-secondary text-sm font-medium">
                                {t("more_info_btn")}
                                <motion.span
                                    animate={{ x: [0, 4, 0] }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 1.5,
                                    }}
                                    className="ml-1"
                                >
                                    →
                                </motion.span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        );
    }

    return (
        <motion.div
            ref={ref}
            id={project.id}
            variants={itemVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            <Card className="shadow-xl rounded-3xl overflow-hidden border-2 border-border hover:border-secondary transition-all duration-300 bg-card">
                <CardContent className="p-8">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-4"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-8 bg-gradient-to-b from-secondary to-tertiary rounded-full" />
                            <h2 className="text-3xl font-bold text-primary">
                                {t(`${project.id}.projectName`)}
                            </h2>
                        </div>
                        <p className="text-muted-foreground leading-relaxed pl-5">
                            {t(`${project.id}.description`)}
                        </p>
                    </motion.div>

                    {images.length > 0 ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="mt-8 space-y-6"
                        >
                            <div className="relative rounded-2xl overflow-hidden">
                                <Carousel>
                                    <CarouselContent>
                                        {images.map(
                                            (
                                                imageName: string,
                                                imgIndex: number
                                            ) => (
                                                <CarouselItem
                                                    key={imgIndex}
                                                    className="flex justify-center"
                                                >
                                                    <motion.div
                                                        whileHover={{
                                                            scale: 1.02,
                                                        }}
                                                        transition={{
                                                            duration: 0.3,
                                                        }}
                                                        className="w-full h-[30vh] lg:h-[50vh] flex justify-center items-center cursor-zoom-in rounded-xl overflow-hidden bg-muted/50"
                                                        onClick={() =>
                                                            onImageClick(
                                                                project.id,
                                                                images
                                                            )
                                                        }
                                                    >
                                                        {loadImage(
                                                            project.id,
                                                            imageName,
                                                            `${t(
                                                                `${project.id}.projectName`
                                                            )} - Image ${
                                                                imgIndex + 1
                                                            }`
                                                        )}
                                                    </motion.div>
                                                </CarouselItem>
                                            )
                                        )}
                                    </CarouselContent>
                                    <CarouselPrevious
                                        className="left-4"
                                        variant={"secondary"}
                                    />
                                    <CarouselNext
                                        className="right-4"
                                        variant={"secondary"}
                                    />
                                </Carousel>
                            </div>

                            <div className="flex justify-center">
                                <motion.button
                                    className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-secondary to-tertiary text-primary-foreground font-semibold shadow-lg overflow-hidden"
                                    whileHover={{
                                        scale: 1.05,
                                        boxShadow:
                                            "0 20px 40px rgba(0,0,0,0.15)",
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() =>
                                        router.push(
                                            `/${locale}/portfolio/${project.id}`
                                        )
                                    }
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        {t("more_info_btn")}
                                        <motion.span
                                            animate={{ x: [0, 5, 0] }}
                                            transition={{
                                                repeat: Infinity,
                                                duration: 1.5,
                                            }}
                                        >
                                            →
                                        </motion.span>
                                    </span>
                                    <motion.div
                                        className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-20"
                                        transition={{ duration: 0.3 }}
                                    />
                                </motion.button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="mt-8 space-y-6"
                        >
                            <div className="flex justify-center items-center h-40 bg-muted/50 rounded-2xl">
                                <p className="text-muted-foreground italic">
                                    Aucune image disponible pour ce projet.
                                </p>
                            </div>
                            <div className="flex justify-center">
                                <motion.button
                                    className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-secondary to-tertiary text-primary-foreground font-semibold shadow-lg overflow-hidden"
                                    whileHover={{
                                        scale: 1.05,
                                        boxShadow:
                                            "0 20px 40px rgba(0,0,0,0.15)",
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() =>
                                        router.push(
                                            `/${locale}/portfolio/${project.id}`
                                        )
                                    }
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        {t("more_info_btn")}
                                        <motion.span
                                            animate={{ x: [0, 5, 0] }}
                                            transition={{
                                                repeat: Infinity,
                                                duration: 1.5,
                                            }}
                                        >
                                            →
                                        </motion.span>
                                    </span>
                                    <motion.div
                                        className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-20"
                                        transition={{ duration: 0.3 }}
                                    />
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
}
