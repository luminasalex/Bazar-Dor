// app/category/[catagoryid]/loading.tsx
export default function Loading() {
    return (
        <section className="min-h-screen bg-[#f0f5f0] px-4 py-8">
            <div className="mx-auto max-w-6xl">

                {/* Header Skeleton */}
                <div className="mb-7 flex items-center gap-4 rounded-2xl border border-[#dce6dc] bg-white/80 p-5 sm:p-7">
                    <div className="size-12 shrink-0 animate-pulse rounded-xl bg-[#e2ebe2]" />

                    <div className="flex-1 space-y-2">
                        <div className="h-5 w-32 animate-pulse rounded-md bg-[#e2ebe2] sm:h-6 sm:w-44" />
                        <div className="h-3.5 w-48 animate-pulse rounded-md bg-[#e2ebe2] sm:h-4 sm:w-64" />
                    </div>
                </div>

                {/* Grid Skeleton */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <ProductCardSkeleton key={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ---------- Single Card Skeleton ---------- */
function ProductCardSkeleton() {
    return (
        <div className="rounded-2xl border border-[#dce6dc] bg-white/80 p-5 shadow-sm">
            {/* Top row: icon + name */}
            <div className="flex items-center gap-3">
                <div className="size-11 shrink-0 animate-pulse rounded-xl bg-[#e2ebe2]" />
                <div className="flex-1 space-y-2">
                    <div className="h-4 w-24 animate-pulse rounded-md bg-[#e2ebe2]" />
                    <div className="h-3 w-16 animate-pulse rounded-md bg-[#e2ebe2]" />
                </div>
            </div>

            {/* Price row */}
            <div className="mt-5 flex items-end justify-between">
                <div className="space-y-2">
                    <div className="h-3 w-12 animate-pulse rounded-md bg-[#e2ebe2]" />
                    <div className="h-6 w-20 animate-pulse rounded-md bg-[#e2ebe2]" />
                </div>

                <div className="h-6 w-14 animate-pulse rounded-full bg-[#e2ebe2]" />
            </div>
        </div>
    );
}