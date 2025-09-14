"use client";

import { PMRMenuPropsBrand } from "@/lib/constants";
import { useSkills } from "@/lib/contexts/PMRSkillsContext";
import { easeOut, motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";

export default function Skills() {
    const t = useTranslations("Skills");
    const { skills, skillsTools } = useSkills();

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const sectionVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 20,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: easeOut,
            },
        },
    };

    const skillVariants: Variants = {
        hidden: {
            opacity: 0,
            scale: 0.8,
            y: 10,
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: 0.4,
                ease: easeOut,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 20,
            x: -10,
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            transition: {
                duration: 0.5,
                ease: easeOut,
            },
        },
    };

    const listItemVariants: Variants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.3,
                ease: easeOut,
            },
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
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-tertiary bg-clip-text text-transparent mb-4">
                        {t("title")}
                    </h1>
                    <motion.div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></motion.div>
                    <p className="mt-4">{t("description")}</p>
                </motion.div>

                {/* Section des outils/technologies avec icônes */}
                <motion.div className="grid gap-12 mb-16">
                    {Object.entries(skillsTools).map(
                        ([key, tools], sectionIndex) => (
                            <motion.section
                                key={key}
                                className="relative"
                                variants={sectionVariants}
                            >
                                {/* Section Background with Glass Effect */}
                                <motion.div className="absolute inset-0 bg-card/50 backdrop-blur-sm rounded-3xl shadow-lg border border-border/20"></motion.div>

                                <motion.div className="relative p-8 md:p-12">
                                    <motion.h2
                                        className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            delay: sectionIndex * 0.1 + 0.3,
                                            duration: 0.6,
                                        }}
                                    >
                                        <span>
                                            <div className="mb-4">{t(key)}</div>
                                            <motion.div className="w-1/2 h-0.5 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></motion.div>
                                        </span>
                                    </motion.h2>

                                    <motion.div
                                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                                        initial="hidden"
                                        animate="visible"
                                        variants={
                                            {
                                                visible: {
                                                    transition: {
                                                        staggerChildren: 0.05,
                                                        delayChildren:
                                                            sectionIndex * 0.2 +
                                                            0.5,
                                                    },
                                                },
                                            } as Variants
                                        }
                                    >
                                        {tools.map(
                                            (
                                                tool: PMRMenuPropsBrand<false>,
                                                idx: number
                                            ) => (
                                                <motion.div
                                                    key={idx}
                                                    className="group relative overflow-hidden"
                                                    variants={skillVariants}
                                                    whileHover={{
                                                        scale: 1.05,
                                                        transition: {
                                                            duration: 0.2,
                                                        },
                                                    }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    {/* Skill Card */}
                                                    <motion.div className="relative bg-card backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-border/30 hover:shadow-xl hover:bg-card/90 transition-all duration-300 cursor-pointer h-32 flex flex-col justify-center items-center">
                                                        {/* Hover Glow Effect */}
                                                        <motion.div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></motion.div>

                                                        {/* Content */}
                                                        <motion.div className="relative flex flex-col items-center text-center space-y-3 z-10">
                                                            <motion.div
                                                                className="text-3xl text-muted-foreground group-hover:text-primary transition-colors duration-300"
                                                                whileHover={{
                                                                    rotate: [
                                                                        0, -10,
                                                                        10, 0,
                                                                    ],
                                                                }}
                                                                transition={{
                                                                    duration: 0.5,
                                                                    type: "tween" as const,
                                                                    ease: "easeInOut" as const,
                                                                }}
                                                            >
                                                                <tool.icon />
                                                            </motion.div>

                                                            <span className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300 text-sm">
                                                                {tool.name}
                                                            </span>
                                                        </motion.div>

                                                        {/* Animated Border - positioned behind content */}
                                                        <motion.div
                                                            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-px pointer-events-none"
                                                            style={{
                                                                background:
                                                                    "linear-gradient(to right, var(--primary), var(--secondary), var(--tertiary))",
                                                            }}
                                                        >
                                                            <motion.div className="w-full h-full rounded-2xl bg-card/80 backdrop-blur-sm"></motion.div>
                                                        </motion.div>
                                                    </motion.div>
                                                </motion.div>
                                            )
                                        )}
                                    </motion.div>
                                </motion.div>
                            </motion.section>
                        )
                    )}
                </motion.div>

                {/* Section des compétences détaillées en listes */}
                <motion.div
                    className="space-y-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {skills.map((element, idx) => (
                        <motion.div
                            key={idx}
                            className="group relative"
                            variants={itemVariants}
                        >
                            {/* Background Card */}
                            <motion.div className="absolute inset-0 bg-card/40 backdrop-blur-sm rounded-2xl shadow-md border border-border/20 group-hover:shadow-lg group-hover:bg-card/60 transition-all duration-300"></motion.div>

                            <motion.div className="relative p-6 md:p-8">
                                {/* Title with gradient underline */}
                                <motion.h3
                                    className="text-2xl md:text-3xl font-bold text-foreground mb-6 relative inline-block"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {t(`${element}.title`)}
                                    <motion.div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-500 ease-out"></motion.div>
                                </motion.h3>

                                {/* Skills List */}
                                <motion.div
                                    className="space-y-3"
                                    initial="hidden"
                                    animate="visible"
                                    variants={{
                                        visible: {
                                            transition: {
                                                staggerChildren: 0.05,
                                                delayChildren: idx * 0.1,
                                            },
                                        },
                                    }}
                                >
                                    {(
                                        t.raw(`${element}.items`) as string[]
                                    )?.map((item: string, itemIdx: number) => (
                                        <motion.div
                                            key={itemIdx}
                                            className="flex items-start gap-3 group/item"
                                            variants={listItemVariants}
                                        >
                                            {/* Custom bullet point */}
                                            <motion.div className="flex-shrink-0 mt-2">
                                                <motion.div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary group-hover/item:scale-125 transition-transform duration-200"></motion.div>
                                            </motion.div>

                                            {/* Item text */}
                                            <span className="text-muted-foreground group-hover/item:text-foreground transition-colors duration-300 leading-relaxed">
                                                {item}
                                            </span>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </motion.div>

                            {/* Hover accent line */}
                            <motion.div className="absolute left-0 top-6 bottom-6 w-1 bg-gradient-to-b from-primary via-secondary to-tertiary rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></motion.div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Floating Elements for Visual Interest */}
                <motion.div className="fixed top-20 left-10 w-32 h-32 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full blur-xl animate-pulse"></motion.div>
                <motion.div
                    className="fixed bottom-20 right-10 w-24 h-24 bg-gradient-to-r from-secondary/5 to-tertiary/5 rounded-full blur-xl animate-pulse"
                    style={{ animationDelay: "1s" }}
                ></motion.div>
                <motion.div
                    className="fixed top-1/2 right-20 w-20 h-20 bg-gradient-to-r from-tertiary/5 to-primary/5 rounded-full blur-xl animate-pulse"
                    style={{ animationDelay: "2s" }}
                ></motion.div>
            </motion.div>
        </motion.div>
    );
}
