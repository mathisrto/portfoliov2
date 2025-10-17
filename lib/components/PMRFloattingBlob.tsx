/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { motion } from "framer-motion";

interface FloatingBlobProps {
    className?: string;
    animateProps?: any;
    transitionProps?: any;
    initialProps?: any;
}

export const FloatingBlob = ({
    className,
    animateProps,
    transitionProps,
    initialProps,
}: FloatingBlobProps) => (
    <motion.div
        className={`absolute rounded-full blur-3xl ${className}`}
        animate={animateProps}
        transition={transitionProps}
        initial={initialProps}
    />
);
