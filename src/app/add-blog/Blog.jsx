"use client"
import React, { useContext, useState } from 'react';
import { } from "./Blog.css"
import axios from 'axios';
import { ContextSource } from '../ContextAPI/ContextAPI';
import useAxios, { AxiosSource } from '../Hooks/useAxios';

const Blog = () => {
    const { user } = useContext(ContextSource)
    const axiosLink = useAxios(AxiosSource)
    // console.log(user);
    const [previewImage, setPreviewImage] = useState([]);
    // const [hostImages, sethostImages] = useState([]);
    const hostImages = []
    const [imageArray, setImageArray] = useState([]);


    const handleImage = (e) => {
        e.preventDefault()
        const file = e.target.files
        const images = Array.from(file)
        // console.log(images);
        const preview = images.map(element => URL.createObjectURL(element))
        setImageArray(images)
        // console.log(URL.createObjectURL(images));
        setPreviewImage(data => data.concat(preview))


    }
    const handleFrom = (e) => {
        e.preventDefault()
        const data = e.target
        const name = data.name.value
        const location = data.location.value
        const details = data.details.value
        const email = user?.email
        imageArray.map((e, idx) => {
            const fromData = new FormData()
            fromData.append("file", e)
            fromData.append("upload_preset", 'blog_images')
            axios.post('https://api.cloudinary.com/v1_1/daudgshta/upload', fromData)
                .then(res => {
                    // console.log(res.data.url);
                    hostImages.push(res?.data?.url)
                    // sethostImages((e) => e.concat(res?.data?.url))
                    // console.log(hostImages?.length);
                    if (hostImages?.length == imageArray?.length) {
                        console.log(hostImages);
                        const blogDetails = { name, location, details, email, hostImages }
                        console.log(blogDetails);
                        axiosLink.post("/blogs", blogDetails)
                            .then(res => {
                                console.log(res.data);
                                data.reset()
                                setPreviewImage([])
                            })
                            .catch(err => {
                                console.log(err);
                            })
                    }

                })
                .catch(err => {
                    console.log(err);
                })
        })


    }


    // console.log(hostImages.length, imageArray.length);
    // const words = ['spray', 'elite', 'exuberant', 'destruction', 'present'];
    // const persons = [
    //     {
    //         name : "Mahmud Hasan",
    //         age : 25,
    //         Gender : "Male"
    //     },
    //     {
    //         name : "Mehadi Hasan",
    //         age : 19,
    //         Gender : "Male"
    //     },
    //     {
    //         name : "Kamrul Ahasan",
    //         age : 55,
    //         Gender : "Male"
    //     },
    // ]

    // const result = words.map((word) => word.length > 6);
    // const result = persons.filter(e=> e.name.includes("Hasan"))
    // console.log(result);
    return (
        <form id='from' onSubmit={handleFrom} className="border-2 p-5 space-y-3 bg-gray-200 rounded-2xl w-1/3 mx-auto">
            <div>
                <label className="text-lg font-bold">Blog Name</label> <br />
                <input name='name' className="border-2 w-full border-black p-2 rounded-2xl "></input>
            </div>
            <div>
                <label className="text-lg font-bold">Blog Location</label> <br />
                <input name='location' className="border-2 w-full border-black p-2 rounded-2xl "></input>
            </div>
            <div>
                <label className="text-lg font-bold">Upload Your Photos</label>
                <input onChange={handleImage} type="file" multiple></input>
            </div>
            <div>
                <label className="text-lg font-bold">Preview Your Photos</label>
                <div className='flex gap-3'>
                    {
                        previewImage.length > 0 ?
                            previewImage.map((element, idx) => <img key={idx} src={element} className='w-20 h-20 object-cover'></img>)
                            :
                            <p className="text-[#6f53d6] font-bold">No Image Preview</p>
                    }
                </div>
            </div>
            <div>
                <label className="text-lg font-bold">Blog Description</label>
                <textarea name='details' className="border-2 w-full border-black p-2 rounded-2xl "  rows={'5'}></textarea>
            </div>
            <div className='mx-auto w-fit'>
                <button id='button_Submit' className=' border-2 p-2 text-white mt-3 border-white text-lg rounded-2xl font-bold'>Submit Your Blog</button>
            </div>
        </form>
    );
};

export default Blog;