import Link from "next/link";
import { Info } from "lucide-react";

export default function ResearchNotice() {
    return (
        <div className="provisional-notice rounded-xl border border-stone-200/90 bg-[#F4F3EE] p-4 sm:p-5 text-stone-800">
            <div className="flex items-start gap-3">
                <Info className="w-4 h-4 text-[#5D7C1F] shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs leading-relaxed">
                    <p className="font-semibold text-stone-900">
                        RESEARCH NOTE · FORMAT-SPECIFIC METHODOLOGY
                    </p>
                    <p className="text-stone-600">
                        Combined player selections are provisional. Adjusted scores are calculated relative
                        to their respective tournament candidate pools (IPL vs T20I) and should not be
                        interpreted as a single validated cross-format ranking. Bowling event rates are
                        evaluated per 100 recorded deliveries rather than official legal-ball economy rates.
                    </p>
                    <div className="pt-1">
                        <Link
                            href="/methodology"
                            className="font-medium text-[#506E15] hover:text-[#384E0D] underline underline-offset-2"
                        >
                            Read full methodology, scoring models & limitations →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

