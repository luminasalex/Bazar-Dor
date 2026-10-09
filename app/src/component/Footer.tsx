const Footer = () => {
    return (
        <footer className="w-full border-t border-gray-100 bg-white">
            <div
                className="
                    mx-auto flex max-w-[1300px] flex-col items-center justify-center
                    gap-1.5 px-4 py-4 text-center
                    xs:gap-2 xs:px-5 xs:py-5
                    md:min-h-[58px] md:flex-row md:items-center md:justify-between
                    md:gap-6 md:px-6 md:py-3
                    lg:px-8
                "
            >
                {/* Left */}
                <p
                    className="
                        text-[11px] font-normal leading-relaxed text-gray-600
                        xs:text-xs
                        sm:text-[13px]
                    "
                >
                    বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
                </p>

                {/* Right */}
                <p
                    className="
                        text-[11px] font-normal leading-relaxed text-gray-500
                        xs:text-xs
                        sm:text-[13px]
                        md:text-right
                    "
                >
                    সকল দাম সম্ভাব্য; বাজার অবস্থার উপর নির্ভর করে পরিবর্তিত হয়।
                </p>
            </div>
        </footer>
    );
};

export default Footer;