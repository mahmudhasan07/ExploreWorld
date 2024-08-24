'use client'
import useFetch2 from '@/app/Hooks/useFetch2';
import React, { useContext,  useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Keyboard, Mousewheel, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import './Card.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import useAxios, { AxiosSource } from '@/app/Hooks/useAxios';
import { ContextSource } from '@/app/ContextAPI/ContextAPI';

const CardDetails = ({ params }) => {
    const [like, setLike] = useState(false);
    const [data, refetch] = useFetch2("blogs", params?.card)
    const axiosLink = useAxios(AxiosSource)
    const { user } = useContext(ContextSource)
    const [ratting, setRatting] = useState();
    let likes = data?.likes
    // console.log(data);

    const commentInput = useRef()
    const rate = [1, 2, 3, 4, 5]

    const likesCount = setInterval(() => {
        const likeFilter = data?.likes?.find(e => e == user?.email)
        if (likeFilter) {
            setLike(true)
            console.log(like);
            clearInterval(likesCount)
        }

    }, 1000);


    const handleButton = () => {

        if (like == false) {
            likes.push(user?.email)
            // console.log(likes);
            axiosLink.patch(`/blogs/${params.card}`, { likes })
                .then(res => {
                    console.log(res);
                    refetch()
                    setLike(true)
                })
                .catch(err => {
                    console.log(err);


                })

        }
        if (like == true) {
            likes = data?.likes.filter(e => e != user?.email)
            axiosLink.patch(`/blogs/${params.card}`, { likes })
                .then(res => {
                    refetch()
                    setLike(false)


                })
                .catch(err => {
                    console.log(err);


                })

        }
    }

    console.log(like);


    const handleComment = () => {
        const text = commentInput.current.value
        const email = user?.email
        const comment = { text, email, ratting }
        console.log(comment);

        axiosLink.patch(`/blogs/${data?._id}`, comment)
            .then(res => {
                console.log(res);

            })
            .catch(err => {
                console.log(err);

            })
    }



    return (
        <section>
            {
                data == "l" ?
                    "loading"
                    :
                    <div id='mainDiv'>
                        <div className='flex justify-around '>
                            <div id='imgDiv' className='w-1/2'>
                                <Swiper
                                    // cssMode={true}
                                    navigation={true}
                                    pagination={true}
                                    mousewheel={true}
                                    keyboard={true}
                                    loop={true}
                                    modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                                    className="h-[550px]"
                                >
                                    {
                                        data?.hostImages?.map((e, idx) => <SwiperSlide key={idx}>
                                            <img className='mx-auto rounded-xl w-full object-cover h-[520px]' src={e} alt="" />
                                        </SwiperSlide>)
                                    }
                                </Swiper>
                            </div>
                            <div className=' w-1/3 mt-[5%] space-y-2 h-fit'>
                                <h1 id='card_title' className='text-4xl font-bold '>{data?.name}</h1>
                                <h1 id='card_title' className='text-2xl font-semibold'>Location : {data?.location}</h1>
                                <h1 className='text-xl font-bold'>Reviews: </h1>
                                <h1 className='text-xl font-bold flex gap-3'>Likes: <button onClick={handleButton}>{like == true ? <p className='h-full text-2xl -mt-3 -ml-1'>❤️</p> : <FontAwesomeIcon className='font-extrabold text-2xl' icon={faHeart} size='fa-solid' />}</button> {data?.likes.length}</h1>
                            </div>
                        </div>
                        <div className='flex justify-around p-2'>
                            <div className='w-1/2'>
                                <h1 id='title' className='text-3xl mb-3 font-semibold'>Description</h1>
                                <p className='text-lg font-semibold'>{data?.details}</p>
                            </div>
                            <div className='border-2 w-1/3 p-2'>
                                <h1 id='title' className='text-3xl mb-3 font-semibold'>Comments</h1>
                                <div>
                                    <textarea ref={commentInput} name="" className='p-2 border-2 w-full h-32 rounded-2xl border-black ' id=""></textarea>
                                    {
                                        rate?.map((e, idx) => <button onClick={() => setRatting(e)} className='btn mr-2'>⭐{e}</button>)
                                    }
                                    <div className='my-2 flex justify-end'>
                                        <button onClick={handleComment} id='button' className='text-white border-2 border-white text-lg font-semibold'>Submit</button>
                                    </div>
                                    <div>
                                        <h1 className='text-2xl font-semibold'>Other Comments</h1>
                                        <div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </section>
    );
};

export default CardDetails;