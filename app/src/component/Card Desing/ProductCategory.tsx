
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface ProductCategoryProps {
    id: number;
    slug: string;
    nameBn: string;
    icon: string;
}

const ProductCategory = ({ slug, nameBn, icon }: ProductCategoryProps) => {
    const pathname = usePathname();

    const isActive = pathname === `/category/${slug}`;

    return (
        <Link
            href={`/category/${slug}`}
            className={`flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 ${isActive
                ? "bg-green-600 text-white"
                : "text-gray-700 hover:bg-green-100 hover:text-green-700"
                }`}
        >
            <span className="text-base leading-none">
                {icon}
            </span>

            <span className="whitespace-nowrap">
                {nameBn}
            </span>
        </Link>
    );
};

export default ProductCategory;

