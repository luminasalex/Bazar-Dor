
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession, authClient } from "@/app/lib/auth-client";

const Header = () => {
    const [currentDate, setCurrentDate] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { data: session } = useSession();

    useEffect(() => {
        const formattedDate = new Intl.DateTimeFormat("bn-BD", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        }).format(new Date());

        setCurrentDate(formattedDate);
    }, []);

    return (
        <header className="w-full border-b border-gray-200 bg-white">
            <div
                className="
                    mx-auto flex max-w-[1300px] items-center justify-between
                    gap-2 px-3 py-2.5
                    xs:gap-3 xs:px-4 xs:py-3
                    sm:px-5 sm:py-3
                    md:min-h-[70px] md:gap-4 md:px-6 md:py-3
                    lg:px-8
                "
            >
                {/* LEFT: Logo and date */}
                <div className="flex min-w-0 items-center gap-2 xs:gap-3">
                    <Link href="/" aria-label="বাজার দর — হোম">
                        <div
                            className="
                                flex size-9 shrink-0 items-center justify-center
                                rounded-lg bg-green-600 transition-transform
                                duration-200 hover:scale-105 active:scale-95
                                xs:size-10 xs:rounded-xl sm:size-11 md:size-12
                            "
                        >
                            <span className="text-base text-white xs:text-lg md:text-xl">
                                🛒
                            </span>
                        </div>
                    </Link>

                    <div className="min-w-0 leading-none">
                        <Link href="/">
                            <h1
                                className="
                                    truncate text-base font-bold leading-tight text-gray-900
                                    xs:text-lg sm:text-[20px] md:text-[22px]
                                "
                            >
                                বাজার দর
                            </h1>

                            <p className="mt-1 truncate text-[10px] font-medium text-gray-500 xs:text-[11px] sm:text-xs">
                                {currentDate}
                            </p>
                        </Link>
                    </div>
                </div>

                {/* RIGHT: Authentication */}
                <div className="flex shrink-0 items-center gap-1.5 xs:gap-2">
                    {session?.user ? (
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setIsDropdownOpen((prev) => !prev)}
                                aria-expanded={isDropdownOpen}
                                aria-label="প্রোফাইল মেনু"
                                className="
                                    flex items-center gap-2 rounded-full border
                                    border-gray-200 bg-white p-1 pr-3 shadow-sm
                                    transition-all hover:bg-gray-50
                                    focus:outline-none focus:ring-2 focus:ring-green-500
                                "
                            >
                                {/* Profile image or default avatar */}
                                <div className="relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-green-100">
                                    {session.user.image ? (
                                        <Image
                                            src={session.user.image}
                                            alt="Profile"
                                            width={32}
                                            height={32}
                                            unoptimized
                                            className="size-8 rounded-full object-cover"
                                        />
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            role="img"
                                            aria-label="Default profile image"
                                            className="size-6 text-green-700"
                                        >
                                            <path d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0 2c-4.42 0-8 2.24-8 5v2h16v-2c0-2.76-3.58-5-8-5Z" />
                                        </svg>
                                    )}
                                </div>

                                <span className="hidden max-w-32 truncate text-sm font-medium text-gray-700 sm:block">
                                    {session.user.name || "ব্যবহারকারী"}
                                </span>

                                <svg
                                    className="size-4 text-gray-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="m19 9-7 7-7-7"
                                    />
                                </svg>
                            </button>

                            {/* Dropdown menu */}
                            {isDropdownOpen && (
                                <>
                                    <button
                                        type="button"
                                        aria-label="মেনু বন্ধ করুন"
                                        className="fixed inset-0 z-40 cursor-default"
                                        onClick={() => setIsDropdownOpen(false)}
                                    />

                                    <div className="absolute right-0 z-50 mt-2 w-64 rounded-xl border border-gray-100 bg-white p-2 shadow-lg ring-1 ring-black/5">
                                        <div className="border-b border-gray-100 px-3 py-3">
                                            <p className="truncate text-sm font-semibold text-gray-900">
                                                {session.user.name || "ব্যবহারকারী"}
                                            </p>

                                            <p className="truncate text-xs text-gray-500">
                                                {session.user.email}
                                            </p>
                                        </div>

                                        <div className="mt-2 space-y-1">
                                            <Link
                                                href="/profile"
                                                onClick={() => setIsDropdownOpen(false)}
                                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                            >
                                                <svg
                                                    className="size-4 text-gray-500"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                    aria-hidden="true"
                                                >
                                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.03 0-4.43-.82-6.14-2.88a7.973 7.973 0 0 1 12.28 0C16.43 19.18 14.03 20 12 20z" />
                                                </svg>
                                                আমার প্রোফাইল
                                            </Link>

                                            <button
                                                type="button"
                                                onClick={async () => {
                                                    try {
                                                        await authClient.signOut({
                                                            fetchOptions: {
                                                                onSuccess: () => {
                                                                    window.location.href = "/";
                                                                },
                                                            },
                                                        });
                                                    } finally {
                                                        setIsDropdownOpen(false);
                                                    }
                                                }}
                                                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                                            >
                                                <svg
                                                    className="size-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M17 16l4-4m0 0-4-4m4 4H7m6 4v1a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1"
                                                    />
                                                </svg>
                                                সাইন আউট
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    ) : (
                        <>
                            {/* Sign up */}
                            <Link
                                href="/sing-up"
                                className="
                                    rounded-md border border-transparent bg-white
                                    px-2.5 py-1.5 text-xs font-medium text-gray-700
                                    transition-all duration-200 hover:border-gray-300
                                    hover:bg-gray-50 hover:text-gray-900 active:scale-95
                                    xs:px-3 xs:py-2 xs:text-[13px] sm:px-4 sm:text-sm
                                "
                            >
                                সাইন আপ
                            </Link>

                            {/* Sign in */}
                            <Link
                                href="/login"
                                className="
                                    rounded-md bg-green-600 px-2.5 py-1.5
                                    text-xs font-medium text-white transition-all
                                    duration-200 hover:bg-green-700 hover:shadow-md
                                    active:scale-95 xs:px-3 xs:py-2
                                    xs:text-[13px] sm:px-4 sm:text-sm
                                "
                            >
                                সাইন ইন
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
