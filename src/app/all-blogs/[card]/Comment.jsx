import { ContextSource } from '@/app/ContextAPI/ContextAPI';
import useAxios, { AxiosSource } from '@/app/Hooks/useAxios';
import useFetch2 from '@/app/Hooks/useFetch2';
import { Rating } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useContext, useRef, useState } from 'react';

const Comment = ({ params, refetch1 }) => {
    const [data, refetch] = useFetch2("blogs", params?.card)
    const { user } = useContext(ContextSource)
    const route = useRouter()
    let comments = data?.comments
    const commentInput = useRef()
    const rate = [1, 2, 3, 4, 5]
    const [ratting, setRatting] = useState();
    const axiosLink = useAxios(AxiosSource)
    const handleComment = () => {
        const text = commentInput.current.value
        const email = user?.email
        const picture = user?.picture
        const name = user?.name
        const comment = { text, email, ratting, name, picture }
        comments.push(comment)
        axiosLink.patch(`/blogs/${params.card}`, { comments })
            .then(res => {
                console.log(res);
                if (res.data) { 
                    refetch()
                    refetch1()
                    commentInput.current.value.reset()
                }


            })
            .catch(err => {
                console.log(err);

            })
    }

    const handleNavigate = (email) => {
        console.log(email);

        const userEmail = email.split("@")
        if (userEmail) {
            route.push(`/profile/${userEmail[0]}`)
        }

    }

    return (
        <div className='border-2 w-1/3 p-2'>
            <h1 id='title' className='text-3xl mb-3 font-semibold'>Comments</h1>
            <div>
                <textarea ref={commentInput} name="" className='p-2 border-2 w-full h-32 rounded-2xl border-black ' id=""></textarea>
                {
                    rate?.map((e, idx) => <button key={idx} onClick={() => setRatting(e)} className='btn mr-2 focus:bg-[#a155d0] focus:text-white'>⭐{e}</button>)
                }
                <div className='my-2 flex justify-end'>
                    <button onClick={handleComment} id='button' className='text-white border-2 border-white text-lg font-semibold'>Submit</button>
                </div>
                <div>
                    <h1 className='text-2xl font-semibold'>Other Comments</h1>
                    <div>
                        {
                            data?.comments?.length > 0 ?
                                data?.comments?.map((e, idx) =>
                                    <div key={idx}>
                                        <div className='flex justify-between'>
                                            <div className='flex gap-2'>
                                                <img className='w-12 h-12 rounded-full object-cover object-top' src={e.picture} alt="" />
                                                <h1 onClick={()=>handleNavigate(e.email)} className='my-auto cursor-pointer text-lg font-semibold'>{e.name}</h1>
                                            </div>
                                            <div className='my-auto'>
                                                <Rating readOnly value={e?.ratting} ></Rating>
                                            </div>
                                        </div>
                                        <div>
                                            <h1>{e?.text}</h1>
                                        </div>
                                    </div>)
                                :
                                <h1>No Comments</h1>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Comment;