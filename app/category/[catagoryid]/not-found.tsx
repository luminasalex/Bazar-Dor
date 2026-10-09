

export default function NotFound() {
    return (
        <section className="flex min-h-screen items-center justify-center bg-[#f0f5f0] px-4 py-10">
            <div className="w-full max-w-md rounded-3xl border border-[#dce6dc] bg-white/80 p-8 text-center shadow-sm backdrop-blur sm:p-10">

                {/* Icon */}
                <div className="mx-auto flex size-20 items-center justify-center rounded-2xl bg-[#edf5ed] text-5xl">
                    🥕
                </div>

                {/* 404 Badge */}
                <span className="mt-5 inline-block rounded-full bg-red-50 px-3 py-1 text-xs font-semibold tracking-wide text-red-600">
                    404 — পাওয়া যায়নি
                </span>

                {/* Title */}
                <h1 className="mt-3 text-2xl font-bold text-[#17251b] sm:text-3xl">
                    ক্যাটাগরি খুঁজে পাওয়া যায়নি
                </h1>

                {/* Description */}
                <p className="mt-3 text-sm leading-relaxed text-gray-500 sm:text-base">
                    আপনি যে ক্যাটাগরিটি খুঁজছেন সেটি হয়তো সরিয়ে ফেলা হয়েছে,
                    অথবা লিংকটি ভুল। অনুগ্রহ করে হোমপেজে ফিরে যান।
                </p>



                {/* Footer hint */}
                <p className="mt-6 text-xs text-gray-400">
                    সমস্যা থাকলে আমাদের সাথে যোগাযোগ করুন
                </p>
            </div>
        </section>
    );
}