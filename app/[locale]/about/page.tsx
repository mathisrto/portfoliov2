"use client";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import me from "@/data/images/me.webp";
import PMRTypewriter from "@/lib/components/PMRTypeWriter";
import { easeOut, motion } from "framer-motion";
import { HomeIcon, MailIcon, PhoneIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Home() {
    const t = useTranslations("About");
    const words = [t("developer"), t("student")];

    // Variants d'animations
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2,
            },
        },
    };

    const textVariants = {
        hidden: { opacity: 0, x: -50, y: 20 },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                duration: 0.8,
                ease: easeOut,
            },
        },
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.8, x: 50 },
        visible: {
            opacity: 1,
            scale: 1,
            x: 0,
            transition: {
                duration: 1,
                ease: easeOut,
            },
        },
    };

    const contactItemVariants = {
        hidden: { opacity: 0, x: -10 },
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
        <div className="flex justify-center items-center bg-background flex-1 text-foreground overflow-hidden relative">
            {/* Éléments de fond animés */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute top-20 left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                />
                <motion.div
                    className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.6, 0.3, 0.6],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: 2,
                    }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-tertiary/3 rounded-full blur-3xl"
                    animate={{
                        rotate: 360,
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        rotate: {
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear",
                        },
                        scale: {
                            duration: 12,
                            repeat: Infinity,
                            repeatType: "reverse",
                        },
                    }}
                />
            </div>

            <motion.div
                className="relative w-full max-w-6xl mx-auto h-full grid grid-cols-1 xl:grid-cols-2 items-center gap-8 px-4 py-12"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Infos à gauche */}
                <motion.div
                    className="flex flex-col gap-4 w-full justify-center items-start z-10"
                    variants={textVariants}
                >
                    <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <h1 className="text-primary text-5xl font-bold mb-4">
                            {t("hello")}
                            <motion.span
                                className="text-secondary inline-block"
                                animate={{
                                    scale: [1, 1.05, 1],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    delay: 1.5,
                                }}
                            >
                                {t("name")}
                            </motion.span>
                        </h1>
                    </motion.div>

                    <motion.h2
                        className="text-primary text-3xl mb-6 font-semibold"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        {t("description")}
                        <span className="text-secondary">
                            <PMRTypewriter words={words} />
                        </span>
                    </motion.h2>

                    <motion.p
                        className="mb-4 text-base xl:text-lg leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.9 }}
                    >
                        {t("about_me")}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                    >
                        <Popover>
                            <PopoverTrigger asChild>
                                <motion.button
                                    className="px-6 py-3 rounded-2xl bg-secondary text-primary font-medium shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <span className="relative z-10">
                                        {t("about_me_btn")}
                                    </span>
                                    <motion.div className="absolute inset-0 bg-tertiary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </motion.button>
                            </PopoverTrigger>
                            <PopoverContent asChild>
                                <motion.div
                                    className="bg-card/95 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-border/20"
                                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <motion.p
                                        className="font-semibold mb-4 text-primary"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        {t("contact")}
                                    </motion.p>
                                    <motion.div
                                        className="flex flex-col gap-3"
                                        variants={{
                                            visible: {
                                                transition: {
                                                    staggerChildren: 0.1,
                                                },
                                            },
                                        }}
                                        initial="hidden"
                                        animate="visible"
                                    >
                                        {[
                                            {
                                                icon: PhoneIcon,
                                                text: "07 83 62 86 27",
                                            },
                                            {
                                                icon: HomeIcon,
                                                text: "13280 Arles",
                                            },
                                            {
                                                icon: MailIcon,
                                                text: "ratronmathis@gmail.com",
                                            },
                                        ].map((item, index) => (
                                            <motion.div
                                                key={index}
                                                className="flex items-center gap-3 text-base group/item"
                                                variants={contactItemVariants}
                                                whileHover={{ x: 5 }}
                                            >
                                                <motion.div
                                                    whileHover={{ scale: 1.1 }}
                                                    transition={{
                                                        duration: 0.2,
                                                    }}
                                                >
                                                    <item.icon className="h-5 w-5 text-secondary group-hover/item:text-primary transition-colors duration-200" />
                                                </motion.div>
                                                <span className="font-medium text-muted-foreground group-hover/item:text-foreground transition-colors duration-200">
                                                    {item.text}
                                                </span>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </motion.div>
                            </PopoverContent>
                        </Popover>
                    </motion.div>
                </motion.div>

                {/* Image à droite */}
                <motion.div
                    className="hidden xl:flex items-center justify-center w-3/4 h-auto z-5 relative"
                    variants={imageVariants}
                >
                    <motion.div className="relative w-full h-full">
                        <motion.div
                            className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-secondary/20 to-tertiary/20 rounded-3xl blur-xl"
                            animate={{
                                rotate: [0, 180, 360],
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                rotate: {
                                    duration: 20,
                                    repeat: Infinity,
                                    ease: "linear",
                                },
                                scale: {
                                    duration: 4,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                },
                            }}
                        />
                        <motion.div
                            className="relative"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Image
                                src={me}
                                alt="Photo Mathis Ratron"
                                className="relative rounded-2xl shadow-2xl object-cover w-full h-auto border border-border/20"
                                priority
                            />
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
}
