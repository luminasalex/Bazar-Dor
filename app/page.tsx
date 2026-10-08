import { Suspense } from "react";
import Category from "./src/component/Category";
import Hero from "./src/component/Hero";
import Marque from "./src/component/Marque";

export default function Home() {
  return (
    <div className="">
      <Suspense fallback={<div className="h-10 w-full animate-pulse bg-gray-100" />}>
        <Category />
      </Suspense>
      <Suspense fallback={<div className="h-[42px] w-full animate-pulse bg-[#f8fdf9]" />}>
        <Marque />
      </Suspense>
      <Hero />
    </div>
  );
}
