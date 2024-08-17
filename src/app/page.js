// "use client"
import Image from "next/image";
import Banner from "./components/banner/Banner";
import Lifestyle from "./components/lifestyle/Lifestyle";
import Support from "./components/Contact/Support";

export const metadata = {
  title: "ExploreSphere",
  description: "Explore world with lot of memories",
};


export default function Home() {
  
  
  return (
    <>
      <Banner></Banner>
      <Lifestyle></Lifestyle>
      <Support></Support>
    </>
  );
}
