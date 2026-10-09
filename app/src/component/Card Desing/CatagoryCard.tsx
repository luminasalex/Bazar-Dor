interface CatagoryCardProps {
    icon: string;
    name: string;
    unit: string;
    price: number;
    change: number;
}

const CatagoryCard = ({ icon, name, unit, price, change }: CatagoryCardProps) => {
    const isUp = change > 0;

    return (
        <article className="group rounded-2xl border border-[#dce5dc] bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg hover:shadow-green-900/5 sm:p-5">

            {/* Product Info */}
            <div className="mb-4 flex items-center gap-3">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-[#eff5ef] text-2xl group-hover:bg-green-50">
                    {icon}
                </div>
                <div>
                    <h2 className="text-base font-bold text-[#19251b] sm:text-lg">{name}</h2>
                    <p className="text-sm text-gray-500">{unit}</p>
                </div>
            </div>

            {/* Price + Change */}
            <div className="flex items-end justify-between">
                <div>
                    <p className="mb-1 text-xs text-gray-500">আজকের দাম</p>
                    <p className="text-xl font-extrabold text-[#17251b] sm:text-2xl">
                        {price.toLocaleString("bn-BD")}
                        <span className="ml-1 text-sm font-medium">টাকা</span>
                    </p>
                </div>

                <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 text-xs font-semibold ${isUp ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"}`}>
                    {isUp ? "▲" : "▼"} {Math.abs(change).toFixed(1)}%
                </span>
            </div>
        </article>
    );
};

export default CatagoryCard;
