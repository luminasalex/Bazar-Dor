import Link from "next/link";

interface ProductCategoryProps {
    id: number;
    slug: string;
    nameBn: string;
    icon: string;
}

const ProductCategory = ({
    slug,
    nameBn,
    icon,
}: ProductCategoryProps) => {
    return (
        <Link
            href={`/category/${slug}`}
            className="flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-[#f8fdf9] hover:text-green-700"
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