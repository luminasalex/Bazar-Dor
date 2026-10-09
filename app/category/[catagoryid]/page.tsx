import { notFound } from "next/navigation";
import Link from "next/link";
import CatagoryCard from "@/app/src/component/Card Desing/CatagoryCard";
import SortDropdown from "@/app/category/[catagoryid]/SortDropdown";

export const instant = false;

// ---------- Unit map (English → Bengali) ----------
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

const getUnitBn = (unit: string) => {
    if (!unit) return "";
    return UNIT_BN[unit.toLowerCase()] || unit;
};

interface Product {
    id: number;
    nameBn: string;
    unit: string;
    categoryIcon: string;
    today: number;
    change: {
        dir: string;
        pct: number;
    };
}

interface Category {
    id: string;
    slug: string;
    nameBn: string;
    icon: string;
}

interface CategoryResponse {
    category: Category;
    products: Product[];
}

interface CategoryPageProps {
    params: Promise<{
        catagoryid: string;
    }>;
    searchParams: Promise<{
        sort?: string;
    }>;
}

// ---------- Sort helpers ----------
type SortKey = "default" | "price-asc" | "price-desc";

const sortProducts = (products: Product[], sort: SortKey) => {
    const copy = [...products];
    switch (sort) {
        case "price-asc":
            return copy.sort((a, b) => a.today - b.today);
        case "price-desc":
            return copy.sort((a, b) => b.today - a.today);
        case "default":
        default:
            return copy;
    }
};

const CategoryPage = async ({ params, searchParams }: CategoryPageProps) => {
    const { catagoryid } = await params;
    const { sort: rawSort } = await searchParams;

    const sort: SortKey =
        rawSort === "price-asc" || rawSort === "price-desc" ? rawSort : "default";

    let data: CategoryResponse | null = null;

    try {
        const response = await fetch(
            `https://api.abcz.workers.dev/api/bazardor/categories/${catagoryid}`,
            { next: { revalidate: 60 } }
        );

        if (!response.ok) {
            if (response.status === 404) notFound();
            throw new Error(`API error: ${response.status}`);
        }

        const json = await response.json();

        if (json.products && json.category) {
            data = json;
        } else {
            const productsRes = await fetch(
                `https://api.abcz.workers.dev/api/bazardor/products?category=${catagoryid}`,
                { next: { revalidate: 60 } }
            );

            const productsJson = productsRes.ok ? await productsRes.json() : [];

            data = {
                category: json,
                products: Array.isArray(productsJson)
                    ? productsJson
                    : productsJson.products ?? [],
            };
        }
    } catch (err) {
        console.error("Fetch failed:", err);
        notFound();
    }

    if (!data) notFound();

    const { category, products } = data;
    const sortedProducts = sortProducts(products, sort);

    return (
        <section className="min-h-screen bg-[#f0f5f0] px-4 py-8">
            <div className="mx-auto max-w-6xl">
                {/* Header */}
                <div className="mb-7 flex items-center gap-4 rounded-2xl border border-[#dce6dc] bg-white/80 p-5 sm:p-7">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#edf5ed] text-3xl">
                        {category.icon}
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-[#17251b] sm:text-2xl">
                            {category.nameBn}
                        </h1>
                        <p className="mt-1 text-sm text-gray-500 sm:text-base">
                            {products.length.toLocaleString("bn-BD")}টি পণ্যের আজকের দাম ও পরিবর্তন
                        </p>
                    </div>
                </div>

                {products.length === 0 ? (
                    <p className="py-10 text-center text-gray-500">
                        কোনো পণ্য পাওয়া যায়নি।
                    </p>
                ) : (
                    <>
                        {/* Sort bar */}
                        <div className="mb-5 flex items-center justify-end gap-3">
                            <span className="text-sm font-medium text-gray-600">
                                সাজান
                            </span>
                            <SortDropdown current={sort} />
                        </div>

                        {/* Product grid */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {sortedProducts.map((product) => (
                                <CatagoryCard
                                    key={product.id}
                                    icon={product.categoryIcon}
                                    name={product.nameBn}
                                    unit={`প্রতি ${getUnitBn(product.unit)}`}
                                    price={product.today}
                                    change={product.change.pct}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default CategoryPage;