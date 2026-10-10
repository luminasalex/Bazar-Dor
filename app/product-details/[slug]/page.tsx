
import { notFound } from "next/navigation";
import { connection } from "next/server";
import ProductDetailsCard from "../ProductDetailsCard";

interface Product {
    id: number;
    slug: string;
    nameBn: string;
    category?: string;
    categoryNameBn?: string;
    categoryIcon?: string;
    unit?: string;
    image?: string;
    today: number;
    yesterday?: number;
    lastWeek?: number;
    lastMonth?: number;
    change?: {
        dir: string;
        pct: number;
    };
}

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

async function getProducts(): Promise<Product[]> {
    const response = await fetch(
        "https://api.abcz.workers.dev/api/bazardor/products",
        {
            next: {
                revalidate: 3600,
            },
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }

    const data: unknown = await response.json();

    if (!Array.isArray(data)) {
        throw new Error("Invalid products API response");
    }

    return data as Product[];
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;

    try {
        const products = await getProducts();
        const product = products.find((item) => item.slug === slug);

        if (!product) {
            return {
                title: "Product Not Found | Bazar Dor",
            };
        }

        return {
            title: `${product.nameBn} | Bazar Dor`,
            description: `বাংলাদেশে ${product.nameBn}-এর বর্তমান বাজারদর দেখুন।`,
        };
    } catch {
        return {
            title: "Bazar Dor",
            description: "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের বাজারদর।",
        };
    }
}

export default async function Page({ params }: PageProps) {
    await connection();

    const { slug } = await params;

    let products: Product[];

    try {
        products = await getProducts();
    } catch {
        throw new Error("পণ্যের তথ্য লোড করা যায়নি।");
    }

    const product = products.find((item) => item.slug === slug);

    if (!product) {
        notFound();
    }

    return <ProductDetailsCard product={product} />;
}
