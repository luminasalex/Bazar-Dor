
"use client";

import { useState, useEffect } from "react";
import { useSession, authClient } from "@/app/lib/auth-client";
import { toast } from "react-toastify";

const ProfilePage = () => {
    const { data: session, isPending } = useSession();
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (session?.user?.name) {
            setName(session.user.name);
        }
    }, [session]);

    // Update profile
    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!name) return;
        setLoading(true);

        try {
            await authClient.updateUser({
                name: name,
            });
            toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
        } catch (error) {
            toast.error("প্রোফাইল আপডেট করতে সমস্যা হয়েছে।");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Sign out
    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    window.location.href = "/";
                },
            },
        });
    };

    if (isPending) {
        return (
            <main className="min-h-screen bg-[#f0f5f0] px-4 py-8 text-[#26332a] flex items-center justify-center">
                <p>লোড হচ্ছে...</p>
            </main>
        );
    }

    if (!session) {
        // If not logged in, you might want to redirect, but for now we just show a message.
        return (
            <main className="min-h-screen bg-[#f0f5f0] px-4 py-8 text-[#26332a] flex items-center justify-center">
                <p>অনুগ্রহ করে লগইন করুন।</p>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#f0f5f0] px-4 py-8 text-[#26332a]">
            <div className="mx-auto w-full max-w-[440px]">
                {/* Page heading */}
                <h1 className="text-xl font-bold">আমার প্রোফাইল</h1>
                <p className="mt-1 mb-5 text-xs text-gray-500">
                    আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
                </p>

                {/* User information */}
                <div className="flex items-center justify-between gap-3 rounded-xl border border-[#e1e9e1] bg-[#fafcf9] p-4">
                    <div className="flex min-w-0 items-center gap-3">
                        {/* Profile image */}
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#e1e9e1]">
                            {session.user.image ? (
                                <img
                                    src={session.user.image}
                                    alt="Profile"
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <svg
                                    viewBox="0 0 24 24"
                                    className="h-8 w-8 text-gray-500"
                                    fill="currentColor"
                                    aria-label="Profile"
                                >
                                    <path d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0 2c-4.42 0-8 2.24-8 5v2h16v-2c0-2.76-3.58-5-8-5Z" />
                                </svg>
                            )}
                        </div>

                        <div className="min-w-0">
                            <h2 className="truncate text-sm font-semibold">
                                {session.user.name}
                            </h2>
                            <p className="truncate text-xs text-gray-500">
                                {session.user.email}
                            </p>
                        </div>
                    </div>

                    {/* Sign out button */}
                    <button
                        type="button"
                        onClick={handleSignOut}
                        className="shrink-0 rounded-md border border-red-300 px-3 py-2 text-xs font-medium text-red-500 transition hover:bg-red-50"
                    >
                        <span className="mr-1">↪</span>
                        সাইন আউট
                    </button>
                </div>

                {/* Profile form */}
                <div className="mt-4 rounded-xl border border-[#e1e9e1] bg-[#fafcf9] p-5">
                    <h2 className="mb-5 text-sm font-semibold">তথ্য</h2>
                    <form onSubmit={handleUpdate} className="space-y-3">
                        {/* Name input */}
                        <div>
                            <label htmlFor="name" className="mb-2 block text-xs">
                                নাম
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="আপনার নাম লিখুন"
                                required
                                className="h-9 w-full rounded-md border border-[#e1e9e1] bg-transparent px-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-600/10"
                            />
                        </div>

                        {/* Update button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="h-9 w-full rounded-md bg-[#07883e] text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 disabled:opacity-60"
                        >
                            {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default ProfilePage;
