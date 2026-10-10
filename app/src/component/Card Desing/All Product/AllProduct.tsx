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

// ---------- Unit map (English → Bengali) ----------
const UNIT_BN: Record<string, string> = {
    kg: "কেজি",
    gram: "গ্রাম",
    liter: "লিটার",
    litre: "লিটার",     // alternative spelling
    ltr: "লিটার",       // short form
    ml: "মিলি",
    piece: "পিস",
    dozen: "ডজন",
    packet: "প্যাকেট",
    bag: "বস্তা",
};

const getUnitBn = (unit: string) => {
    if (!unit) return "";
    return UNIT_BN[unit.toLowerCase()] || unit;
};

const AllProduct = async () => {
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
        // fetch failed silently
    }

    if (products.length === 0) return null;

    return (
        <section className="w-full px-3 py-6 xs:px-4 sm:px-5 sm:py-8">
            <div className="mx-auto max-w-[1300px]">

                {/* Header */}
                <div className="mb-5 flex flex-col gap-2 sm:mb-6">
                    <h2 className="text-base font-bold text-[#111914] xs:text-lg sm:text-xl">
                        সব পণ্য
                    </h2>

                    <p className="text-[11px] text-gray-500 xs:text-xs">
                        {products.length}টি পণ্যের আজকের দাম ও পরিবর্তন
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 gap-3 xs:gap-3.5 sm:grid-cols-1 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => (
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
        </section>
    );
};

export default AllProduct;