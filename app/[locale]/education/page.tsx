"use client";

import { useEducations } from "@/lib/contexts/PMREducationContext";
import { easeOut, motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";

export default function Education() {
    const t = useTranslations("PMREducation");
    const { educations } = useEducations();

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.6, ease: easeOut },
        },
    };

    const detailVariants: Variants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.4, ease: easeOut },
        },
    };

    const badgeVariants: Variants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.3, ease: easeOut },
        },
    };

    return (
        <motion.div
            className="min-h-screen py-12 px-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-tertiary bg-clip-text text-transparent mb-4">
                        {t("title")}
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
                    <p className="mt-4 text-muted-foreground text-lg">
                        {t("description")}
                    </p>
                </motion.div>

                {/* Timeline */}
                <motion.div className="relative">
                    <div className="hidden md:block absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-tertiary rounded-full" />

                    <motion.div className="space-y-12">
                        {educations.map((education, idx) => (
                            <motion.div
                                key={education.id}
                                className="group relative flex md:flex-row flex-col gap-6"
                                variants={itemVariants}
                            >
                                {/* Timeline dot */}
                                <div className="hidden md:block absolute left-4 top-8 w-4 h-4 bg-gradient-to-r from-primary to-secondary rounded-full border-4 border-background shadow-lg z-10" />

                                {/* Card */}
                                <motion.div
                                    className="relative md:ml-16 p-8 bg-card/50 backdrop-blur-sm rounded-3xl shadow-lg border border-border/20 transition-all duration-300 w-full"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    {/* Hover overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-tertiary/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                                    {/* Content */}
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-center gap-4">
                                            {/* Icon */}
                                            {education.icon && (
                                                <education.icon.elm className="text-3xl text-primary w-full h-full" />
                                            )}

                                            {/* Title & Degree */}
                                            <div className="flex-1">
                                                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                                                    {t(`${education.id}.title`)}
                                                </h2>
                                                <p className="text-lg bg-gradient-to-r from-secondary to-tertiary bg-clip-text text-transparent font-semibold">
                                                    {t(
                                                        `${education.id}.degree`
                                                    )}
                                                </p>
                                                <div className="flex flex-col gap-1 text-muted-foreground text-sm mt-2">
                                                    <span>
                                                        {t(
                                                            `${education.id}.duration`
                                                        )}
                                                    </span>
                                                    <span>
                                                        {t(
                                                            `${education.id}.location`
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Specialties */}
                                        {(() => {
                                            try {
                                                const ed = t.raw(education.id);
                                                if (!ed.speciality) return null;
                                                return (
                                                    <motion.div
                                                        initial="hidden"
                                                        animate="visible"
                                                        variants={
                                                            detailVariants
                                                        }
                                                    >
                                                        <h3 className="text-lg font-semibold text-foreground mb-2">
                                                            {t(
                                                                "speciality_title"
                                                            )}
                                                        </h3>
                                                        <motion.div
                                                            className="flex flex-wrap gap-2"
                                                            variants={{
                                                                visible: {
                                                                    transition:
                                                                        {
                                                                            staggerChildren: 0.05,
                                                                            delayChildren:
                                                                                idx *
                                                                                0.1,
                                                                        },
                                                                },
                                                            }}
                                                        >
                                                            <motion.span
                                                                className="px-3 py-1 bg-gradient-to-r from-primary/10 to-secondary/10 border border-border/30 rounded-full text-sm font-medium text-foreground transition-all duration-300 cursor-default group-hover:bg-primary/20"
                                                                variants={
                                                                    badgeVariants
                                                                }
                                                            >
                                                                {ed.speciality}
                                                            </motion.span>
                                                        </motion.div>
                                                    </motion.div>
                                                );
                                            } catch {
                                                return null;
                                            }
                                        })()}

                                        {/* Mention */}
                                        <motion.div
                                            variants={detailVariants}
                                            className="flex items-center gap-2"
                                        >
                                            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary"></span>
                                            <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                                                <span className="font-semibold">
                                                    {t("mention_title")}:{" "}
                                                </span>
                                                {t(`${education.id}.mention`)}
                                            </p>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
