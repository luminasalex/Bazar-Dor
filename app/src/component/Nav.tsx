const Nav = () => {
    return (
        <nav className="w-full bg-white">
            <div className="mx-auto flex h-[58px] max-w-[1300px] items-center justify-between px-5">

                {/* Left */}
                <p className="text-[13px] font-normal text-gray-600">
                    বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
                </p>

                {/* Right */}
                <p className="text-[13px] font-normal text-gray-600">
                    সকল দাম সম্ভাব্য; বাজার অবস্থার উপর নির্ভর করে পরিবর্তিত হয়।
                </p>

            </div>
        </nav>
    );
};

export default Nav;