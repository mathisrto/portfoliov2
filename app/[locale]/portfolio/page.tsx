"use client";

import PMRDialogPortfolio from "@/lib/components/PMRDialogPortfolio";
import PMRProjectCard from "@/lib/components/PMRProjectCard";
import { usePortfolio } from "@/lib/contexts/PMRPortfolio";
import { AnimatePresence, motion } from "framer-motion";
import {
    Columns3,
    Filter,
    LayoutGrid,
    Users,
    User,
    X,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";

type ViewMode = "column" | "grid";
type ProjectTypeFilter = "all" | "individual" | "team";

export default function PortfolioPage() {
    const t = useTranslations("PMRPortfolio");
    const { projects } = usePortfolio();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogImages, setDialogImages] = useState<string[]>([]);
    const [dialogProjectId, setDialogProjectId] = useState<string>("");
    const [viewMode, setViewMode] = useState<ViewMode>("column");
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
    const [projectTypeFilter, setProjectTypeFilter] =
        useState<ProjectTypeFilter>("all");
    const [showFilters, setShowFilters] = useState(false);

    // Repasser en mode colonne si on passe sous le breakpoint lg (1024px)
    useEffect(() => {
        const mql = window.matchMedia("(max-width: 1023px)");
        const onChange = () => {
            if (mql.matches) setViewMode("column");
        };
        mql.addEventListener("change", onChange);
        if (mql.matches) setViewMode("column");
        return () => mql.removeEventListener("change", onChange);
    }, []);

    const handleImageClick = (projectId: string, images: string[]) => {
        setDialogProjectId(projectId);
        setDialogImages(images);
        setDialogOpen(true);
    };

    // Extraire tous les langages uniques depuis les traductions
    const allLanguages = useMemo(() => {
        const langs = new Set<string>();
        projects.forEach((project) => {
            const projectLangs: string[] =
                t.raw(`${project.id}.languages`) || [];
            projectLangs.forEach((lang) => langs.add(lang));
        });
        return Array.from(langs).sort();
    }, [projects, t]);

    // Filtrer les projets
    const filteredProjects = useMemo(() => {
        return projects.filter((project) => {
            // Filtre par langages
            if (selectedLanguages.length > 0) {
                const projectLangs: string[] =
                    t.raw(`${project.id}.languages`) || [];
                const hasMatchingLang = selectedLanguages.some((lang) =>
                    projectLangs.includes(lang)
                );
                if (!hasMatchingLang) return false;
            }

            // Filtre par type de projet
            if (projectTypeFilter !== "all") {
                const isIndividual: boolean = t.raw(
                    `${project.id}.isIndividual`
                );
                if (projectTypeFilter === "individual" && !isIndividual)
                    return false;
                if (projectTypeFilter === "team" && isIndividual) return false;
            }

            return true;
        });
    }, [projects, selectedLanguages, projectTypeFilter, t]);

    const toggleLanguage = (lang: string) => {
        setSelectedLanguages((prev) =>
            prev.includes(lang)
                ? prev.filter((l) => l !== lang)
                : [...prev, lang]
        );
    };

    const clearFilters = () => {
        setSelectedLanguages([]);
        setProjectTypeFilter("all");
    };

    const hasActiveFilters =
        selectedLanguages.length > 0 || projectTypeFilter !== "all";

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

                        {/* Boutons switch vue + filtre */}
                        <div className="flex items-center justify-center gap-2 pt-2">
                            {/* Toggle vue - desktop only */}
                            <div className="hidden lg:flex items-center gap-1 bg-muted/50 rounded-xl p-1">
                                <motion.button
                                    onClick={() => setViewMode("column")}
                                    className={`relative p-2 rounded-lg transition-colors duration-200 ${
                                        viewMode === "column"
                                            ? "text-primary-foreground"
                                            : "text-muted-foreground hover:text-foreground"
                                    }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    aria-label={t("viewColumn")}
                                >
                                    {viewMode === "column" && (
                                        <motion.div
                                            layoutId="viewToggleBg"
                                            className="absolute inset-0 bg-gradient-to-r from-secondary to-tertiary rounded-lg"
                                            transition={{
                                                type: "spring",
                                                stiffness: 400,
                                                damping: 30,
                                            }}
                                        />
                                    )}
                                    <Columns3
                                        size={18}
                                        className="relative z-10"
                                    />
                                </motion.button>
                                <motion.button
                                    onClick={() => setViewMode("grid")}
                                    className={`relative p-2 rounded-lg transition-colors duration-200 ${
                                        viewMode === "grid"
                                            ? "text-primary-foreground"
                                            : "text-muted-foreground hover:text-foreground"
                                    }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    aria-label={t("viewGrid")}
                                >
                                    {viewMode === "grid" && (
                                        <motion.div
                                            layoutId="viewToggleBg"
                                            className="absolute inset-0 bg-gradient-to-r from-secondary to-tertiary rounded-lg"
                                            transition={{
                                                type: "spring",
                                                stiffness: 400,
                                                damping: 30,
                                            }}
                                        />
                                    )}
                                    <LayoutGrid
                                        size={18}
                                        className="relative z-10"
                                    />
                                </motion.button>
                            </div>

                            {/* Bouton filtre */}
                            <motion.button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`relative p-2.5 rounded-xl transition-colors duration-200 ${
                                    showFilters || hasActiveFilters
                                        ? "bg-gradient-to-r from-secondary to-tertiary text-primary-foreground"
                                        : "bg-muted/50 text-muted-foreground hover:text-foreground"
                                }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label={t("filter")}
                            >
                                <Filter size={18} />
                                {hasActiveFilters && (
                                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                                        {selectedLanguages.length +
                                            (projectTypeFilter !== "all"
                                                ? 1
                                                : 0)}
                                    </span>
                                )}
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Panneau de filtres */}
                    <AnimatePresence>
                        {showFilters && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="w-full max-w-4xl overflow-hidden"
                            >
                                <div className="bg-card border-2 border-border rounded-2xl p-6 space-y-5">
                                    {/* Header filtres */}
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-semibold text-foreground">
                                            {t("filter")}
                                        </h3>
                                        {hasActiveFilters && (
                                            <motion.button
                                                onClick={clearFilters}
                                                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-destructive transition-colors"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <X size={14} />
                                                {t("clearFilters")}
                                            </motion.button>
                                        )}
                                    </div>

                                    {/* Filtre type de projet */}
                                    <div className="space-y-2">
                                        <p className="text-sm font-medium text-muted-foreground">
                                            {t("projectType")}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {(
                                                [
                                                    "all",
                                                    "individual",
                                                    "team",
                                                ] as const
                                            ).map((type) => (
                                                <motion.button
                                                    key={type}
                                                    onClick={() =>
                                                        setProjectTypeFilter(
                                                            type
                                                        )
                                                    }
                                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                                                        projectTypeFilter ===
                                                        type
                                                            ? "bg-gradient-to-r from-secondary to-tertiary text-primary-foreground"
                                                            : "bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted"
                                                    }`}
                                                    whileHover={{
                                                        scale: 1.03,
                                                    }}
                                                    whileTap={{ scale: 0.97 }}
                                                >
                                                    {type === "individual" && (
                                                        <User size={14} />
                                                    )}
                                                    {type === "team" && (
                                                        <Users size={14} />
                                                    )}
                                                    {t(
                                                        type === "all"
                                                            ? "filterAll"
                                                            : type ===
                                                                "individual"
                                                              ? "individualProject"
                                                              : "teamProject"
                                                    )}
                                                </motion.button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Filtre langages */}
                                    <div className="space-y-2">
                                        <p className="text-sm font-medium text-muted-foreground">
                                            {t("languages")}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {allLanguages.map((lang) => (
                                                <motion.button
                                                    key={lang}
                                                    onClick={() =>
                                                        toggleLanguage(lang)
                                                    }
                                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                                                        selectedLanguages.includes(
                                                            lang
                                                        )
                                                            ? "bg-gradient-to-r from-secondary to-tertiary text-primary-foreground"
                                                            : "bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted"
                                                    }`}
                                                    whileHover={{
                                                        scale: 1.03,
                                                    }}
                                                    whileTap={{ scale: 0.97 }}
                                                >
                                                    {lang}
                                                </motion.button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Résultat du filtre */}
                                    <p className="text-xs text-muted-foreground text-right">
                                        {t("filterResult", {
                                            count: filteredProjects.length,
                                            total: projects.length,
                                        })}
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`${viewMode}-${selectedLanguages.join(",")}-${projectTypeFilter}`}
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
                            {filteredProjects.length > 0 ? (
                                filteredProjects.map((project) => {
                                    return (
                                        <PMRProjectCard
                                            key={project.id}
                                            project={project}
                                            onImageClick={handleImageClick}
                                            compact={viewMode === "grid"}
                                        />
                                    );
                                })
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex flex-col items-center justify-center py-20 text-center col-span-3"
                                >
                                    <Filter
                                        size={48}
                                        className="text-muted-foreground/30 mb-4"
                                    />
                                    <p className="text-muted-foreground text-lg">
                                        {t("noResults")}
                                    </p>
                                </motion.div>
                            )}
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
