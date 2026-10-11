
import AllProduct from "./src/component/Card Desing/All Product/AllProduct";
import Hero from "./src/component/Hero";
import UpDownDetails from "./src/component/UpDownDetails";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <UpDownDetails />
      <div id="all-products" className="scroll-mt-4">
        <AllProduct />
      </div>
    </div>
  );
}
