import Categories from "@/components/category/Categories";
import Footer from "@/components/footer/Footer";
import NaveBar from "@/components/header/NaveBar";
import PostSection from "@/components/post/PostSection";
import Presetation from "@/components/presetation/Presetation";
import Image from "next/image";

export default function Home() {
   return (
      <>
         <NaveBar />
         <Presetation />
         <Categories />
         <PostSection />
         <Footer />
      </>
   );
}
