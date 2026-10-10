
import Link from "next/link";

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

interface Market {
    name: string;
    area: string;
    min: number;
    max: number;
    avg: number;
}

interface ProductDetailsCardProps {
    product: Product;
}

const markets: Market[] = [
    { name: "মাঠ বাজার", area: "ময়মনসিংহ", min: 131, max: 146, avg: 139 },
    { name: "সদর বাজার", area: "রাজশাহী", min: 134, max: 148, avg: 141 },
    { name: "বাজারঘাট", area: "খুলনা", min: 134, max: 151, avg: 142.5 },
    { name: "বাসাবাড়ি বাজার", area: "রাজশাহী", min: 135, max: 152, avg: 143.5 },
    { name: "চৌর বাজার", area: "ময়মনসিংহ", min: 135, max: 155, avg: 145 },
    { name: "আনন্দলী বাজার", area: "চট্টগ্রাম", min: 138, max: 155, avg: 146.5 },
    { name: "ডেভেলপটি বাজার", area: "খুলনা", min: 138, max: 154, avg: 146 },
    { name: "চোরাবাল বাজার", area: "সিলেট", min: 141, max: 158, avg: 149.5 },
    { name: "গ্রীন মার্কেট, মিরপুর", area: "ঢাকা", min: 140, max: 159, avg: 151 },
    { name: "চৌসেন বাজার", area: "চট্টগ্রাম", min: 142, max: 163, avg: 152.5 },
    { name: "আমবাজার", area: "সিলেট", min: 143, max: 165, avg: 154 },
    { name: "কারওয়ান বাজার", area: "ঢাকা", min: 146, max: 165, avg: 155.5 },
    { name: "নতুন বাজার", area: "ঢাকা", min: 143, max: 162, avg: 152.5 },
];

const UNIT_BN: Record<string, string> = {
    kg: "কেজি",
    gram: "গ্রাম",
    liter: "লিটার",
    litre: "লিটার",
    ltr: "লিটার",
    ml: "মিলি",
    piece: "পিস",
    dozen: "ডজন",
    packet: "প্যাকেট",
    bag: "বস্তা",
};

const getUnitBn = (unit: string) => {
    if (!unit) return "কেজি";
    return UNIT_BN[unit.toLowerCase()] || unit;
};

const taka = (price: number) =>
    price.toLocaleString("bn-BD", {
        maximumFractionDigits: 2,
    });

const ProductDetailsCard = ({
    product,
}: ProductDetailsCardProps) => {
    const lowest = Math.min(...markets.map((market) => market.min));
    const highest = Math.max(...markets.map((market) => market.max));

    const average =
        markets.reduce((sum, market) => sum + market.avg, 0) /
        markets.length;

    return (
        <main className="min-h-screen bg-[#f0f5f0] px-4 py-4 text-[#26332a] sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-[1200px]">

                {/* Breadcrumb */}
                <nav className="mb-5 flex items-center gap-2 text-[11px] text-gray-600">
                    <Link href="/" className="hover:text-green-700">
                        হোম
                    </Link>
                    <span>›</span>
                    <Link href="/" className="hover:text-green-700">
                        চাল
                    </Link>
                    <span>›</span>
                    <span>{product.nameBn}</span>
                </nav>

                {/* Product information */}
                <section className="flex flex-col sm:flex-row items-center justify-between gap-5 rounded-2xl border border-[#dce6df] bg-[#fafcf9] p-5 sm:p-8 lg:p-10">
                    <div className="flex w-full min-w-0 items-center gap-4 sm:gap-6">
                        <div className="flex h-16 w-16 sm:h-24 sm:w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#eef4ed]">
                            <span className="text-4xl sm:text-5xl">
                                {product.image || product.categoryIcon || "🍚"}
                            </span>
                        </div>

                        <div className="min-w-0 flex-1">
                            <h1 className="text-2xl font-extrabold sm:text-3xl lg:text-4xl">
                                {product.nameBn}
                            </h1>

                            <p className="mt-1 text-sm text-gray-500 sm:mt-2 sm:text-base">
                                প্রতি {getUnitBn(product.unit || "")} ·{" "}
                                {product.categoryNameBn || "চাল"}
                            </p>

                            <p className="mt-2 text-xs sm:text-sm text-gray-600">
                                সারাদেশের বাজারদর
                                {product.change && (
                                    <span>
                                        {" "}আজ{" "}
                                        {product.change.dir === "up"
                                            ? "দাম বেড়েছে "
                                            : product.change.dir === "down"
                                                ? "দাম কমেছে "
                                                : "দাম পরিবর্তন "}
                                        <span className="font-semibold">{taka(product.change.pct)}%</span>
                                    </span>
                                )}
                            </p>
                        </div>
                    </div>

                    {/* Current price */}
                    <div className="w-full shrink-0 rounded-2xl bg-[#f0f5f0] px-5 py-5 text-center sm:w-auto sm:min-w-[160px] sm:px-6 sm:py-6">
                        <p className="text-xs font-medium text-gray-500 sm:text-sm">
                            আজকের দাম
                        </p>

                        <p className="mt-2 mb-1 text-3xl font-extrabold leading-none sm:text-4xl text-[#1a241d]">
                            {taka(product.today)}
                        </p>

                        <p className="text-xs text-gray-500 sm:text-sm">
                            টাকা / {getUnitBn(product.unit || "")}
                        </p>

                        {product.change && (
                            <p
                                className={`mt-2 text-xs font-bold sm:text-sm ${product.change.dir === "up"
                                        ? "text-red-500"
                                        : product.change.dir === "down"
                                            ? "text-green-700"
                                            : "text-gray-500"
                                    }`}
                            >
                                {product.change.dir === "up"
                                    ? "▲"
                                    : product.change.dir === "down"
                                        ? "▼"
                                        : "●"}{" "}
                                {taka(product.change.pct)}%
                            </p>
                        )}
                    </div>
                </section>

                {/* Price summary and market table */}
                <section className="mt-4 rounded-xl border border-[#dce6df] bg-[#fafcf9] p-4 sm:p-5">
                    <h2 className="mb-3 text-sm font-bold">
                        দামের সারসংক্ষেপ
                    </h2>

                    {/* Summary cards */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <div className="rounded-xl border border-[#dce6df] p-4">
                            <p className="text-[10px] text-gray-500">
                                সর্বনিম্ন দাম
                            </p>

                            <p className="mt-1 text-xl font-bold text-green-700">
                                {taka(lowest)}{" "}
                                <span className="text-xs font-normal">টাকা</span>
                            </p>

                            <p className="text-[10px] text-gray-500">
                                সবচেয়ে কম দামের বাজার
                            </p>
                        </div>

                        <div className="rounded-xl border border-[#dce6df] p-4">
                            <p className="text-[10px] text-gray-500">
                                সর্বোচ্চ দাম
                            </p>

                            <p className="mt-1 text-xl font-bold text-red-500">
                                {taka(highest)}{" "}
                                <span className="text-xs font-normal">টাকা</span>
                            </p>

                            <p className="text-[10px] text-gray-500">
                                সবচেয়ে বেশি দামের বাজার
                            </p>
                        </div>

                        <div className="rounded-xl border border-[#dce6df] p-4">
                            <p className="text-[10px] text-gray-500">
                                গড় দাম
                            </p>

                            <p className="mt-1 text-xl font-bold text-green-700">
                                {taka(average)}{" "}
                                <span className="text-xs font-normal">টাকা</span>
                            </p>

                            <p className="text-[10px] text-gray-500">
                                প্রতি {getUnitBn(product.unit || "")}-এর গড়
                            </p>
                        </div>
                    </div>

                    {/* Market table */}
                    <div className="mt-5">
                        <h2 className="mb-3 text-sm font-bold">
                            বাজারভিত্তিক আজকের দাম
                        </h2>

                        <div className="overflow-x-auto rounded-xl border border-[#dce6df]">
                            <table className="w-full min-w-[620px] border-collapse text-[11px]">
                                <thead>
                                    <tr className="bg-[#fafcf9] text-gray-500">
                                        <th className="px-3 py-3 text-left font-medium">
                                            বাজার
                                        </th>
                                        <th className="px-3 py-3 text-left font-medium">
                                            বিভাগ
                                        </th>
                                        <th className="px-3 py-3 text-right font-medium">
                                            সর্বনিম্ন
                                        </th>
                                        <th className="px-3 py-3 text-right font-medium">
                                            সর্বোচ্চ
                                        </th>
                                        <th className="px-3 py-3 text-right font-medium">
                                            গড়
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {markets.map((market, index) => (
                                        <tr
                                            key={market.name}
                                            className={`border-t border-[#e6ece6] ${index % 2 === 0
                                                    ? "bg-[#fafcf9]"
                                                    : "bg-[#f0f5f0]"
                                                }`}
                                        >
                                            <td className="whitespace-nowrap px-3 py-[9px] font-medium">
                                                {market.name}
                                            </td>

                                            <td className="whitespace-nowrap px-3 py-[9px] text-gray-600">
                                                {market.area}
                                            </td>

                                            <td className="whitespace-nowrap px-3 py-[9px] text-right font-medium">
                                                {taka(market.min)} টাকা
                                            </td>

                                            <td className="whitespace-nowrap px-3 py-[9px] text-right font-medium">
                                                {taka(market.max)} টাকা
                                            </td>

                                            <td className="whitespace-nowrap px-3 py-[9px] text-right font-medium">
                                                {taka(market.avg)} টাকা
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <div className="mt-5 flex items-center gap-2 pb-4 text-[11px] font-medium">
                    <span>{product.categoryIcon || "🍚"}</span>
                    <span>{product.nameBn}</span>
                </div>
            </div>
        </main>
    );
};

export default ProductDetailsCard;
