import ProductCategory from "./ProductCategory";


interface Category {
    id: number;
    slug: string;
    nameBn: string;
    icon: string;
}

const Category = async () => {
    const response = await fetch(
        "https://api.api-store.workers.dev/api/bazardor/categories",
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

    return (
        <section className="w-full border-b border-gray-100 bg-white">
            <div className="mx-auto flex max-w-[1300px] items-start justify-start gap-1 px-5">
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