'use client'
import React, { useContext, useState } from 'react';
import "./NavBar.css"
import { ContextSource } from '@/app/ContextAPI/ContextAPI';
import { usePathname, useRouter } from 'next/navigation';
import useAuth from '@/app/auth/useAuth';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

const NavBar = () => {
    const { user, setloader, setUser } = useContext(ContextSource)
    const navigate = useRouter()
    const routePath = usePathname()
    const [hidden, setHidden] = useState("hidden")
    const [hoveredIndex, setHoveredIndex] = useState(null)
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
            name: "About Us",
            path: "about-us"
        },

    ]
    const handleLogOut = () => {
        const userDetails = useAuth.getCurrentUser()
        userDetails.signOut()
        setloader(true)
        setUser('')
        navigate.push('/')
    }
    return (
        <section className="poetsen-one-regular text-white flex justify-around border-b-2 border-black p-2 bg-[#65248e]">
            <div>
                <Link href={'/'}><img src='https://i.ibb.co/f9g36Zz/exploresphere-high-resolution-logo-transparent-1.png' className='w-fit h-16 object-cover'></img></Link>
            </div>
            <div className=" my-auto">
                <ul className={`flex text-xl`}>
                    {/* framer motion animation a gap dele card section kaj kore na */}
                    {
                        routes.map((e, idx) => <Link key={idx} href={`/${e.path}`} onMouseEnter={() => setHoveredIndex(idx)} onMouseLeave={() => setHoveredIndex(null)} className={routePath == `/${e.path}` ? `underline relative ` : `relative`}>

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
                                <li className="">{e.name}</li>
                            </div>
                        </Link>)
                    }
                </ul>
            </div>
            <div className="my-auto">
                {
                    user?.email ?
                        <div className="flex gap-3 relative">
                            <img onClick={()=> hidden =="hidden"? setHidden("flex") : setHidden("hidden")} src={user?.picture} className="w-12 h-12 rounded-full object-cover object-top cursor-pointer" alt="" />
                            <Link href={'/'}><button onClick={handleLogOut} id="button" className=" mt-1 text-base font-semibold">LogOut</button></Link>
                            <div  className={`flex flex-col text-center absolute top-14 z-50 -ml-12 bg-[#a047df] text-white p-2 rounded-xl text-lg ${hidden}`}>
                                <Link onClick={()=> setHidden("hidden")} className="hover:bg-[#ef5fa9] rounded-lg px-1" href={'/my-blogs'}>My Blogs</Link>
                                <Link onClick={()=> setHidden("hidden")} className="hover:bg-[#ef5fa9] rounded-lg px-1" href={'/my-blogs'}>Favorite Blogs</Link>
                            </div>
                        </div>
                        :
                        <Link href={'/auth'}><button id="button" className=" text-xl font-semibold">Login</button></Link>
                }
            </div>
        </section>
    );
};

export default NavBar;