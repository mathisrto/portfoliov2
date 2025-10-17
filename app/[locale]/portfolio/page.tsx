"use client";

import PMRDialogPortfolio from "@/lib/components/PMRDialogPortfolio";
import PMRProjectCard from "@/lib/components/PMRProjectCard";
import { usePortfolio } from "@/lib/contexts/PMRPortfolio";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function PortfolioPage() {
    const t = useTranslations("PMRPortfolio");
    const { projects } = usePortfolio();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogImages, setDialogImages] = useState<string[]>([]);
    const [dialogProjectId, setDialogProjectId] = useState<string>("");

    const handleImageClick = (projectId: string, images: string[]) => {
        setDialogProjectId(projectId);
        setDialogImages(images);
        setDialogOpen(true);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    return (
        <div className="flex relative min-h-screen">
            {/* Contenu principal */}
            <div className="flex-1">
                <div className="flex flex-col items-center gap-12 p-10">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center space-y-4"
                    >
                        <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-tertiary bg-clip-text text-transparent">
                            {t("title")}
                        </h1>
                        <p className="text-muted-foreground max-w-2xl text-lg">
                            {t("description")}
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="w-full max-w-4xl space-y-12"
                    >
                        {projects.map((project) => {
                            return (
                                <PMRProjectCard
                                    key={project.id}
                                    project={project}
                                    onImageClick={handleImageClick}
                                />
                            );
                        })}
                    </motion.div>
                </div>
            </div>

            {/* Dialog plein écran pour les images */}
            <PMRDialogPortfolio
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                images={dialogImages}
                projectId={dialogProjectId}
            />
        </div>
    );
}
