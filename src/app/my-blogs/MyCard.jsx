import React from 'react';
import Swal from 'sweetalert2';
import useAxios, { AxiosSource } from '../Hooks/useAxios';

const MyCard = ({ card }) => {
    const axiosLink = useAxios(AxiosSource)

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosLink.delete(`/delete/${id}`)
                    .then(res => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    })
                    .catch(err => {
                        Swal.fire({
                            title: "Can't delete",
                            text: "Your file has not deleted.",
                            icon: "error"
                        });
                    })

            }
        });
    }
    return (
        <section className='w-1/2 mx-auto border-2 p-3 rounded-xl'>
            <div className=' flex justify-between '>
                <div className='flex-1 '>
                    <img className='w-64 h-40 rounded-lg object-cover mx-auto' src={card.hostImages[0]} alt="" />
                </div>
                <div className=' my-auto flex-1 space-y-1'>
                    <h1 className='text-lg font-semibold'><span className='font-bold'>Name:</span> {card?.name}</h1>
                    <h1 className='text-lg font-semibold'><span className='font-bold'>location:</span> {card?.location}</h1>
                    <h1 className='text-lg font-semibold'><span className='font-bold'>Likes:</span> {card?.likes.length}</h1>
                    <h1 className='text-lg font-semibold'><span className='font-bold'>Comments:</span> {card?.comments.length}</h1>
                </div>
                <div className='flex-1 flex flex-col space-y-2 my-auto'>
                    <button id="button" className='text-white font-semibold text-lg mr-3'>Update</button>
                    <button onClick={() => handleDelete(card?._id)} id="button" className='text-white font-semibold text-lg mr-3'>Delete</button>
                </div>
            </div>
        </section>
    );
};

export default MyCard;