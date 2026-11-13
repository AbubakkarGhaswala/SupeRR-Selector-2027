import Link from "next/link";

interface HeaderProps {
    activePath?: string;
}

export default function Header({ activePath = "/" }: HeaderProps) {
    return (
        <header className="top-navigation sticky top-0 z-40 w-full border-b border-stone-200/90 bg-[#F8F8F5]/90 backdrop-blur-md">
            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
                {/* Brand Wordmark */}
                <div className="flex items-center gap-6">
                    <Link
                        href="/"
                        className="brand text-2xl font-black tracking-tighter text-stone-950 hover:opacity-90 transition-opacity flex items-baseline"
                    >
                        <span>SupeRR</span>
                        <span>.</span>
                    </Link>

                    <div className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full border border-stone-200 bg-white text-[10px] font-bold uppercase tracking-wider text-stone-500 font-mono">
                        CRICKET SCOUTING
                    </div>
                </div>

                {/* Primary Navigation */}
                <nav className="navigation-links flex items-center gap-1 sm:gap-2">
                    <Link
                        href="/"
                        className={`nav-link px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                            activePath === "/"
                                ? "active bg-stone-900 text-stone-100 shadow-2xs"
                                : "text-stone-600 hover:text-stone-950 hover:bg-stone-200/60"
                        }`}
                    >
                        Overview
                    </Link>
                    <Link
                        href="/#batters"
                        className="nav-link px-3 py-1.5 rounded-full text-xs font-semibold text-stone-600 hover:text-stone-950 hover:bg-stone-200/60 transition-colors"
                    >
                        Batters
                    </Link>
                    <Link
                        href="/#bowlers"
                        className="nav-link px-3 py-1.5 rounded-full text-xs font-semibold text-stone-600 hover:text-stone-950 hover:bg-stone-200/60 transition-colors"
                    >
                        Bowlers
                    </Link>
                    <Link
                        href="/methodology"
                        className={`nav-link px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                            activePath === "/methodology"
                                ? "active bg-stone-900 text-stone-100 shadow-2xs"
                                : "text-stone-600 hover:text-stone-950 hover:bg-stone-200/60"
                        }`}
                    >
                        Methodology
                    </Link>
                </nav>

                {/* Season Label */}
                <div className="season-label hidden md:flex items-center gap-2">
                    <span className="text-[11px] font-extrabold uppercase tracking-widest text-stone-700 font-mono">
                        SEASON 02 / 2027
                    </span>
                </div>
            </div>
        </header>
    );
}
