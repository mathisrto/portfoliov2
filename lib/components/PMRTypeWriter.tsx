"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface PMRTypewriterProps {
    words: string[];
}

export default function PMRTypewriter({ words }: PMRTypewriterProps) {
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [reverse, setReverse] = useState(false);
    const [blink, setBlink] = useState(true);

    useEffect(() => {
        if (index === words.length) return;

        if (subIndex === words[index].length + 1 && !reverse) {
            setTimeout(() => setReverse(true), 1000);
            return;
        }

        if (subIndex === 0 && reverse) {
            setReverse(false);
            setIndex((prev) => (prev + 1) % words.length);
            return;
        }

        const timeout = setTimeout(
            () => {
                setSubIndex((prev) => prev + (reverse ? -1 : 1));
            },
            reverse ? 50 : 150
        );

        return () => clearTimeout(timeout);
    }, [subIndex, index, reverse, words]);

    useEffect(() => {
        const timeout2 = setInterval(() => {
            setBlink((prev) => !prev);
        }, 500);
        return () => clearInterval(timeout2);
    }, []);

    return (
        <motion.span
            key={words[index]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            {`${words[index].substring(0, subIndex)}${blink ? "_" : " "}`}
        </motion.span>
    );
}
