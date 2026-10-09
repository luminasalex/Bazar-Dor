import { notFound } from "next/navigation";
import CatagoryCard from "@/app/src/component/Card Desing/CatagoryCard";

export const instant = false;

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
    icon: string;
    nameBn: string;
}

interface CategoryResponse {
    category: Category;
    products: Product[];
}

interface CategoryPageProps {
    params: Promise<{
        catagoryid: string;
    }>;
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
    const { catagoryid } = await params;

    let data: CategoryResponse | null = null;

    try {
        const response = await fetch(
            `https://api.abcz.workers.dev/api/bazardor/categories/${catagoryid}`,
            {
                next: { revalidate: 60 },
            }
        );

        if (!response.ok) {
            // 404 হলে not-found page দেখাবে
            if (response.status === 404) {
                notFound();
            }
            // অন্য error হলে throw
            throw new Error(`API error: ${response.status}`);
        }

        data = await response.json();
    } catch (err) {
        console.error("Fetch failed:", err);
        notFound(); // অথবা একটা friendly error UI দেখান
    }

    if (!data) {
        notFound();
    }

    const { category, products } = data;

    return (
        <section className="min-h-screen bg-[#f0f5f0] px-4 py-8">
            <div className="mx-auto max-w-6xl">
                <div className="mb-7 flex items-center gap-4 rounded-2xl border border-[#dce6dc] bg-white/80 p-5 sm:p-7">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#edf5ed] text-3xl">
                        {category.icon}
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-[#17251b] sm:text-2xl">
                            {category.nameBn}
                        </h1>
                        <p className="mt-1 text-sm text-gray-500 sm:text-base">
                            {products.length}টি পণ্যের আজকের দাম ও পরিবর্তন
                        </p>
                    </div>
                </div>

                {products.length === 0 ? (
                    <p className="py-10 text-center text-gray-500">
                        কোনো পণ্য পাওয়া যায়নি।
                    </p>
                ) : (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {products.map((product) => (
                            <CatagoryCard
                                key={product.id}
                                icon={product.categoryIcon}
                                name={product.nameBn}
                                unit={`প্রতি ${product.unit}`}
                                price={product.today}
                                change={product.change.pct}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default CategoryPage;