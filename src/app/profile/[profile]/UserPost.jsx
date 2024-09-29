'use client'
import useAxios, { AxiosSource } from '@/app/Hooks/useAxios';
import useFetch1 from '@/app/Hooks/useFetch1';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';

const UserPost = ({ email, name, image }) => {
    const axiosLink = useAxios(AxiosSource)
    const [length, setLength] = useState(0)
    const [limit, setLimit] = useState(2)
    const [data, setData] = useState([])
    const [more, setmore] = useState(true);

    if (email) {
        axiosLink.get(`/mypost?data=${email}`)
            .then(res => {
                setLength(res.data.length)
                setData(res.data)
            })
            .catch(err => {
                console.log(err);

            })
    }

    const fetchMoreData = () => {
        if (limit == length) {
            setmore(false)
            return
        }
        if (limit < length) {
            setLimit((e) => e + 1)
            setmore(true)
            return
        }
    }


    return (
        <section className=''>
            {
                data?.length > 0 ?
                    <InfiniteScroll
                        dataLength={limit}
                        next={fetchMoreData}
                        hasMore={more}
                        height={600}
                        loader={<h4>Loading...</h4>}
                        endMessage={
                            <p style={{ textAlign: "center" }}>
                                <b>Yay! You have seen it all</b>
                            </p>
                        }
                        className='space-y-7'
                        scrollableTarget="scrollableDiv"
                    >
                        {
                            data?.slice(0, limit).map((item, index) =>
                                <div key={index} className='space-y-1'>
                                    <div className='flex gap-2'>
                                        <img src={image} className='w-14 h-14 rounded-full object-cover object-top' alt="" />
                                        <div>
                                            <h1 className='text-xl my-auto font-bold'>{name}</h1>
                                            <h1>{
                                                moment(item?.date).fromNow()}
                                            </h1>
                                        </div>
                                    </div>
                                    <h1 className='text-lg font-semibold'>Place : {item?.name}</h1>
                                    <h1 className='text-lg font-semibold'>location : {item?.location}</h1>
                                    <img className='h-72 w-full object-cover rounded-xl' src={item?.hostImages[0]} alt="" />
                                    <div className='flex gap-5'>
                                        <h1>Likes ({item?.likes.length})</h1>
                                        <h1>Comments ({item?.comments.length})</h1>
                                    </div>
                                </div>
                            )
                        }
                    </InfiniteScroll>
                    :
                    <p className='text-center font-semibold text-lg'>There is no post yet...</p>
            }
        </section>
    );
};




export default UserPost;