import React from 'react';

const MyCard = ({ card }) => {
    console.log(card);

    return (
        <section className='w-1/2 mx-auto border-2 p-1'>
            <div className=' flex justify-between '>
            <div className='flex-1 '>
            <img className='w-40 h-24 rounded-lg object-cover mx-auto' src={card.hostImages[0]} alt="" />
            </div>
            <div className=' my-auto flex-1'>
                <h1>Name: {card?.name}</h1>
                <h1>location: {card?.location}</h1>
            </div>
            <div className='flex-1 my-auto'>
                <button id="button" className='text-white font-semibold text-lg mr-3'>Update</button>
                <button id="button" className='text-white font-semibold text-lg mr-3'>Delete</button>
            </div>
            </div>
        </section>
    );
};

export default MyCard;