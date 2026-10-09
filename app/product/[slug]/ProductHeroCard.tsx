interface Props {
    icon: string;
    name: string;
    categoryNameBn: string;
    unitBn: string;
    today: number;
    changePct: number;
    isUp: boolean;
}

const toBn = (n: number) => n.toLocaleString("bn-BD");

export default function ProductHeroCard({
    icon,
    name,
    categoryNameBn,
    unitBn,
    today,
    changePct,
    isUp,
}: Props) {
    return (
        <article
            className="
                flex items-start justify-between gap-4
                rounded-2xl border border-[#e8eee8] bg-white
                p-4 xs:p-5 sm:p-6
            "
        >
            {/* Left: icon + info */}
            <div className="flex min-w-0 items-center gap-3 xs:gap-4">
                <div
                    className="
                        flex size-14 shrink-0 items-center justify-center
                        rounded-2xl bg-[#f5f8f5] text-2xl
                        xs:size-16 xs:text-3xl
                        sm:size-20 sm:text-4xl
                    "
                    aria-hidden="true"
                >
                    {icon}
                </div>

                <div className="min-w-0">
                    <h1
                        className="
                            truncate text-lg font-bold text-[#111914]
                            xs:text-xl sm:text-2xl
                        "
                        title={name}
                    >
                        {name}
                    </h1>

                    <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-gray-500 xs:text-xs">
                        <span className="inline-flex items-center gap-1">
                            <span aria-hidden="true">🏷️</span>
                            {categoryNameBn}
                        </span>
                        <span className="text-gray-300">•</span>
                        <span>প্রতি {unitBn}</span>
                        <span className="text-gray-300">•</span>
                        <span>সর্বশেষ আপডেট: আজ</span>
                    </div>
                </div>
            </div>

            {/* Right: price + change */}
            <div className="flex shrink-0 flex-col items-end gap-1">
                <span className="text-[10px] font-medium text-gray-500 xs:text-xs">
                    আজকের দাম
                </span>

                <p className="flex items-baseline gap-1 text-xl font-extrabold leading-none text-[#111914] xs:text-2xl sm:text-3xl">
                    <span>{toBn(today)}</span>
                    <span className="text-xs font-medium text-gray-600 xs:text-sm">
                        টাকা/{unitBn}
                    </span>
                </p>

                <span
                    className={`
                        mt-1 inline-flex items-center gap-0.5
                        rounded-md px-1.5 py-0.5
                        text-[10px] font-bold xs:text-[11px]
                        ${isUp
                            ? "bg-red-50 text-red-600"
                            : "bg-emerald-50 text-emerald-600"
                        }
                    `}
                >
                    <span aria-hidden="true" className="text-[8px] xs:text-[9px]">
                        {isUp ? "▲" : "▼"}
                    </span>
                    <span>{toBn(changePct)}%</span>
                </span>
            </div>
        </article>
    );
}