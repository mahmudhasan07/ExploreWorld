'use client'
import Image from "next/image";
import Link from "next/link";
import "./navbar.css";
import { useContext, useState } from "react";
import { ContextSource } from "./ContextAPI/ContextAPI";
import useAuth from "./auth/useAuth";
// import { useRouter } from "next/router";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
// import { useRouter } from "next/router";

export default function NavBar() {
    const { user, setloader } = useContext(ContextSource)
    const navigate = useRouter()
    const routePath = usePathname()
    const [hoveredIndex, setHoveredIndex] = useState(null)
    const [hidden, sethidden] = useState("hidden");
    // const  router = useRouter()
    // console.log(user);

    // const activeRoute = ({path})=> path == "/" ? "underline" : "";

    const routes = [
        {
            name: "Home",
            path: ""
        },
        {
            name: "All Blogs",
            path: "all-blogs"
        },
        {
            name: "Add Blogs",
            path: "add-blog"
        },
        {
            name: "My Blogs",
            path: "my-blogs"
        },

    ]

    const handleLogOut = () => {
        const userDetails = useAuth.getCurrentUser()
        userDetails.signOut()
        setloader(true)
        navigate.push('/')
    }
    return (
        <section className="poetsen-one-regular text-white flex justify-around border-b-2 border-black bg-[#65248e]">
            <div>
                <Link href={'/'}><Image src={'https://i.ibb.co/f9g36Zz/exploresphere-high-resolution-logo-transparent-1.png'} width={200} height={10} className=" my-2 "></Image></Link>
            </div>
            <div className=" my-auto">
                <ul className={`flex text-xl`}>  
                {/* framer motion animation a gap dele card section kaj kore na */}
                    {/* <Link className={path == "/" ? "underline" : "" } href={'/'}>
                        <li >Home</li>
                    </Link>
                    <Link className={({ isActive, isPending })=> isPending? "" : isActive? "underline" : ""} href={'/all-blogs'}>
                        <li>All Blogs</li>
                    </Link>
                    <Link className={({ isActive, isPending })=> isPending? "" : isActive? "underline" : ""} href={'/add-blog'}>
                        <li>Add Blog</li>
                    </Link>
                    <Link className={({ isActive, isPending })=> isPending? "" : isActive? "underline" : ""} href={'/my-blogs'}>
                        <li>My Blog</li>
                    </Link>  */}
                    {
                        routes.map((e, idx) => <Link  key={idx} href={`/${e.path}`} onMouseEnter={()=> setHoveredIndex(idx)} onMouseLeave={()=> setHoveredIndex(null)} className={routePath == `/${e.path}` ? `underline relative ` : `relative` }>
                            
                            <AnimatePresence>
                                {hoveredIndex === idx && (
                                    <motion.span
                                        className="absolute inset-0 h-full w-full bg-[#e92f8f] block  rounded-3xl"
                                        layoutId="hoverBackground"
                                        initial={{ opacity: 0 }}
                                        animate={{
                                            opacity: 1,
                                            transition: { duration: 0.15 },
                                        }}
                                        exit={{
                                            opacity: 0,
                                            transition: { duration: 0.15, delay: 0.2 },
                                        }}
                                    />
                                )}
                            </AnimatePresence>
                            <div className="relative mx-2 my-1  z-50" key={idx}>
                            <li  className="">{e.name}</li>
                            {/* <p  id="link_id">hello</p> */}
                            </div>
                            </Link>)
                    }
                </ul>
            </div>
            <div className="my-auto">
                {
                    user?.email ?
                        <div className="flex gap-3">
                            <img src={user?.picture} className="w-12 h-12 rounded-full object-cover object-top" alt="" />
                            <Link href={'/'}><button onClick={handleLogOut} id="button" className=" mt-1 text-base font-semibold">LogOut</button></Link>
                        </div>
                        :
                        <Link href={'/auth'}><button id="button" className=" text-xl font-semibold">Login</button></Link>
                }
            </div>
        </section>
    );
}