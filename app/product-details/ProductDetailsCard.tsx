
import Link from "next/link";

interface Product {
    nameBn: string;
    categoryNameBn: string;
    image: string;
    today: number;
    unit: string;
    change: {
        dir: "up" | "down" | "flat";
        pct: number;
    };
    markets: {
        market: string;
        division: string;
        min: number;
        max: number;
    }[];
}

interface ProductDetailsCardProps {
    product: Product;
}

const taka = (price: number) =>
    Number.isInteger(price) ? price.toLocaleString("bn-BD") : price.toLocaleString("bn-BD", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

const ProductDetailsCard = ({ product }: ProductDetailsCardProps) => {
    // Add avg to each market
    const markets = (product.markets || []).map(m => ({
        ...m,
        avg: (m.min + m.max) / 2
    }));

    const lowest = markets.length > 0 ? Math.min(...markets.map((market) => market.min)) : 0;
    const highest = markets.length > 0 ? Math.max(...markets.map((market) => market.max)) : 0;
    const average = markets.length > 0 ? Math.round(
        (markets.reduce((sum, market) => sum + market.avg, 0) /
            markets.length) * 100
    ) / 100 : 0;

    const isUp = product.change?.dir === "up";
    const isFlat = product.change?.dir === "flat" || !product.change;
    const changeColor = isUp ? "text-red-500" : isFlat ? "text-gray-500" : "text-emerald-500";
    const changeSign = isUp ? "▲" : isFlat ? "-" : "▼";
    const pct = product.change?.pct || 0;

    return (
        <section className="min-h-screen px-4 py-4 text-[#26332a] sm:px-6 lg:px-8">

            <div className="mx-auto w-full max-w-[1200px]">

                {/* Breadcrumb */}
                <nav className="mb-5 flex items-center gap-2 text-[11px] text-gray-600">
                    <Link href="/" className="hover:text-green-700">
                        হোম
                    </Link>
                    <span>›</span>
                    <Link href="/" className="hover:text-green-700">
                        {product.categoryNameBn}
                    </Link>
                    <span>›</span>
                    <span className="text-[#26332a]">
                        {product.nameBn}
                    </span>
                </nav>

                {/* Product header */}
                <section className="flex items-center justify-between gap-4 rounded-xl border border-[#dce6df] bg-[#fafcf9] p-4 sm:p-5">

                    <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-xl bg-[#eef4ed] text-3xl">
                            {product.image}
                        </div>

                        <div className="min-w-0">
                            <h1 className="text-xl font-bold sm:text-2xl">
                                {product.nameBn}
                            </h1>

                            <p className="text-xs text-gray-500">
                                প্রতি {product.unit === 'kg' ? 'কেজি' : product.unit === 'hali' ? 'হালি' : product.unit === 'liter' ? 'লিটার' : product.unit} · {product.categoryNameBn}
                            </p>

                            <p className="mt-1 text-[11px] text-gray-600">
                                সারাদেশের তুলনায় আজ দাম {isUp ? 'বেড়েছে' : isFlat ? 'অপরিবর্তিত আছে' : 'কমেছে'} {isFlat ? '' : `${pct}%`}
                            </p>
                        </div>
                    </div>

                    {/* Current price */}
                    <div className="shrink-0 rounded-xl bg-[#f0f5f0] px-3 py-3 text-center sm:min-w-[100px]">
                        <p className="text-[10px] text-gray-500">
                            আজকের দাম
                        </p>

                        <p className="text-2xl font-bold leading-7">
                            {taka(product.today)}
                        </p>

                        <p className="text-[10px] text-gray-500">
                            টাকা / {product.unit === 'kg' ? 'কেজি' : product.unit === 'hali' ? 'হালি' : product.unit === 'liter' ? 'লিটার' : product.unit}
                        </p>

                        <p className={`mt-1 text-[10px] font-medium ${changeColor}`}>
                            {changeSign} {pct}%
                        </p>
                    </div>
                </section>

                {/* Price summary and table */}
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
                                প্রতি {product.unit === 'kg' ? 'কেজি' : product.unit === 'hali' ? 'হালি' : product.unit === 'liter' ? 'লিটার' : product.unit}র গড় হিসেবে
                            </p>
                        </div>
                    </div>

                    {/* Market price table */}
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
                                            key={market.market}
                                            className={`border-t border-[#e6ece6] ${index % 2 === 0
                                                    ? "bg-[#fafcf9]"
                                                    : "bg-[#f0f5f0]"
                                                }`}
                                        >
                                            <td className="whitespace-nowrap px-3 py-[9px] font-medium">
                                                {market.market}
                                            </td>

                                            <td className="whitespace-nowrap px-3 py-[9px] text-gray-600">
                                                {market.division}
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
                    <span>{product.image}</span>
                    <span>{product.nameBn}</span>
                </div>
            </div>
        </section>
    );
};

export default ProductDetailsCard;
