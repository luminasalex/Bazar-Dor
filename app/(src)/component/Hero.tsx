
import Image from "next/image";
import heroImage from "../../../public/bazar-hero.png";

const Hero = () => {
    return (
        <section className="w-full bg-[#f3f8f4] px-5 py-6">
            <div className="mx-auto flex min-h-[390px] max-w-[1300px] items-center overflow-hidden rounded-[24px] border border-[#dce6df] bg-white px-4 py-10 sm:px-8 lg:px-4">

                {/* ================= CONTENT ================= */}
                <div className="w-full lg:w-[60%]">

                    {/* Date */}
                    <div className="mb-4 inline-flex rounded-full bg-[#e4f4e9] px-4 py-1.5">
                        <span className="text-sm font-medium text-[#008b45]">
                            বৃহস্পতিবার, ৮ অক্টোবর, ২০২৬
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="max-w-[600px] text-4xl font-bold leading-[1.15] tracking-tight text-[#111914] sm:text-5xl lg:text-[48px]">
                        আজকের বাজারের দাম এক নজরে
                    </h1>

                    {/* Description */}
                    <p className="mt-4 max-w-[620px] text-base leading-7 text-[#59635d] sm:text-[17px]">
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
                        বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং
                        দামের পরিবর্তন এক জায়গায়।
                    </p>

                    {/* Button */}
                    <button type="button" className="mt-6 rounded-md bg-[#008f46] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#007b3d] hover:shadow-md active:scale-95">
                        সব পণ্য দেখুন
                    </button>
                </div>

                {/* ================= IMAGE ================= */}
                <div className="hidden flex-1 items-center justify-center lg:flex">
                    <Image
                        src={heroImage}
                        alt="বাজারের পণ্য"
                        width={330}
                        height={330}
                        priority
                        className="h-[300px] w-[330px] object-contain"
                    />
                </div>

            </div>
        </section>
    );
};

export default Hero;