import Marquee from "react-fast-marquee";

interface Product {
    id: number;
    slug: string;
    nameBn: string;
    category: string;
    categoryNameBn: string;
    categoryIcon: string;
    unit: string;
    image: string;
    today: number;
    yesterday: number;
    lastWeek: number;
    lastMonth: number;
    change: {
        dir: "up" | "down";
        pct: number;
    };
}

const getUnitBn = (unit: string) => {
    const units: Record<string, string> = {
        kg: "কেজি",
        gram: "গ্রাম",
        liter: "লিটার",
        ml: "মিলি",
        piece: "পিস",
        dozen: "ডজন",
        packet: "প্যাকেট",
        bag: "বস্তা",
    };

    return units[unit.toLowerCase()] || unit;
};

const Marque = async () => {
    const response = await fetch(
        "https://api.abcz.workers.dev/api/bazardor/products/",
        {
            next: {
                revalidate: 60,
            },
        }
    );

    if (!response.ok) {
        console.log("Failed to fetch products");
    }

    const data: Product[] = await response.json();

    return (
        <section className="w-full overflow-hidden border-y border-[#dce6df] bg-[#f8fdf9]">
            <Marquee
                speed={150}
                pauseOnHover
                gradient={false}
                autoFill
            >
                {data.map((item) => {
                    const isUp = item.change.dir === "up";

                    return (
                        <div
                            key={item.id}
                            className="
                                flex h-9 shrink-0 items-center
                                border-r border-[#e1e8e3]
                                px-3
                                xs:h-10 xs:px-4
                                sm:h-[42px] sm:px-5
                            "
                        >
                            {/* Icon */}
                            <span
                                className="
                                    mr-1.5 text-xs
                                    xs:mr-2 xs:text-sm
                                    sm:text-[15px]
                                "
                                aria-hidden="true"
                            >
                                {item.categoryIcon || item.image}
                            </span>

                            {/* Product Name */}
                            <span
                                className="
                                    whitespace-nowrap text-xs font-medium text-gray-700
                                    xs:text-[13px]
                                    sm:text-[14px]
                                "
                            >
                                {item.nameBn}
                            </span>

                            {/* Price */}
                            <span
                                className="
                                    ml-1.5 whitespace-nowrap text-xs text-gray-600
                                    xs:ml-2 xs:text-[13px]
                                    sm:text-[14px]
                                "
                            >
                                {item.today} টাকা/{getUnitBn(item.unit)}
                            </span>

                            {/* Change */}
                            <span
                                className={`
                                    ml-1.5 flex items-center gap-0.5 whitespace-nowrap
                                    text-[11px] font-semibold
                                    xs:ml-2 xs:gap-1 xs:text-xs
                                    sm:text-[13px]
                                    ${isUp ? "text-red-500" : "text-green-600"}
                                `}
                            >
                                <span aria-hidden="true">
                                    {isUp ? "▲" : "▼"}
                                </span>
                                <span>{item.change.pct}%</span>
                            </span>
                        </div>
                    );
                })}
            </Marquee>
        </section>
    );
};

export default Marque;