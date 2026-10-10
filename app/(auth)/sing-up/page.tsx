"use client";

import { useState } from "react";
import Link from "next/link";
import { signUp, signIn } from "@/app/lib/auth-client";

const Signup = () => {
    // Store form data
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Handle signup form
    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        if (password.length < 8) {
            setError("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
            return;
        }

        if (password !== confirmPassword) {
            setError("দুটি পাসওয়ার্ড মিলছে না।");
            return;
        }

        setLoading(true);

        try {
            await signUp.email(
                { name, email, password },
                {
                    onError: (ctx) => {
                        setError(ctx.error.message);
                        setLoading(false);
                    },
                    onSuccess: () => {
                        window.location.href = "/";
                    },
                }
            );
        } catch {
            setError("অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।");
            setLoading(false);
        }
    };

    // Handle Google and GitHub signup
    const handleSocialSignup = async (
        provider: "google" | "github"
    ) => {
        setError("");
        setLoading(true);

        try {
            await signIn.social({
                provider,
                callbackURL: "/",
            });
        } catch {
            setError("লগইন করা যায়নি। আবার চেষ্টা করুন।");
            setLoading(false);
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-[#f0f5f0] px-4 py-8 text-[#26332a]">

            {/* Keep everything in the center */}
            <div className="flex w-full max-w-[460px] flex-col items-center">

                {/* Page heading */}
                <h1 className="text-2xl font-bold tracking-tight">
                    অ্যাকাউন্ট তৈরি করুন
                </h1>

                <p className="mt-2 mb-7 text-center text-sm text-gray-500">
                    বিনামূল্যে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
                </p>

                {/* Signup card */}
                <div className="w-full rounded-2xl border border-[#e1e9e1] bg-[#fafcf9] p-6 sm:p-8">

                    <form onSubmit={handleSignup} className="space-y-5">

                        {/* Name input */}
                        <div>
                            <label
                                htmlFor="name"
                                className="mb-2 block text-sm font-medium"
                            >
                                নাম
                            </label>

                            <input
                                id="name"
                                type="text"
                                placeholder="যেমন: রহিম উদ্দিন"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                autoComplete="name"
                                required
                                className="h-11 w-full rounded-lg border border-[#e1e9e1] bg-transparent px-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-600/10"
                            />
                        </div>

                        {/* Email input */}
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-medium"
                            >
                                ইমেইল
                            </label>

                            <input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                                required
                                className="h-11 w-full rounded-lg border border-[#e1e9e1] bg-transparent px-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-600/10"
                            />
                        </div>

                        {/* Password input */}
                        <div>
                            <label
                                htmlFor="password"
                                className="mb-2 block text-sm font-medium"
                            >
                                পাসওয়ার্ড
                            </label>

                            <input
                                id="password"
                                type="password"
                                placeholder="কমপক্ষে ৮ অক্ষর"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="new-password"
                                minLength={8}
                                required
                                className="h-11 w-full rounded-lg border border-[#e1e9e1] bg-transparent px-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-600/10"
                            />
                        </div>

                        {/* Confirm password */}
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="mb-2 block text-sm font-medium"
                            >
                                পাসওয়ার্ড নিশ্চিত করুন
                            </label>

                            <input
                                id="confirmPassword"
                                type="password"
                                placeholder="আবার লিখুন"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                autoComplete="new-password"
                                required
                                className="h-11 w-full rounded-lg border border-[#e1e9e1] bg-transparent px-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-600/10"
                            />
                        </div>

                        {/* Error message */}
                        {error && (
                            <p
                                role="alert"
                                className="rounded-lg bg-red-50 p-3 text-sm text-red-600"
                            >
                                {error}
                            </p>
                        )}

                        {/* Signup button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="h-11 w-full rounded-lg bg-[#07883e] text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading
                                ? "অপেক্ষা করুন..."
                                : "অ্যাকাউন্ট তৈরি করুন"}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="my-6 flex items-center gap-4">
                        <hr className="flex-1 border-[#e1e9e1]" />

                        <span className="text-sm text-gray-500">
                            অথবা
                        </span>

                        <hr className="flex-1 border-[#e1e9e1]" />
                    </div>

                    {/* Google and GitHub buttons */}
                    <div className="grid grid-cols-2 gap-3">

                        {/* Google signup */}
                        <button
                            type="button"
                            disabled={loading}
                            onClick={() => handleSocialSignup("google")}
                            className="flex h-11 items-center justify-center gap-2 rounded-lg border border-[#e1e9e1] text-sm font-medium transition hover:bg-gray-100 disabled:opacity-50"
                        >
                            <svg
                                viewBox="0 0 48 48"
                                className="h-5 w-5 shrink-0"
                                aria-label="Google"
                            >
                                <path
                                    fill="#4285F4"
                                    d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5h6.6c3.9-3.6 6.1-8.8 6.1-14.9Z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M24 44c5.5 0 10.1-1.8 13.5-4.7l-6.6-5c-1.8 1.2-4.1 2-6.9 2-5.3 0-9.8-3.6-11.4-8.4H5.8v5.2A20 20 0 0 0 24 44Z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M12.6 27.9a12 12 0 0 1 0-7.8v-5.2H5.8a20 20 0 0 0 0 18.2l6.8-5.2Z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M24 11.7c3 0 5.7 1 7.8 3.1l5.8-5.8C34.1 5.8 29.5 4 24 4A20 20 0 0 0 5.8 14.9l6.8 5.2c1.6-4.8 6.1-8.4 11.4-8.4Z"
                                />
                            </svg>

                            Google
                        </button>

                        {/* GitHub signup */}
                        <button
                            type="button"
                            disabled={loading}
                            onClick={() => handleSocialSignup("github")}
                            className="flex h-11 items-center justify-center gap-2 rounded-lg border border-[#e1e9e1] text-sm font-medium transition hover:bg-gray-100 disabled:opacity-50"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                className="h-5 w-5 shrink-0"
                                fill="currentColor"
                                aria-label="GitHub"
                            >
                                <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.1c-3.1.68-3.76-1.32-3.76-1.32-.5-1.3-1.24-1.65-1.24-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 .1.77 2.1 3.16 1.6.1-.74.4-1.24.72-1.53-2.47-.28-5.07-1.24-5.07-5.5 0-1.22.44-2.22 1.16-3-.12-.28-.5-1.42.11-2.96 0 0 .95-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.1-1.45 3.05-1.15 3.05-1.15.61 1.54.23 2.68.11 2.96.72.78 1.16 1.78 1.16 3 0 4.27-2.6 5.22-5.08 5.5.4.35.76 1.02.76 2.06v3.07c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
                            </svg>

                            GitHub
                        </button>
                    </div>

                    {/* Login link */}
                    <p className="mt-6 text-center text-sm">
                        অ্যাকাউন্ট আছে?{" "}
                        <Link
                            href="/login"
                            className="font-semibold text-[#07883e] hover:underline"
                        >
                            সাইন ইন করুন
                        </Link>
                    </p>
                </div>

                {/* Back to home */}
                <Link
                    href="/"
                    className="mt-6 text-sm text-gray-500 transition hover:text-green-700"
                >
                    ← হোম পেজে ফিরে যান
                </Link>
            </div>
        </main>
    );
};

export default Signup;