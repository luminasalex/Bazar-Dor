import DetailsCard from "@/app/src/component/Card Desing/Todey's/DetailsCard";

interface Product {
    id: number;
    slug: string;
    nameBn: string;
    categoryIcon: string;
    image: string;
    unit: string;
    today: number;
    change: {
        dir: "up" | "down" | "flat";
        pct: number;
    };
}

interface ApiResponse {
    products: Product[];
}

const UNIT_BN: Record<string, string> = {
    kg: "কেজি",
    gram: "গ্রাম",
    liter: "লিটার",
    ml: "মিলি",
    piece: "পিস",
    dozen: "ডজন",
    packet: "প্যাকেট",
    bag: "বস্তা",
};

const getUnitBn = (unit: string) =>
    UNIT_BN[unit?.toLowerCase()] || unit || "";

const UpDownDetails = async () => {
    let products: Product[] = [];

    try {
        const res = await fetch(
            "https://api.abcz.workers.dev/api/bazardor/products",
            { next: { revalidate: 60 } }
        );
        if (res.ok) {
            const json: ApiResponse | Product[] = await res.json();
            products = Array.isArray(json)
                ? json
                : (json as ApiResponse).products ?? [];
        }
    } catch {
    }


    const risingTop6 = products
        .filter((p) => p.change.dir === "up" && p.change.pct > 0)
        .sort((a, b) => b.change.pct - a.change.pct)
        .slice(0, 6);


    const fallingTop6 = products
        .filter((p) => p.change.dir === "down" && p.change.pct < 0)
        .sort((a, b) => a.change.pct - b.change.pct)
        .slice(0, 6);

    if (risingTop6.length === 0 && fallingTop6.length === 0) return null;

    return (
        <section className="w-full bg-[#f3f8f4] px-3 py-6 xs:px-4 sm:px-5 sm:py-8">
            <div className="mx-auto max-w-[1300px] space-y-10">


                {risingTop6.length > 0 && (
                    <div>
                        <div className="mb-4 flex items-center gap-2.5 sm:mb-5">
                            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-red-50 text-sm font-bold text-red-500 xs:size-9 sm:size-10 sm:text-base">
                                ▲
                            </span>
                            <div>
                                <h2 className="text-base font-bold text-[#111914] xs:text-lg sm:text-xl">
                                    আজ দাম বেড়েছে
                                </h2>
                                <p className="text-[11px] text-gray-500 xs:text-xs">
                                    সর্বোচ্চ বৃদ্ধি পাওয়া {risingTop6.length}টি পণ্য
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-3 xs:gap-3.5 sm:grid-cols-1 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {risingTop6.map((product) => (
                                <DetailsCard
                                    key={product.id}
                                    icon={product.categoryIcon || product.image}
                                    name={product.nameBn}
                                    unit={`প্রতি ${getUnitBn(product.unit)}`}
                                    price={product.today}
                                    change={product.change.pct}
                                    slug={product.slug}
                                />
                            ))}
                        </div>
                    </div>
                )}


                {fallingTop6.length > 0 && (
                    <div>
                        <div className="mb-4 flex items-center gap-2.5 sm:mb-5">
                            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-sm font-bold text-emerald-600 xs:size-9 sm:size-10 sm:text-base">
                                ▼
                            </span>
                            <div>
                                <h2 className="text-base font-bold text-[#111914] xs:text-lg sm:text-xl">
                                    আজ দাম কমেছে
                                </h2>
                                <p className="text-[11px] text-gray-500 xs:text-xs">
                                    সর্বোচ্চ হ্রাস পাওয়া {fallingTop6.length}টি পণ্য
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-3 xs:gap-3.5 sm:grid-cols-1 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {fallingTop6.map((product) => (
                                <DetailsCard
                                    key={product.id}
                                    icon={product.categoryIcon || product.image}
                                    name={product.nameBn}
                                    unit={`প্রতি ${getUnitBn(product.unit)}`}
                                    price={product.today}
                                    change={product.change.pct}
                                    slug={product.slug}
                                />
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </section>
    );
};

export default UpDownDetails;