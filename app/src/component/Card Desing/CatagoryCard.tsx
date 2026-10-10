interface CatagoryCardProps {
    icon: string;
    name: string;
    unit: string;
    price: number;
    change: number;
    slug: string;
}

import Link from "next/link";

const CatagoryCard = ({ icon, name, unit, price, change, slug }: CatagoryCardProps) => {
    const isUp = change > 0;

    return (
        <Link href={`/product-details/${slug}`}>
        <article
            className="
                group flex h-full flex-col justify-between
                rounded-xl border border-[#dce5dc] bg-white p-3
                transition-all duration-300
                hover:-translate-y-1 hover:border-green-200
                hover:shadow-lg hover:shadow-green-900/5
                xs:rounded-2xl xs:p-4
                sm:p-5
            "
        >
            {/* Product Info */}
            <div className="mb-3 flex items-center gap-2.5 xs:gap-3 sm:mb-4">
                <div
                    className="
                        flex size-11 shrink-0 items-center justify-center
                        rounded-lg bg-[#eff5ef] text-xl
                        transition-colors group-hover:bg-green-50
                        xs:size-12 xs:rounded-xl xs:text-2xl
                        sm:size-14
                    "
                    aria-hidden="true"
                >
                    {icon}
                </div>

                <div className="min-w-0 flex-1">
                    <h2
                        className="
                            truncate text-sm font-bold leading-tight text-[#19251b]
                            xs:text-base
                            sm:text-lg
                        "
                        title={name}
                    >
                        {name}
                    </h2>
                    <p
                        className="truncate text-xs text-gray-500 xs:text-sm"
                        title={unit}
                    >
                        {unit}
                    </p>
                </div>
            </div>

            {/* Price + Change */}
            <div className="flex items-end justify-between gap-2">
                <div className="min-w-0">
                    <p className="mb-0.5 text-[10px] text-gray-500 xs:mb-1 xs:text-xs">
                        আজকের দাম
                    </p>
                    <p
                        className="
                            flex flex-wrap items-baseline gap-x-1
                            text-lg font-extrabold leading-tight text-[#17251b]
                            xs:text-xl
                            sm:text-2xl
                        "
                    >
                        <span className="whitespace-nowrap">
                            {price.toLocaleString("bn-BD")}
                        </span>
                        <span className="text-xs font-medium xs:text-sm">টাকা</span>
                    </p>
                </div>

                <span
                    className={`
                        inline-flex shrink-0 items-center gap-0.5
                        rounded-full px-2 py-1
                        text-[10px] font-semibold
                        xs:gap-1 xs:px-2.5 xs:py-1.5 xs:text-xs
                        ${isUp
                            ? "bg-red-50 text-red-600"
                            : "bg-emerald-50 text-emerald-600"
                        }
                    `}
                    aria-label={`দাম ${isUp ? "বেড়েছে" : "কমেছে"} ${Math.abs(change).toFixed(1)} শতাংশ`}
                >
                    <span aria-hidden="true">{isUp ? "▲" : "▼"}</span>
                    <span>{Math.abs(change).toFixed(1)}%</span>
                </span>
            </div>
        </article>
        </Link>
    );
};

export default CatagoryCard;