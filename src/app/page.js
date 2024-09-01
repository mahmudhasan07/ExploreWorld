import Banner from "./components/banner/Banner";
import Lifestyle from "./components/lifestyle/Lifestyle";
import Support from "./components/Contact/Support";
import TopReview from "./components/TopReview/TopReview";

export const metadata = {
  title: "ExploreSphere",
  description: "Explore world with lot of memories",
};


export default function Home() {  
  return (
    <>
      <Banner></Banner>
      <Lifestyle></Lifestyle>
      <TopReview></TopReview>
      <Support></Support>
      
    </>
  );
}
