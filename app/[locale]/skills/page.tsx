"use client";

import { JSONBrandIconProps, JSONProps } from "@/lib/constants";
import { useSkills } from "@/lib/contexts/PMRSkillsContext";
import { easeOut, motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";

export default function Skills() {
    const t = useTranslations("PMRSkills");
    const { skills, skillsTools } = useSkills();

    const skillsByCategory = skillsTools.reduce<Record<string, JSONProps[]>>(
        (acc, item) => {
            const cat = item.category || "uncategorized";
            if (!acc[cat]) acc[cat] = [];
            acc[cat].push(item);
            return acc;
        },
        {}
    );

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
    };

    const sectionVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: easeOut },
        },
    };

    const skillVariants: Variants = {
        hidden: { opacity: 0, scale: 0.8, y: 10 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 0.4, ease: easeOut },
        },
    };

    const listItemVariants: Variants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
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
                    <p className="mt-4">{t("description")}</p>
                </motion.div>

                {/* Tools Sections */}
                <motion.div className="grid gap-12 mb-16">
                    {Object.entries(skillsByCategory).map(
                        ([cat, items], idx) => (
                            <motion.section
                                key={cat}
                                className="relative"
                                variants={sectionVariants}
                            >
                                <div className="absolute inset-0 bg-card/50 backdrop-blur-sm rounded-3xl shadow-lg border border-border/20" />
                                <div className="relative p-8 md:p-12">
                                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                                        {t(cat)}
                                        <div className="w-1/2 h-0.5 bg-gradient-to-r from-primary to-secondary mx-auto mt-2 rounded-full"></div>
                                    </h2>

                                    <motion.div
                                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                                        initial="hidden"
                                        animate="visible"
                                        variants={{
                                            visible: {
                                                transition: {
                                                    staggerChildren: 0.05,
                                                    delayChildren:
                                                        idx * 0.2 + 0.5,
                                                },
                                            },
                                        }}
                                    >
                                        {items.map((item, sidx) => (
                                            <motion.div
                                                key={sidx}
                                                className="group relative"
                                                variants={skillVariants}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <div className="relative bg-card backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-border/30 hover:shadow-xl transition-all duration-300 cursor-pointer h-32 flex flex-col justify-center items-center">
                                                    {/* Hover overlay */}
                                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                                                    {/* Icon + title */}
                                                    <div className="relative flex flex-col items-center text-center space-y-3 z-10">
                                                        {item.icon && (
                                                            <item.icon.elm className="text-3xl text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                                                        )}
                                                        <span className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300 text-sm">
                                                            {item.icon
                                                                ? (
                                                                      item.icon as JSONBrandIconProps
                                                                  ).title
                                                                : ""}
                                                        </span>
                                                    </div>

                                                    {/* Animated border */}
                                                    <div
                                                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                                        style={{
                                                            background:
                                                                "linear-gradient(to right, var(--primary), var(--secondary), var(--tertiary))",
                                                        }}
                                                    >
                                                        <div className="w-full h-full rounded-2xl bg-card/80 backdrop-blur-sm"></div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </div>
                            </motion.section>
                        )
                    )}
                </motion.div>

                {/* Detailed Skills List */}
                <motion.div className="space-y-8">
                    {skills.map((skillGroup, idx) => (
                        <motion.div
                            key={idx}
                            className="group relative"
                            variants={sectionVariants}
                        >
                            <div className="absolute inset-0 bg-card/40 backdrop-blur-sm rounded-2xl shadow-md border border-border/20 group-hover:shadow-lg transition-all duration-300" />
                            <div className="relative p-6 md:p-8">
                                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6 relative inline-block">
                                    {t(`${skillGroup.id}.title`)}
                                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-500 ease-out"></div>
                                </h3>

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
                                        t.raw(
                                            `${skillGroup.id}.items`
                                        ) as string[]
                                    )?.map((item, iidx) => (
                                        <motion.div
                                            key={iidx}
                                            className="flex items-start gap-3 group/item"
                                            variants={listItemVariants}
                                        >
                                            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary mt-2 group-hover/item:scale-125 transition-transform duration-200"></span>
                                            <span className="text-muted-foreground group-hover/item:text-foreground transition-colors duration-300 leading-relaxed">
                                                {item}
                                            </span>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
