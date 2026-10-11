const Loading = () => {
    return (
        <div className="w-full animate-pulse px-3 py-6 xs:px-4 sm:px-5 sm:py-8">
            <div className="mx-auto max-w-[1300px] space-y-10">

                {/* Hero Skeleton */}
                <div className="overflow-hidden rounded-2xl border border-[#dce6df] bg-white px-6 py-10 sm:px-10 sm:py-12 lg:flex lg:min-h-[340px] lg:items-center lg:gap-10 lg:px-12">
                    <div className="flex-1 space-y-4">
                        <div className="h-5 w-32 rounded-full bg-gray-200" />
                        <div className="h-9 w-3/4 rounded-lg bg-gray-200" />
                        <div className="h-9 w-1/2 rounded-lg bg-gray-200" />
                        <div className="mt-2 h-4 w-full max-w-md rounded bg-gray-100" />
                        <div className="h-4 w-5/6 rounded bg-gray-100" />
                        <div className="mt-4 h-10 w-36 rounded-lg bg-gray-200" />
                    </div>
                    <div className="mt-8 flex justify-center lg:mt-0 lg:shrink-0">
                        <div className="h-52 w-52 rounded-2xl bg-gray-200 sm:h-64 sm:w-64" />
                    </div>
                </div>

                {/* Section A — দাম বেড়েছে Skeleton */}
                <div>
                    <div className="mb-5 flex items-center gap-3">
                        <div className="h-9 w-9 rounded-lg bg-red-100" />
                        <div className="space-y-1.5">
                            <div className="h-5 w-40 rounded bg-gray-200" />
                            <div className="h-3 w-24 rounded bg-gray-100" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <ProductCardSkeleton key={i} />
                        ))}
                    </div>
                </div>

                {/* Section B — দাম কমেছে Skeleton */}
                <div>
                    <div className="mb-5 flex items-center gap-3">
                        <div className="h-9 w-9 rounded-lg bg-emerald-100" />
                        <div className="space-y-1.5">
                            <div className="h-5 w-40 rounded bg-gray-200" />
                            <div className="h-3 w-24 rounded bg-gray-100" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <ProductCardSkeleton key={i} />
                        ))}
                    </div>
                </div>

                {/* Section C — সব পণ্য Skeleton */}
                <div>
                    <div className="mb-5 space-y-2">
                        <div className="h-6 w-28 rounded bg-gray-200" />
                        <div className="h-3 w-40 rounded bg-gray-100" />
                    </div>
                    <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 9 }).map((_, i) => (
                            <ProductCardSkeleton key={i} />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

/* ── Single product card skeleton ── */
const ProductCardSkeleton = () => (
    <div className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4">
        {/* Emoji / Icon placeholder */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-2xl">
            <div className="h-7 w-7 rounded-full bg-gray-200" />
        </div>

        {/* Text block */}
        <div className="flex-1 space-y-2">
            <div className="h-4 w-3/4 rounded bg-gray-200" />
            <div className="h-3 w-1/2 rounded bg-gray-100" />
            {/* Price row */}
            <div className="flex items-center justify-between pt-1">
                <div className="h-4 w-24 rounded bg-gray-200" />
                <div className="h-5 w-14 rounded-full bg-gray-100" />
            </div>
        </div>
    </div>
);

export default Loading;
