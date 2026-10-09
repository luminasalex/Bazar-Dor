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
            title={nameBn}
            className={`
                group flex shrink-0 items-center justify-center
                gap-1 px-2.5 py-1.5
                rounded-md
                text-[11px] font-medium leading-none
                transition-all duration-200
                xs:gap-1.5 xs:px-3 xs:py-1.5 xs:text-xs
                sm:gap-2 sm:px-3.5 sm:py-2 sm:text-sm
                md:gap-2 md:px-4 md:py-2.5
                lg:text-[15px]
                ${isActive
                    ? "bg-green-600 text-white shadow-sm shadow-green-600/20"
                    : "text-gray-700 hover:bg-green-100 hover:text-green-700 active:scale-[0.97] active:bg-green-200"
                }
            `}
        >
            <span
                className="
                    text-xs leading-none
                    transition-transform duration-200
                    group-hover:scale-110
                    xs:text-sm
                    sm:text-base
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