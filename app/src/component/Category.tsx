import ProductCategory from "./Card Desing/ProductCategory";

interface Category {
    id: number;
    slug: string;
    nameBn: string;
    icon: string;
}

const Category = async () => {
    const response = await fetch(
        "https://api.abcz.workers.dev/api/bazardor/categories",
        {
            next: {
                revalidate: 60,
            },
        }
    );

    if (!response.ok) {
        console.log("Failed to fetch categories");
    }

    const data: Category[] = await response.json();

    if (!data || data.length === 0) {
        return null;
    }

    return (
        <section className="w-full border-b border-gray-100 bg-white">
            <div
                className="
                    mx-auto flex max-w-[1300px] items-center justify-start
                    gap-1 overflow-x-auto scroll-smooth
                    px-3 py-2
                    xs:gap-1.5 xs:px-4 xs:py-2.5
                    sm:gap-2 sm:px-5 sm:py-3
                    md:gap-2 md:px-6
                    lg:px-8
                    [-ms-overflow-style:none] [scrollbar-width:none]
                    [&::-webkit-scrollbar]:hidden
                "
            >
                {data.map((item) => (
                    <ProductCategory
                        key={item.id}
                        id={item.id}
                        slug={item.slug}
                        nameBn={item.nameBn}
                        icon={item.icon}
                    />
                ))}
            </div>
        </section>
    );
};

export default Category;