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
            <div className="mx-auto flex h-[70px] max-w-[1300px] items-center justify-between px-5">

                {/* ================= LEFT ================= */}
                <div className="flex items-center gap-3">

                    {/* Logo */}

                    <Link href="/">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-600">
                            <span className="text-xl text-white">🛒</span>
                        </div>
                    </Link>

                    {/* Title */}
                    <div className="leading-none">
                        <Link href="/">
                            <h1 className="text-[20px] font-bold text-gray-900">
                                বাজার দর
                            </h1>

                            <p className="mt-1 text-[11px] font-medium text-gray-500">
                                {currentDate}
                            </p>
                        </Link>
                    </div>
                </div>

                {/* ================= RIGHT ================= */}

                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                        {/* Sign Up */}
                        <button
                            className="rounded-md border border-transparent bg-white px-4 py-2 font-medium text-gray-700 transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900 active:scale-95"
                        >
                            সাইন আপ
                        </button>

                        {/* Sign In */}
                        <button
                            className="rounded-md bg-green-600 px-4 py-2 font-medium text-white transition-all duration-200 hover:bg-green-700 hover:shadow-md active:scale-95"
                        >
                            সাইন ইন
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;