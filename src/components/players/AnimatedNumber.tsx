"use client";

import { useEffect, useRef } from "react";
import { animate, useMotionValue, useTransform } from "framer-motion";

interface AnimatedNumberProps {
    value: number;
    decimals?: number;
    duration?: number;
    showSign?: boolean;
    prefix?: string;
    suffix?: string;
    className?: string;
}

export default function AnimatedNumber({
    value,
    decimals = 1,
    duration = 0.45,
    showSign = false,
    prefix = "",
    suffix = "",
    className = "",
}: AnimatedNumberProps) {
    const motionValue = useMotionValue(value);

    useEffect(() => {
        const controls = animate(motionValue, value, {
            duration,
            ease: [0.16, 1, 0.3, 1], // Apple-style smooth easeOut
        });
        return () => controls.stop();
    }, [value, duration, motionValue]);

    const formatted = useTransform(motionValue, (latest) => {
        const isPositive = latest > 0;
        const sign = showSign && isPositive ? "+" : "";
        const formattedNum = latest.toFixed(decimals);
        return `${prefix}${sign}${formattedNum}${suffix}`;
    });

    const displayRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        return formatted.on("change", (v) => {
            if (displayRef.current) {
                displayRef.current.textContent = v;
            }
        });
    }, [formatted]);

    const initialSign = showSign && value > 0 ? "+" : "";
    const initialText = `${prefix}${initialSign}${value.toFixed(decimals)}${suffix}`;

    return (
        <span ref={displayRef} className={className}>
            {initialText}
        </span>
    );
}
