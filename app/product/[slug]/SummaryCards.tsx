interface Props {
    today: number;
    yesterday: number;
    changePct: number;
    isUp: boolean;
}

const toBn = (n: number) => n.toLocaleString("bn-BD");

export default function SummaryCards({
    today,
    yesterday,
    changePct,
    isUp,
}: Props) {
    return (
        <section>
            {/* Section title */}
            <h2 className="mb-3 text-sm font-bold text-[#111914] xs:text-base sm:text-lg">
                দামের সারসংক্ষেপ
            </h2>

            {/* Grid */}
            <div className="grid grid-cols-1 gap-3 xs:gap-3.5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
                {/* Today */}
                <div className="rounded-2xl border border-[#e8eee8] bg-white p-4 xs:p-5">
                    <p className="text-[11px] font-medium text-gray-500 xs:text-xs">
                        আজকের দাম
                    </p>
                    <p className="mt-1 flex items-baseline gap-1 text-xl font-extrabold text-[#111914] xs:text-2xl">
                        <span>{toBn(today)}</span>
                        <span className="text-xs font-medium text-gray-600">
                            টাকা
                        </span>
                    </p>
                    <p className="mt-1 text-[11px] text-gray-500 xs:text-xs">
                        আজকের বাজার দর
                    </p>
                </div>

                {/* Yesterday */}
                <div className="rounded-2xl border border-[#e8eee8] bg-white p-4 xs:p-5">
                    <p className="text-[11px] font-medium text-gray-500 xs:text-xs">
                        আগের দাম
                    </p>
                    <p className="mt-1 flex items-baseline gap-1 text-xl font-extrabold text-[#111914] xs:text-2xl">
                        <span>{toBn(yesterday)}</span>
                        <span className="text-xs font-medium text-gray-600">
                            টাকা
                        </span>
                    </p>
                    <p className="mt-1 text-[11px] text-gray-500 xs:text-xs">
                        গতকালের বাজার দর
                    </p>
                </div>

                {/* Change */}
                <div className="rounded-2xl border border-[#e8eee8] bg-white p-4 xs:p-5">
                    <p className="text-[11px] font-medium text-gray-500 xs:text-xs">
                        পরিবর্তন
                    </p>
                    <p
                        className={`
                            mt-1 flex items-baseline gap-1
                            text-xl font-extrabold xs:text-2xl
                            ${isUp ? "text-red-600" : "text-emerald-600"}
                        `}
                    >
                        <span aria-hidden="true">
                            {isUp ? "▲" : "▼"}
                        </span>
                        <span>{toBn(Math.abs(changePct))}%</span>
                    </p>
                    <p className="mt-1 text-[11px] text-gray-500 xs:text-xs">
                        {isUp ? "দাম বেড়েছে" : "দাম কমেছে"}
                    </p>
                </div>
            </div>
        </section>
    );
}