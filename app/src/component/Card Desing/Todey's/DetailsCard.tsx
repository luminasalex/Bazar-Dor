import Link from "next/link";

interface CatagoryCardProps {
    icon: string;
    name: string;
    unit: string;
    price: number;
    change: number;
    slug: string;
}

const CatagoryCard = ({ icon, name, unit, price, change, slug }: CatagoryCardProps) => {
    const isUp = change > 0;

    return (
        <Link href={`/product/${slug}`} className="block h-full">
        <article
            className="
                group flex h-full flex-col justify-between
                rounded-2xl border border-[#e8eee8] bg-white
                p-3.5
                transition-all duration-300
                hover:-translate-y-0.5 hover:border-green-200
                hover:shadow-md hover:shadow-green-900/5
                xs:p-4
                sm:p-5
            "
        >

            <div className="mb-3 flex items-center gap-3 sm:mb-4">
                <div
                    className="
                        flex size-10 shrink-0 items-center justify-center
                        rounded-xl bg-[#f5f8f5] text-xl
                        transition-colors
                        group-hover:bg-green-50
                        xs:size-11 xs:text-2xl
                        sm:size-12
                    "
                    aria-hidden="true"
                >
                    {icon}
                </div>

                <div className="min-w-0 flex-1">
                    <h2
                        className="
                            truncate text-sm font-bold leading-tight text-[#111914]
                            xs:text-[15px]
                            sm:text-base
                        "
                        title={name}
                    >
                        {name}
                    </h2>
                    <p
                        className="mt-0.5 truncate text-[11px] text-gray-500 xs:text-xs"
                        title={unit}
                    >
                        {unit}
                    </p>
                </div>
            </div>


            <p className="mb-1 text-[10px] font-medium text-gray-500 xs:text-[11px]">
                আজকের দাম
            </p>


            <div className="flex items-end justify-between gap-2">
                <p
                    className="
                        flex flex-wrap items-baseline gap-x-1
                        text-lg font-extrabold leading-tight text-[#111914]
                        xs:text-xl
                        sm:text-[22px]
                    "
                >
                    <span className="whitespace-nowrap">
                        {price.toLocaleString("bn-BD")}
                    </span>
                    <span className="text-[11px] font-medium text-gray-600 xs:text-xs">
                        টাকা
                    </span>
                </p>

                <span
                    className={`
                        inline-flex shrink-0 items-center gap-0.5
                        rounded-md px-1.5 py-0.5
                        text-[10px] font-bold
                        xs:gap-1 xs:px-2 xs:py-1 xs:text-[11px]
                        ${isUp
                            ? "bg-red-50 text-red-600"
                            : "bg-emerald-50 text-emerald-600"
                        }
                    `}
                    aria-label={`দাম ${isUp ? "বেড়েছে" : "কমেছে"} ${Math.abs(change).toFixed(1)} শতাংশ`}
                >
                    <span aria-hidden="true" className="text-[8px] xs:text-[9px]">
                        {isUp ? "▲" : "▼"}
                    </span>
                    <span>{Math.abs(change).toFixed(1)}%</span>
                </span>
            </div>
        </article>
        </Link>
    );
};

export default CatagoryCard;