"use client";

import { useState } from "react";
import Image from "next/image";

interface PlayerImageProps {
    slug: string;
    name: string;
    rank?: number;
    competition?: string;
    variant?: "card" | "workspace";
    className?: string;
    priority?: boolean;
}

export default function PlayerImage({
    slug,
    name,
    rank,
    competition,
    variant = "card",
    className = "",
    priority = false,
}: PlayerImageProps) {
    // Try .webp first, fall back to .jpg, then fallback initials
    const [pathIndex, setPathIndex] = useState(0);
    const [prevSlug, setPrevSlug] = useState(slug);
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const candidates = [
        `/players/${slug}.webp`,
        `/images/players/${slug}.webp`,
        `/players/${slug}.jpg`,
        `/images/players/${slug}.jpg`,
    ];

    if (slug !== prevSlug) {
        setPrevSlug(slug);
        setPathIndex(0);
        setHasError(false);
        setIsLoading(true);
    }

    const currentSrc = candidates[pathIndex] || candidates[0];

    const handleImgError = () => {
        if (pathIndex + 1 < candidates.length) {
            setPathIndex((prev) => prev + 1);
        } else {
            setHasError(true);
            setIsLoading(false);
        }
    };

    const initials = name
        .split(" ")
        .filter(Boolean)
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

    const rankStr = rank ? rank.toString().padStart(2, "0") : "";

    if (variant === "workspace") {
        return (
            <div
                className={`relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-b from-[#202020] via-[#151515] to-[#0D0D0D] border border-stone-800 shadow-2xl select-none flex items-center justify-center ${className}`}
            >
                {/* Subtle spotlight gradient behind player */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(183,243,74,0.12),transparent_65%)] pointer-events-none" />

                {!hasError ? (
                    <Image
                        src={currentSrc}
                        alt={name}
                        fill
                        priority={priority}
                        sizes="(max-width: 768px) 100vw, 420px"
                        style={{ objectFit: "cover", objectPosition: "top center" }}
                        className={`object-cover object-top transition-all duration-500 ${
                            isLoading ? "scale-105 blur-sm opacity-60" : "scale-100 blur-0 opacity-100"
                        }`}
                        onLoad={() => setIsLoading(false)}
                        onError={handleImgError}
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center text-stone-400 p-6 text-center">
                        <div className="w-20 h-20 rounded-full bg-stone-900 border border-stone-700 flex items-center justify-center text-2xl font-black text-[#B7F34A] mb-3">
                            {initials}
                        </div>
                        <span className="text-sm font-bold text-stone-200">{name}</span>
                    </div>
                )}

                {/* Rank Badge: Top Left */}
                {rank && (
                    <div className="absolute top-3.5 left-3.5 z-20 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-stone-700/80 font-mono shadow-md flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B7F34A]" />
                        <span className="text-[11px] font-black text-[#B7F34A] tracking-wider">
                            #{rankStr}
                        </span>
                    </div>
                )}

                {/* Competition Badge: Top Right */}
                {competition && (
                    <div className="absolute top-3.5 right-3.5 z-20 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-stone-700/80 font-mono shadow-md">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-stone-200">
                            {competition}
                        </span>
                    </div>
                )}

                {/* Cinematic Vignette Overlay (never obscures the player's face) */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-transparent to-transparent opacity-60 pointer-events-none" />
                <div className="absolute inset-0 border border-white/5 rounded-2xl pointer-events-none" />
            </div>
        );
    }

    // Default: Card Image
    return (
        <div
            className={`relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-[#1A1A1A] border border-stone-200/60 shadow-2xs select-none ${className}`}
        >
            {!hasError ? (
                <Image
                    src={currentSrc}
                    alt={name}
                    fill
                    priority={priority}
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 220px"
                    style={{ objectFit: "cover", objectPosition: "top center" }}
                    className={`object-cover object-top transition-transform duration-500 group-hover:scale-[1.02] ${
                        isLoading ? "scale-105 blur-xs opacity-70" : "scale-100 blur-0 opacity-100"
                    }`}
                    onLoad={() => setIsLoading(false)}
                    onError={handleImgError}
                />
            ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-stone-400 bg-stone-900">
                    <span className="text-lg font-black text-[#B7F34A]">{initials}</span>
                </div>
            )}

            {/* Subtle card vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none" />
        </div>
    );
}

