interface Market {
    market: string;
    division: string;
    min: number;
    max: number;
}

interface Props {
    markets: Market[];
    unitBn: string;
}

const toBn = (n: number) => n.toLocaleString("bn-BD");

export default function MarketPriceTable({ markets, unitBn }: Props) {
    if (!markets || markets.length === 0) return null;

    return (
        <section>
            <h2 className="mb-3 text-sm font-bold text-[#111914] xs:text-base sm:text-lg">
                বাজারভিত্তিক দামের তালিকা
            </h2>

            <div className="overflow-hidden rounded-2xl border border-[#e8eee8] bg-white">
                {/* Desktop / tablet table */}
                <div className="hidden overflow-x-auto sm:block">
                    <table className="w-full min-w-[640px] text-left text-sm">
                        <thead className="bg-[#f5f8f5] text-[11px] uppercase tracking-wide text-gray-500">
                            <tr>
                                <th className="px-4 py-3 font-medium">বাজার</th>
                                <th className="px-4 py-3 font-medium">বিভাগ</th>
                                <th className="px-4 py-3 font-medium">
                                    সর্বনিম্ন
                                </th>
                                <th className="px-4 py-3 font-medium">
                                    সর্বোচ্চ
                                </th>
                                <th className="px-4 py-3 font-medium">ইউনিট</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#eef3ee]">
                            {markets.map((m, i) => (
                                <tr
                                    key={`${m.market}-${i}`}
                                    className="transition-colors hover:bg-[#f9fcf9]"
                                >
                                    <td className="px-4 py-3 font-medium text-[#111914]">
                                        {m.market}
                                    </td>
                                    <td className="px-4 py-3 text-gray-600">
                                        {m.division}
                                    </td>
                                    <td className="px-4 py-3 text-gray-700">
                                        {toBn(m.min)} টাকা
                                    </td>
                                    <td className="px-4 py-3 text-gray-700">
                                        {toBn(m.max)} টাকা
                                    </td>
                                    <td className="px-4 py-3 text-gray-500">
                                        {unitBn}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile: card list */}
                <ul className="divide-y divide-[#eef3ee] sm:hidden">
                    {markets.map((m, i) => (
                        <li
                            key={`${m.market}-${i}`}
                            className="p-4"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-semibold text-[#111914]">
                                        {m.market}
                                    </p>
                                    <p className="mt-0.5 text-[11px] text-gray-500">
                                        {m.division}
                                    </p>
                                </div>
                                <div className="shrink-0 text-right">
                                    <p className="text-sm font-bold text-[#111914]">
                                        {toBn(m.min)}–{toBn(m.max)}
                                    </p>
                                    <p className="mt-0.5 text-[10px] text-gray-500">
                                        টাকা / {unitBn}
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}