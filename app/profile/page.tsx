
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSession, authClient } from "@/app/lib/auth-client";
import { toast } from "react-toastify";

const ProfilePage = () => {
    const { data: session, isPending } = useSession();

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    // Set name from session
    useEffect(() => {
        setName(session?.user?.name ?? "");
    }, [session?.user?.name]);

    // Update profile
    const handleUpdate = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        const updatedName = name.trim();

        if (!updatedName) {
            toast.error("নাম লিখুন।");
            return;
        }

        setLoading(true);

        try {
            const { error } = await authClient.updateUser({
                name: updatedName,
            });

            if (error) {
                toast.error(
                    error.message || "প্রোফাইল আপডেট করতে সমস্যা হয়েছে।"
                );
                return;
            }

            toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
        } catch (error) {
            console.error("Update profile error:", error);
            toast.error("প্রোফাইল আপডেট করতে সমস্যা হয়েছে।");
        } finally {
            setLoading(false);
        }
    };

    // Sign out
    const handleSignOut = async () => {
        try {
            await authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        window.location.href = "/";
                    },
                    onError: () => {
                        toast.error("সাইন আউট করতে সমস্যা হয়েছে।");
                    },
                },
            });
        } catch (error) {
            console.error("Sign out error:", error);
            toast.error("সাইন আউট করতে সমস্যা হয়েছে।");
        }
    };

    if (isPending) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#f0f5f0] px-4 py-8 text-[#26332a]">
                <p>লোড হচ্ছে...</p>
            </main>
        );
    }

    if (!session?.user) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#f0f5f0] px-4 py-8 text-[#26332a]">
                <p>অনুগ্রহ করে লগইন করুন।</p>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#f0f5f0] px-4 py-8 text-[#26332a]">
            <div className="mx-auto w-full max-w-[440px]">
                <h1 className="text-xl font-bold">
                    আমার প্রোফাইল
                </h1>

                <p className="mb-5 mt-1 text-xs text-gray-500">
                    আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
                </p>

                {/* User information */}
                <div className="flex items-center justify-between gap-3 rounded-xl border border-[#e1e9e1] bg-[#fafcf9] p-4">
                    <div className="flex min-w-0 items-center gap-3">
                        {/* Profile image with default avatar */}
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#e1e9e1]">
                            {session.user.image ? (
                                <Image
                                    src={session.user.image}
                                    alt="Profile"
                                    width={48}
                                    height={48}
                                    unoptimized
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="h-8 w-8 text-[#07883e]"
                                    role="img"
                                    aria-label="Default profile"
                                >
                                    <path d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0 2c-4.42 0-8 2.24-8 5v2h16v-2c0-2.76-3.58-5-8-5Z" />
                                </svg>
                            )}
                        </div>

                        <div className="min-w-0">
                            <h2 className="truncate text-sm font-semibold">
                                {session.user.name || "ব্যবহারকারী"}
                            </h2>

                            <p className="truncate text-xs text-gray-500">
                                {session.user.email}
                            </p>
                        </div>
                    </div>

                    {/* Sign out */}
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
                    <h2 className="mb-5 text-sm font-semibold">
                        তথ্য
                    </h2>

                    <form
                        onSubmit={handleUpdate}
                        className="space-y-3"
                    >
                        <div>
                            <label
                                htmlFor="name"
                                className="mb-2 block text-xs"
                            >
                                নাম
                            </label>

                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                                placeholder="আপনার নাম লিখুন"
                                autoComplete="name"
                                required
                                className="h-9 w-full rounded-md border border-[#e1e9e1] bg-transparent px-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-600/10"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="h-9 w-full rounded-md bg-[#07883e] text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading
                                ? "আপডেট হচ্ছে..."
                                : "আপডেট"}
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default ProfilePage;
