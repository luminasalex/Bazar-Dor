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
};

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
        "https://api.api-store.workers.dev/api/bazardor/products/",
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
                            className="flex h-[42px] shrink-0 items-center border-r border-[#e1e8e3] px-5"
                        >
                            {/* Icon */}
                            <span className="mr-2 text-[15px]">
                                {item.categoryIcon || item.image}
                            </span>

                            {/* Product Name */}
                            <span className="whitespace-nowrap text-[14px] font-medium text-gray-700">
                                {item.nameBn}
                            </span>

                            {/* Price */}
                            <span className="ml-2 whitespace-nowrap text-[14px] text-gray-600">
                                {item.today} টাকা/{getUnitBn(item.unit)}
                            </span>

                            {/* Change */}
                            <span
                                className={`ml-2 flex items-center gap-1 whitespace-nowrap text-[13px] font-semibold ${isUp
                                    ? "text-red-500"
                                    : "text-green-600"
                                    }`}
                            >
                                <span>
                                    {isUp ? "▲" : "▼"}
                                </span>

                                {item.change.pct}%
                            </span>
                        </div>
                    );
                })}
            </Marquee>
        </section>
    );
};

export default Marque;