import { notFound } from "next/navigation";
import ProductHeroCard from "./ProductHeroCard";
import SummaryCards from "./SummaryCards";
import MarketPriceTable from "./MarketPriceTable";

interface Market {
    market: string;
    division: string;
    min: number;
    max: number;
}

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
    change: { dir: "up" | "down" | "flat"; pct: number };
    markets: Market[];
}

interface PageProps {
    params: Promise<{ slug: string }>;
}

// -------------------- helpers --------------------
const UNIT_BN: Record<string, string> = {
    kg: "কেজি",
    gram: "গ্রাম",
    liter: "লিটার",
    litre: "লিটার",
    ltr: "লিটার",
    ml: "মিলি",
    piece: "পিস",
    dozen: "ডজন",
    packet: "প্যাকেট",
    bag: "বস্তা",
};

const getUnitBn = (unit: string) =>
    UNIT_BN[unit?.toLowerCase()] || unit || "";

const toBn = (n: number) => n.toLocaleString("bn-BD");

// -------------------- data fetch --------------------
async function getProduct(slug: string): Promise<Product | null> {
    try {
        const res = await fetch(
            "https://api.abcz.workers.dev/api/bazardor/products/",
            { next: { revalidate: 60 } }
        );

        if (!res.ok) {
            // 404 → not found, 429 → too many requests, others → log
            if (res.status === 404) return null;
            console.error("API error:", res.status);
            return null;
        }

        const json = await res.json();

        // API may return array OR { products: [...] }
        const products: Product[] = Array.isArray(json)
            ? json
            : json?.products ?? [];

        return products.find((p) => p.slug === slug) ?? null;
    } catch (err) {
        console.error("Fetch failed:", err);
        return null;
    }
}

// -------------------- page --------------------
export default async function ProductPage({ params }: PageProps) {
    const { slug } = await params;
    const product = await getProduct(slug);

    if (!product) notFound();

    const unitBn = getUnitBn(product.unit);

    return (
        <section className="min-h-screen bg-[#f3f8f4] px-3 py-5 xs:px-4 sm:px-5 sm:py-8">
            <div className="mx-auto max-w-[1300px] space-y-5 sm:space-y-6">

                {/* Breadcrumb */}
                <nav
                    aria-label="breadcrumb"
                    className="flex flex-wrap items-center gap-1.5 text-[11px] text-gray-500 xs:text-xs"
                >
                    <span>হোম</span>
                    <span className="text-gray-400">›</span>
                    <span>পণ্য</span>
                    <span className="text-gray-400">›</span>
                    <span className="font-medium text-[#111914]">
                        {product.nameBn}
                    </span>
                </nav>

                {/* Hero card */}
                <ProductHeroCard
                    icon={product.categoryIcon || product.image}
                    name={product.nameBn}
                    categoryNameBn={product.categoryNameBn}
                    unitBn={unitBn}
                    today={product.today}
                    changePct={product.change.pct}
                    isUp={product.change.dir === "up"}
                />

                {/* Summary cards */}
                <SummaryCards
                    today={product.today}
                    yesterday={product.yesterday}
                    changePct={product.change.pct}
                    isUp={product.change.dir === "up"}
                />

                {/* Market price table */}
                <MarketPriceTable
                    markets={product.markets ?? []}
                    unitBn={unitBn}
                />

            </div>
        </section>
    );
}