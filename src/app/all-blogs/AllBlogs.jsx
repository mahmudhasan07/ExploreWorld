"use client"
import React, { useState } from 'react';
import useFetch1 from '../Hooks/useFetch1';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const AllBlogs = () => {

    const [data] = useFetch1("blogs")
    const [hoveredIndex, setHoveredIndex] = useState()
    const route = useRouter()
    // console.log(data);
    return (
        <section  className='grid lg:grid-cols-4 mx-2'>
            {
                data == "l"?
                "loading"
                :
                data?.map((item, idx) => (
                    <div
                    // href={`/${idx}`}
                      key={idx}
                      className="relative p-2 h-full w-full cursor-pointer  rounded-2xl"
                      onMouseEnter={() => setHoveredIndex(idx)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <AnimatePresence>
                        {hoveredIndex === idx && (
                          <motion.span
                            className="absolute inset-0 h-full w-full bg-[#ed84ba] block  rounded-2xl"
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
                      <div onClick={()=>route.push(`/all-blogs/${item._id}`)} className={hoveredIndex === idx ? "text-white z-50 relative border-2 p-2 rounded-2xl " : "text-black p-2 z-50 relative rounded-2xl border-gray-300 border-2"}>
                        <img src={item?.hostImages[0]} className='h-72 object-cover w-full' alt="" />
                        <h1 className={'text-2xl '}> <b>Name:</b> {item?.name}</h1>
                        <h1 className={'text-2xl '}> <b>Location:</b> {item?.location}</h1>

                        
                      </div>
                    </div>
                  ))
            }
        </section>
    );
};

export default AllBlogs;