"use client"
import Image from "next/image";
import { useState, useEffect } from "react";
import heroImage from "../../../public/bazar-hero.png";

const Hero = () => {
    const [todayBn, setTodayBn] = useState("");

    useEffect(() => {
        const formatted = new Intl.DateTimeFormat('bn-BD', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(new Date());
        setTodayBn(formatted);
    }, []);

    return (
        <section className="w-full bg-[#f3f8f4] px-3 py-4 xs:px-4 xs:py-5 sm:px-5 sm:py-6">
            <div
                className="
                    mx-auto flex max-w-[1300px] flex-col items-center
                    gap-6 overflow-hidden rounded-2xl
                    border border-[#dce6df] bg-white
                    px-4 py-8
                    xs:rounded-[20px] xs:px-5 xs:py-10
                    sm:gap-8 sm:rounded-[24px] sm:px-8 sm:py-12
                    lg:min-h-[390px] lg:flex-row lg:gap-8 lg:rounded-[24px] lg:px-12 lg:py-10
                "
            >
                {/* ================= CONTENT ================= */}
                <div className="w-full lg:w-[60%]">
                    {/* Date */}
                    <div
                        className="
                            mb-3 inline-flex rounded-full bg-[#e4f4e9]
                            px-3 py-1
                            xs:mb-4 xs:px-4 xs:py-1.5
                        "
                    >
                        <span
                            suppressHydrationWarning
                            className="
                                text-[11px] font-medium text-[#008b45]
                                xs:text-xs
                                sm:text-sm
                            "
                        >
                            {todayBn || "\u00A0"}
                        </span>
                    </div>

                    {/* Title */}
                    <h1
                        className="
                            max-w-[600px]
                            text-2xl font-bold leading-[1.2] tracking-tight text-[#111914]
                            xs:text-3xl
                            sm:text-4xl sm:leading-[1.15]
                            md:text-[40px]
                            lg:text-[48px]
                        "
                    >
                        আজকের বাজারের দাম এক নজরে
                    </h1>

                    {/* Description */}
                    <p
                        className="
                            mt-3 max-w-[620px] text-sm leading-6 text-[#59635d]
                            xs:mt-4 xs:text-[15px] xs:leading-7
                            sm:text-base sm:text-[17px]
                        "
                    >
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
                        বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং
                        দামের পরিবর্তন এক জায়গায়।
                    </p>

                    {/* Button */}
                    <button
                        onClick={() => window.scrollTo({ top: 2100, behavior: "smooth" })}
                        type="button"
                        className="
                            mt-5 rounded-md bg-[#008f46]
                            px-4 py-2 text-xs font-semibold text-white
                            shadow-sm transition-all duration-200
                            hover:bg-[#007b3d] hover:shadow-md
                            active:scale-95
                            xs:mt-6 xs:px-5 xs:py-2.5 xs:text-sm
                            sm:text-sm
                        "
                    >
                        সব পণ্য দেখুন
                    </button>
                </div>

                {/* ================= IMAGE ================= */}
                <div className="flex w-full flex-1 items-center justify-center lg:w-auto">
                    <Image
                        src={heroImage}
                        alt="বাজারের পণ্য"
                        width={330}
                        height={330}
                        priority
                        className="
                            h-auto w-[200px] object-contain
                            xs:w-[240px]
                            sm:w-[280px]
                            md:w-[320px]
                            lg:h-[300px] lg:w-[330px]
                        "
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;