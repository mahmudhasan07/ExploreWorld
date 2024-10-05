import Banner from "./components/banner/Banner";
import Lifestyle from "./components/lifestyle/Lifestyle";
import Support from "./components/Contact/Support";
import TopReview from "./components/TopReview/TopReview";

export const metadata = {
  title: "ExploreSphere Travel",
  description: "Explore the world with ExploreSphere Travel",
  openGraph: {
    images: [{
      url: 'https://res.cloudinary.com/daudgshta/image/upload/v1728155408/exploreworld_zxxy0k.png'
    }]
  },
  icons: {
    icon: "https://i.ibb.co/f9g36Zz/exploresphere-high-resolution-logo-transparent-1.png"
  },


}

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
