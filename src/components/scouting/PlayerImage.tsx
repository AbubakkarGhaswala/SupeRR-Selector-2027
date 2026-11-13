"use client";

import { useState } from "react";
import Image from "next/image";

interface PlayerImageProps {
    src: string;
    alt: string;
    name: string;
    rank?: number;
    className?: string;
    aspectRatio?: "square" | "portrait" | "tall" | "featured";
    priority?: boolean;
    sizes?: string;
}

export default function PlayerImage({
    src,
    alt,
    name,
    rank,
    className = "",
    aspectRatio = "portrait",
    priority = false,
    sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
}: PlayerImageProps) {
    const [prevSrc, setPrevSrc] = useState(src);
    const [currentSrc, setCurrentSrc] = useState(src);
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    if (src !== prevSrc) {
        setPrevSrc(src);
        setCurrentSrc(src);
        setHasError(false);
        setIsLoading(true);
    }

    const handleImgError = () => {
        // If /images/players failed, try /players/
        if (currentSrc.startsWith("/images/players/")) {
            setCurrentSrc(currentSrc.replace("/images/players/", "/players/"));
        } else if (currentSrc.startsWith("/players/")) {
            setCurrentSrc(currentSrc.replace("/players/", "/images/players/"));
        } else {
            setHasError(true);
            setIsLoading(false);
        }
    };

    const initials = name
        .split(" ")
        .filter(Boolean)
        .map((part) => part[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

    const aspectClasses = {
        square: "aspect-square",
        portrait: "aspect-[4/5]",
        tall: "aspect-[3/4]",
        featured: "aspect-[4/5] md:aspect-[3/4] lg:aspect-[4/5]",
    }[aspectRatio];

    const aspectStyles = {
        square: { aspectRatio: "1 / 1" },
        portrait: { aspectRatio: "4 / 5" },
        tall: { aspectRatio: "3 / 4" },
        featured: { aspectRatio: "4 / 5" },
    }[aspectRatio];

    return (
        <div
            className={`player-photo-container relative overflow-hidden bg-[#1E2024] select-none ${aspectClasses} ${className}`}
            style={{ position: "relative", overflow: "hidden", ...aspectStyles }}
        >
            {!hasError ? (
                <Image
                    src={currentSrc}
                    alt={alt}
                    fill
                    priority={priority}
                    sizes={sizes}
                    style={{ objectFit: "cover", objectPosition: "top center" }}
                    className={`object-cover object-top transition-all duration-500 ${
                        isLoading ? "scale-105 blur-sm opacity-60" : "scale-100 blur-0 opacity-100"
                    } group-hover:scale-[1.03] transition-transform duration-700 ease-out`}
                    onLoad={() => setIsLoading(false)}
                    onError={handleImgError}
                />
            ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#242830] to-[#181A1E] text-stone-200">
                    <div className="w-16 h-16 rounded-full border border-stone-600/40 bg-stone-800/80 flex items-center justify-center mb-3 text-xl font-bold tracking-wider text-[#A4BE5C]">
                        {initials}
                    </div>
                    <span className="text-xs uppercase tracking-widest text-stone-400 font-medium">
                        {rank ? `Rank #${rank.toString().padStart(2, "0")}` : "Profile"}
                    </span>
                    <span className="text-sm font-semibold text-stone-200 mt-1 line-clamp-1">
                        {name}
                    </span>
                </div>
            )}

            {/* Subtle editorial vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />
        </div>
    );
}

