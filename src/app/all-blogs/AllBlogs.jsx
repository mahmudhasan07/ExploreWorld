"use client"
import React, { useRef, useState } from 'react';
import useFetch1 from '../Hooks/useFetch1';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Loader from '../components/Loader/Loader';

const AllBlogs = () => {
  const [searchInput, setSearchInput] = useState("");
  const [data] = useFetch1("blogs", searchInput)
  const [hoveredIndex, setHoveredIndex] = useState()
  const route = useRouter()
  const inputRef = useRef()
  let timeOut
  const handleSearch = (e) => {
    clearTimeout(timeOut)
    e.preventDefault()
    const input = inputRef.current.value
    timeOut = setTimeout(() => {
      setSearchInput(input)
    }, 1500);
  }

  return (
    <section >
      <div className='text-center my-5'>
        <input ref={inputRef} onChange={handleSearch} type="text" placeholder='Enter any place name' className='border-2 border-black p-2 rounded-xl w-80' />
        <button id='button' className='text-white font-semibold ml-1 text-lg'>Search</button>
      </div>
      <div className=''>
        {
          data == "l" ?
            <Loader></Loader>
            :

            <div className='grid lg:grid-cols-4 mx-2'>
              {
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
                    <div onClick={() => route.push(`/all-blogs/${item._id}`)} className={hoveredIndex === idx ? "text-white z-50 relative border-2 p-2 rounded-2xl " : "text-black p-2 z-50 relative rounded-2xl border-gray-300 border-2"}>
                      <img src={item?.hostImages[0]} className='h-72 object-cover w-full' alt="" />
                      <h1 className={'text-xl '}> <b>Name:</b> {item?.name}</h1>
                      <h1 className={'text-xl '}> <b>Location:</b> {item?.location}</h1>
                    </div>
                  </div>
                ))
              }
            </div>
        }
      </div>
      <div>
        {
          data?.length == 0 ?
            <h1 className='text-2xl font-semibold text-center'>No blogs found</h1>
            :
            ""

        }
      </div>
    </section>
  );
};

export default AllBlogs;