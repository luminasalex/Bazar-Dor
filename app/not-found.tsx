import Link from "next/link";

export default function NotFound() {
    return (
        <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
            <div className="flex size-20 items-center justify-center rounded-2xl bg-green-50 text-4xl">
                🛒
            </div>

            <h1 className="mt-6 text-6xl font-bold text-gray-900">৪০৪</h1>

            <h2 className="mt-3 text-xl font-semibold text-gray-800">
                পেজটি পাওয়া যায়নি
            </h2>

            <p className="mt-2 max-w-sm text-sm text-gray-500">
                আপনি যে পেজটি খুঁজছেন সেটি সরানো হয়েছে, নাম পরিবর্তন হয়েছে, অথবা কখনও ছিল না।
            </p>

            <Link
                href="/"
                className="mt-8 rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 active:scale-95"
            >
                হোম পেজে ফিরে যান
            </Link>
        </main>
    );
}