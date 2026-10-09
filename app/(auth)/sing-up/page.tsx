"use client";

import { useState } from "react";
import Link from "next/link";
import { signUp, signIn } from "@/app/lib/auth-client";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

        await signUp.email({
            email,
            password,
            name,
        }, {
            onError: (ctx) => {
                setError(ctx.error.message);
            },
            onSuccess: () => {
                window.location.href = "/";
            }
        });
    };

    const handleSocialSignup = async (provider: "google" | "github") => {
        await signIn.social({
            provider,
            callbackURL: "/"
        });
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-[#f0f5f0] px-4 py-8 text-[#26332a]">
            <div className="w-full max-w-[400px]">
                {/* Header */}
                <div className="mb-5 text-center">
                    <h1 className="text-2xl font-bold tracking-tight">
                        অ্যাকাউন্ট তৈরি করুন
                    </h1>

                    <p className="mt-1 text-xs text-[#7b857d]">
                        বিনামূল্যে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
                    </p>
                </div>

                {/* Signup Card */}
                <div className="rounded-xl border border-[#e1e9e1] bg-[#fafcf9] p-4 shadow-sm sm:p-5">
                    <form onSubmit={handleSubmit} className="space-y-3">
                        {/* Name */}
                        <div>
                            <label
                                htmlFor="name"
                                className="mb-1 block text-xs font-medium"
                            >
                                নাম
                            </label>

                            <input
                                id="name"
                                type="text"
                                placeholder="যেমন: রহিম উদ্দিন"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                autoComplete="name"
                                className="h-[38px] w-full rounded-md border border-[#e3eae3] bg-transparent px-3 text-xs outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-1 block text-xs font-medium"
                            >
                                ইমেইল
                            </label>

                            <input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoComplete="email"
                                className="h-[38px] w-full rounded-md border border-[#e3eae3] bg-transparent px-3 text-xs outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="mb-1 block text-xs font-medium"
                            >
                                পাসওয়ার্ড
                            </label>

                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="কমপক্ষে ৮ অক্ষর"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={8}
                                    autoComplete="new-password"
                                    className="h-[38px] w-full rounded-md border border-[#e3eae3] bg-transparent px-3 pr-14 text-xs outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-500 hover:text-green-700"
                                >
                                    {showPassword ? "লুকান" : "দেখুন"}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="mb-1 block text-xs font-medium"
                            >
                                পাসওয়ার্ড নিশ্চিত করুন
                            </label>

                            <div className="relative">
                                <input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="আবার লিখুন"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                    required
                                    autoComplete="new-password"
                                    className="h-[38px] w-full rounded-md border border-[#e3eae3] bg-transparent px-3 pr-14 text-xs outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(!showConfirmPassword)
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-500 hover:text-green-700"
                                >
                                    {showConfirmPassword ? "লুকান" : "দেখুন"}
                                </button>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <p
                                role="alert"
                                className="rounded-md bg-red-50 px-3 py-2 text-xs text-red-600"
                            >
                                {error}
                            </p>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="h-[38px] w-full rounded-md bg-[#07883e] text-xs font-semibold text-white shadow-[0_2px_3px_#0002] transition hover:bg-[#067334] active:scale-[0.99]"
                        >
                            অ্যাকাউন্ট তৈরি করুন
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="my-3 flex items-center gap-3">
                        <div className="h-px flex-1 bg-[#dfe6df]" />
                        <span className="text-[11px] text-gray-500">
                            অথবা
                        </span>
                        <div className="h-px flex-1 bg-[#dfe6df]" />
                    </div>

                    {/* Social Signup */}
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            type="button"
                            onClick={() => handleSocialSignup("google")}
                            className="flex h-[36px] items-center justify-center gap-1.5 rounded-md border border-[#e3eae3] text-[10px] font-medium transition hover:bg-[#f0f5f0] sm:text-[11px]"
                        >
                            <span className="text-sm font-bold text-[#4285F4]">
                                G
                            </span>
                            Google দিয়ে চালিয়ে যান
                        </button>

                        <button
                            type="button"
                            onClick={() => handleSocialSignup("github")}
                            className="flex h-[36px] items-center justify-center gap-1.5 rounded-md border border-[#e3eae3] text-[10px] font-medium transition hover:bg-[#f0f5f0] sm:text-[11px]"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                className="h-4 w-4 shrink-0"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.1c-3.1.68-3.76-1.32-3.76-1.32-.5-1.3-1.24-1.65-1.24-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 .1.77 2.1 3.16 1.6.1-.74.4-1.24.72-1.53-2.47-.28-5.07-1.24-5.07-5.5 0-1.22.44-2.22 1.16-3-.12-.28-.5-1.42.11-2.96 0 0 .95-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.1-1.45 3.05-1.15 3.05-1.15.61 1.54.23 2.68.11 2.96.72.78 1.16 1.78 1.16 3 0 4.27-2.6 5.22-5.08 5.5.4.35.76 1.02.76 2.06v3.07c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
                            </svg>
                            GitHub দিয়ে চালিয়ে যান
                        </button>
                    </div>

                    {/* Login Link */}
                    <p className="mt-4 text-center text-[11px]">
                        অ্যাকাউন্ট আছে?{" "}
                        <Link
                            href="/login"
                            className="font-semibold text-[#07883e] hover:underline"
                        >
                            সাইন ইন করুন
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
};

export default Signup;