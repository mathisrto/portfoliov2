"use client";

import PMRDialogPortfolio from "@/lib/components/PMRDialogPortfolio";
import PMRProjectCard from "@/lib/components/PMRProjectCard";
import { usePortfolio } from "@/lib/contexts/PMRPortfolio";
import { AnimatePresence, motion } from "framer-motion";
import { Columns3, LayoutGrid } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

type ViewMode = "column" | "grid";

export default function PortfolioPage() {
    const t = useTranslations("PMRPortfolio");
    const { projects } = usePortfolio();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogImages, setDialogImages] = useState<string[]>([]);
    const [dialogProjectId, setDialogProjectId] = useState<string>("");
    const [viewMode, setViewMode] = useState<ViewMode>("column");

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

                        {/* Boutons switch vue - visibles uniquement sur desktop */}
                        <div className="hidden lg:flex items-center justify-center gap-2 pt-2">
                            <motion.button
                                onClick={() => setViewMode("column")}
                                className={`relative p-2.5 rounded-xl transition-colors duration-200 ${
                                    viewMode === "column"
                                        ? "text-primary-foreground"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label="Vue colonne"
                            >
                                {viewMode === "column" && (
                                    <motion.div
                                        layoutId="viewToggleBg"
                                        className="absolute inset-0 bg-gradient-to-r from-secondary to-tertiary rounded-xl"
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 30,
                                        }}
                                    />
                                )}
                                <Columns3
                                    size={20}
                                    className="relative z-10"
                                />
                            </motion.button>
                            <motion.button
                                onClick={() => setViewMode("grid")}
                                className={`relative p-2.5 rounded-xl transition-colors duration-200 ${
                                    viewMode === "grid"
                                        ? "text-primary-foreground"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label="Vue grille"
                            >
                                {viewMode === "grid" && (
                                    <motion.div
                                        layoutId="viewToggleBg"
                                        className="absolute inset-0 bg-gradient-to-r from-secondary to-tertiary rounded-xl"
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 30,
                                        }}
                                    />
                                )}
                                <LayoutGrid
                                    size={20}
                                    className="relative z-10"
                                />
                            </motion.button>
                        </div>
                    </motion.div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={viewMode}
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit={{ opacity: 0, transition: { duration: 0.2 } }}
                            className={
                                viewMode === "grid"
                                    ? "w-full max-w-6xl grid grid-cols-3 gap-6"
                                    : "w-full max-w-4xl space-y-12"
                            }
                        >
                            {projects.map((project) => {
                                return (
                                    <PMRProjectCard
                                        key={project.id}
                                        project={project}
                                        onImageClick={handleImageClick}
                                        compact={viewMode === "grid"}
                                    />
                                );
                            })}
                        </motion.div>
                    </AnimatePresence>
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
