import ProductDetailsCard from "../ProductDetailsCard";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    const res = await fetch(`https://api.abcz.workers.dev/api/bazardor/products`, { next: { revalidate: 3600 } });
    if (!res.ok) return { title: "Product Not Found | Bazar Dor" };

    const data = await res.json();
    const product = data.find((p: any) => p.slug === slug);
    if (!product) return { title: "Product Not Found | Bazar Dor" };

    return {
        title: `${product.nameBn} - Bazar Dor`,
        description: `Check the daily market price for ${product.nameBn} in Bangladesh.`
    };
}

export default async function Page({ params }: PageProps) {
    const { slug } = await params;

    const res = await fetch(`https://api.abcz.workers.dev/api/bazardor/products`, { next: { revalidate: 3600 } });
    if (!res.ok) {
        return notFound();
    }

    const data = await res.json();
    const product = data.find((p: any) => p.slug === slug);

    if (!product) {
        return notFound();
    }

    return (
        <div>
            <ProductDetailsCard product={product} />
        </div>
    );
}

