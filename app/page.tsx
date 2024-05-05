import Footer from "@/components/footer/Footer";
import NaveBar from "@/components/header/NaveBar";
import Presetation from "@/components/presetation/Presetation";
import Image from "next/image";

export default function Home() {
   return (
      <>
         <NaveBar />
         <Presetation />
         <Footer />
      </>
   );
}
