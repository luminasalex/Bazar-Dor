"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const Header = () => {
    const [currentDate, setCurrentDate] = useState("");

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
                </div>
            </div>
        </header>
    );
};

export default Header;