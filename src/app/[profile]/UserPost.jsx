'use client'
import React from 'react'
import useFetch1 from '../Hooks/useFetch1';
import InfiniteScroll from 'react-infinite-scroll-component';

const UserPost = ({ email, name }) => {
    const [data, refetch] = useFetch1("mypost", email)
    console.log(data);

    const fetchMoreData = () => {
        console.log("hello");

    }

    return (
        <section className=''>
            {
                data == "l" ?
                    "loading"
                    :
                    <InfiniteScroll
                        dataLength={data?.length}
                        next={fetchMoreData}
                        // style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
                        // inverse={true} //
                        hasMore={true}
                        height={400}
                        loader={<h4>Loading...</h4>}
                        scrollableTarget="scrollableDiv"
                    >
                        {
                            data?.map((item, index) =>
                                <div key={index} className=''>
                                    <h1>{name}</h1>
                                    <h1>Place : {item?.name}</h1>
                                    <h1>location : {item?.location}</h1>
                                    <img className='h-72 w-full object-cover' src={item?.hostImages[0]} alt="" />
                                    <div>
                                        <h1>Likes ({item?.likes.length})</h1>
                                        <h1>Likes ({item?.comments.length})</h1>
                                    </div>
                                </div>
                            )
                        }
                    </InfiniteScroll>
            }
        </section>
    );
};




export default UserPost;