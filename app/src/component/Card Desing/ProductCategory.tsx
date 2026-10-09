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
            aria-current={isActive ? "page" : undefined}
            className={`
                group flex shrink-0 items-center justify-center gap-1.5
                rounded-md px-2.5 py-1.5
                text-xs font-medium
                transition-all duration-200
                xs:gap-2 xs:px-3 xs:py-2 xs:text-sm
                md:gap-2.5 md:px-3.5 md:py-2.5
                lg:px-4 lg:py-2.5 lg:text-[15px]
                ${isActive
                    ? "bg-green-600 text-white shadow-sm shadow-green-600/20"
                    : "text-gray-700 hover:bg-green-100 hover:text-green-700 active:bg-green-200"
                }
            `}
        >
            <span
                className="
                    text-sm leading-none
                    transition-transform duration-200
                    group-hover:scale-110
                    xs:text-base
                    md:text-lg
                "
                aria-hidden="true"
            >
                {icon}
            </span>

            <span className="whitespace-nowrap">
                {nameBn}
            </span>
        </Link>
    );
};

export default ProductCategory;