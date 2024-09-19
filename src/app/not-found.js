'use client'
import Lottie from "lottie-react";
import notFound from "../../public/404.json";
export default function Page() {
    return (
        <div className="text-center relative my-24 ">
            <h1 id="title" className="text-5xl mb-5">
                404 Not Found 
            </h1>
            <Lottie className="w-[450px] mx-auto" animationData={notFound}></Lottie>
        </div>
    );
}