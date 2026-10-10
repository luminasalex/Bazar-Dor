"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession, authClient } from "@/app/lib/auth-client";

const Header = () => {
    const [currentDate, setCurrentDate] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { data: session } = useSession();

    useEffect(() => {
        const date = new Date();

        const formattedDate = date.toLocaleDateString("bn-BD", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        });

        // eslint-disable-next-line react-hooks/set-state-in-effect
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
                {/* ================= LEFT ================= */}
                <div className="flex min-w-0 items-center gap-2 xs:gap-3">
                    {/* Logo */}
                    <Link href="/" aria-label="বাজার দর — হোম">
                        <div
                            className="
                                flex size-9 shrink-0 items-center justify-center
                                rounded-lg bg-green-600
                                transition-transform duration-200
                                hover:scale-105 active:scale-95
                                xs:size-10 xs:rounded-xl
                                sm:size-11
                                md:size-12
                            "
                        >
                            <span className="text-base text-white xs:text-lg md:text-xl">
                                🛒
                            </span>
                        </div>
                    </Link>

                    {/* Title */}
                    <div className="min-w-0 leading-none">
                        <Link href="/">
                            <h1
                                className="
                                    truncate text-base font-bold leading-tight text-gray-900
                                    xs:text-lg
                                    sm:text-[20px]
                                    md:text-[22px]
                                "
                            >
                                বাজার দর
                            </h1>

                            <p
                                className="
                                    mt-0.5 truncate text-[10px] font-medium text-gray-500
                                    xs:mt-1 xs:text-[11px]
                                    sm:text-xs
                                "
                            >
                                {currentDate}
                            </p>
                        </Link>
                    </div>
                </div>

                {/* ================= RIGHT ================= */}
                <div className="flex shrink-0 items-center gap-1.5 xs:gap-2">
                    {session ? (
                        <div className="relative">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center gap-2 rounded-full border border-gray-200 bg-white p-1 pr-3 shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                <img
                                    src={session.user.image || "/default-avatar.png"} // fallback avatar
                                    alt="Profile"
                                    className="size-8 rounded-full object-cover"
                                />
                                <span className="text-sm font-medium text-gray-700 hidden sm:block">
                                    {session.user.name}
                                </span>
                                <svg className="size-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* Dropdown Menu */}
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-64 rounded-xl border border-gray-100 bg-white p-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                                    <div className="px-3 py-3 border-b border-gray-100">
                                        <p className="text-sm font-semibold text-gray-900">{session.user.name}</p>
                                        <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
                                    </div>
                                    <div className="mt-2 space-y-1">
                                        <Link
                                            href="/profile"
                                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            <svg className="size-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.03 0-4.43-.82-6.14-2.88a7.973 7.973 0 0112.28 0C16.43 19.18 14.03 20 12 20z" />
                                            </svg>
                                            আমার প্রোফাইল
                                        </Link>
                                        <button
                                            onClick={async () => {
                                                await authClient.signOut({
                                                    fetchOptions: {
                                                        onSuccess: () => {
                                                            window.location.href = "/";
                                                        },
                                                    },
                                                });
                                                setIsDropdownOpen(false);
                                            }}
                                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                                        >
                                            <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                            সাইন আউট
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            {/* Sign Up */}
                            <Link
                                href="/sing-up"
                                className="
                                    rounded-md border border-transparent bg-white
                                    px-2.5 py-1.5 text-xs font-medium text-gray-700
                                    transition-all duration-200
                                    hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900
                                    active:scale-95
                                    xs:px-3 xs:py-2 xs:text-[13px]
                                    sm:px-4 sm:text-sm
                                "
                            >
                                সাইন আপ
                            </Link>

                            {/* Sign In */}
                            <Link
                                href="/login"
                                className="
                                    rounded-md bg-green-600
                                    px-2.5 py-1.5 text-xs font-medium text-white
                                    transition-all duration-200
                                    hover:bg-green-700 hover:shadow-md
                                    active:scale-95
                                    xs:px-3 xs:py-2 xs:text-[13px]
                                    sm:px-4 sm:text-sm
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