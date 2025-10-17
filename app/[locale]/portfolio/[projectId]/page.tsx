"use client";

import PMRDialogPortfolio from "@/lib/components/PMRDialogPortfolio";
import { useLocale } from "@/lib/contexts/PMRLocaleContext";
import { usePortfolio } from "@/lib/contexts/PMRPortfolio";
import { loadImage } from "@/lib/utils";
import { easeOut, motion } from "framer-motion";
import {
    ArrowLeft,
    Code,
    Lightbulb,
    Target,
    UserIcon,
    Wrench,
    Zap,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { use, useState } from "react";

interface PageProps {
    params: Promise<{ projectId: string }>;
}

export default function ProjectPage({ params }: PageProps) {
    const t = useTranslations("PMRPortfolio");
    const resolvedParams = use(params);
    const { projectId } = resolvedParams;
    const { projects } = usePortfolio();
    const router = useRouter();
    const { locale } = useLocale();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogImages, setDialogImages] = useState<string[]>([]);

    if (projects.length === 0) {
        return <></>;
    }

    const project = projects.find((p) => p.id === projectId);

    if (!project) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="min-h-screen flex items-center justify-center"
            >
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-primary">
                        Projet introuvable
                    </h1>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => router.push(`/${locale}/portfolio`)}
                        className="px-6 py-3 bg-secondary text-primary-foreground rounded-xl font-semibold"
                    >
                        Retour
                    </motion.button>
                </div>
            </motion.div>
        );
    }

    const images = t.raw(`${projectId}.images`) || [];
    const languages = t.raw(`${projectId}.languages`) || [];
    const tools = t.raw(`${projectId}.tools`) || [];

    const handleImageClick = () => {
        setDialogImages(images);
        setDialogOpen(true);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: easeOut,
            },
        },
    };

    return (
        <div className="min-h-screen">
            {/* Header avec parallax */}
            <motion.div className="relative h-[400px] bg-gradient-to-br from-secondary via-tertiary to-primary overflow-hidden">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.1 }}
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                    }}
                />

                <div className="relative h-full flex flex-col justify-center items-center text-center px-6">
                    <motion.button
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => router.push(`/${locale}/portfolio`)}
                        className="absolute top-8 left-8 flex items-center gap-2 px-4 py-2 bg-background/20 backdrop-blur-md text-primary-foreground rounded-xl hover:bg-background/30 transition-all"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-medium">Retour</span>
                    </motion.button>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-5xl lg:text-7xl font-bold text-primary-foreground mb-4"
                    >
                        {t(`${projectId}.projectName`)}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="text-xl text-primary-foreground/90 max-w-2xl"
                    >
                        {t(`${projectId}.description`)}
                    </motion.p>
                </div>
            </motion.div>

            {/* Contenu principal */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-6xl mx-auto px-6 py-12 space-y-12"
            >
                {/* Rôle */}
                <motion.div variants={itemVariants} className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-secondary/10 rounded-xl">
                            <Target className="w-6 h-6 text-secondary" />
                        </div>
                        <h2 className="text-3xl font-bold text-primary">
                            {t("role")}
                        </h2>
                    </div>
                    <p className="text-lg text-muted-foreground pl-16">
                        {t(`${projectId}.role`)}
                    </p>
                </motion.div>

                {/* Technologies */}
                <motion.div
                    variants={itemVariants}
                    className="grid md:grid-cols-2 gap-8"
                >
                    {/* Langages */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-tertiary/10 rounded-xl">
                                <Code className="w-6 h-6 text-tertiary" />
                            </div>
                            <h3 className="text-2xl font-bold text-primary">
                                {t("languages")}
                            </h3>
                        </div>
                        <div className="flex flex-wrap gap-2 pl-16">
                            {languages.map((lang: string, index: number) => (
                                <motion.span
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.1 * index }}
                                    whileHover={{ scale: 1.05 }}
                                    className="px-4 py-2 bg-tertiary/20 text-tertiary font-medium rounded-lg border border-tertiary/30"
                                >
                                    {lang}
                                </motion.span>
                            ))}
                        </div>
                    </div>

                    {/* Outils */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-secondary/10 rounded-xl">
                                <Wrench className="w-6 h-6 text-secondary" />
                            </div>
                            <h3 className="text-2xl font-bold text-primary">
                                {t("tools")}
                            </h3>
                        </div>
                        <div className="flex flex-wrap gap-2 pl-16">
                            {tools.map((tool: string, index: number) => (
                                <motion.span
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.1 * index }}
                                    whileHover={{ scale: 1.05 }}
                                    className="px-4 py-2 bg-secondary/20 text-secondary font-medium rounded-lg border border-secondary/30"
                                >
                                    {tool}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Description des outils */}
                <motion.div
                    variants={itemVariants}
                    className="bg-card rounded-2xl p-8 border border-border"
                >
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        {t(`${projectId}.toolsDescription`)}
                    </p>
                </motion.div>

                {/* Projet personnel ou en équipe */}
                <motion.div
                    variants={itemVariants}
                    className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border border-primary/20 flex items-center gap-4"
                >
                    <div className="p-3 bg-primary/10 rounded-xl">
                        <UserIcon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-primary mb-2">
                            {t("projectType")}
                        </h3>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            {t.raw(`${projectId}.isIndividual`)
                                ? t("individualProject")
                                : t("teamProject")}
                        </p>
                    </div>
                </motion.div>

                {/* Défis et Solutions */}
                <motion.div
                    variants={itemVariants}
                    className="grid md:grid-cols-2 gap-8"
                >
                    {/* Défis */}
                    <div className="space-y-4 bg-destructive/5 rounded-2xl p-8 border border-destructive/20">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-destructive/10 rounded-xl">
                                <Zap className="w-6 h-6 text-destructive" />
                            </div>
                            <h3 className="text-2xl font-bold text-destructive">
                                {t("challenges")}
                            </h3>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                            {t(`${projectId}.challenges`)}
                        </p>
                    </div>

                    {/* Solutions */}
                    <div className="space-y-4 bg-tertiary/5 rounded-2xl p-8 border border-tertiary/20">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-tertiary/10 rounded-xl">
                                <Lightbulb className="w-6 h-6 text-tertiary" />
                            </div>
                            <h3 className="text-2xl font-bold text-tertiary">
                                {t("solutions")}
                            </h3>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                            {t(`${projectId}.solutions`)}
                        </p>
                    </div>
                </motion.div>

                {/* Impact */}
                <motion.div
                    variants={itemVariants}
                    className="bg-gradient-to-r from-secondary/10 to-tertiary/10 rounded-2xl p-8 border border-secondary/30"
                >
                    <h3 className="text-2xl font-bold text-primary mb-4">
                        Impact du projet
                    </h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        {t(`${projectId}.impactDescription`)}
                    </p>
                </motion.div>

                {/* Description visuelle */}
                <motion.div
                    variants={itemVariants}
                    className="bg-card rounded-2xl p-8 border border-border"
                >
                    <h3 className="text-2xl font-bold text-primary mb-4">
                        Aperçu visuel
                    </h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        {t(`${projectId}.visualDescription`)}
                    </p>
                </motion.div>

                {t.raw(`${projectId}.link`) && (
                    <motion.div
                        variants={itemVariants}
                        className="flex items-center justify-center"
                    >
                        <a
                            href={t.raw(`${projectId}.link`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold shadow hover:bg-primary/90 transition-all"
                        >
                            <Lightbulb className="w-5 h-5" />
                            {t("visitProject")}
                        </a>
                    </motion.div>
                )}

                {/* Galerie d'images */}
                {images.length > 0 && (
                    <motion.div variants={itemVariants} className="space-y-6">
                        <h3 className="text-3xl font-bold text-primary">
                            Galerie
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {images.map((img: string, index: number) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    onClick={handleImageClick}
                                    className="relative aspect-video rounded-xl overflow-hidden cursor-zoom-in shadow-lg hover:shadow-2xl transition-all bg-muted/50 group"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.3 }}
                                        className="w-full h-full"
                                    >
                                        {loadImage(
                                            projectId,
                                            img,
                                            `${t(
                                                `${projectId}.projectName`
                                            )} - ${index + 1}`
                                        )}
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </motion.div>

            {/* Dialog pour les images */}
            <PMRDialogPortfolio
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                images={dialogImages}
                projectId={projectId}
            />
        </div>
    );
}
