import React, { useState } from 'react';
import nchome from '../assets/icons/nchome.svg';
import newwallet from '../assets/icons/newwallet.svg';
import ncdart from '../assets/icons/ncdart.svg';
import ncgraph from '../assets/icons/ncgraph.svg';
import home from '../assets/icons/home.svg';
import walletff from '../assets/icons/walletff.svg';
import dart from '../assets/icons/dart.svg';
import graph from '../assets/icons/graph.svg';
import { Avatar } from 'keep-react';


const Hamburger = () => {

    let white = 'text-white text-xl text-center';
    let black = 'text-black bg-[D9D9D9] text-xl';

    const [activeItem, setActiveItem] = useState('home');

    /**
     * Handles the click event of a menu item.
     * @param {string} item - The item that was clicked.
     */
    const handleItemClick = (item) => {
        setActiveItem(item);
    };
    return (
        <nav className='fixed inset-0 z-50 flex items-center justify-center bg-[#43534D]'>
            <article className='flex flex-col items-center'>
                <Avatar size="xl" color='success'/>
                <h2 className='pt-2 text-white text-xl'> {user.first_name} {user.last_name}</h2>
            </article>

            <ul className="list-none mt-36 mb-12 content-center w-full">
                <li className={activeItem === 'home' ? 'bg-[#D9D9D9]' : 'bg-[#43534D]'}>
                    <img src={activeItem === 'home' ? home : nchome} alt="home icon" className='inline-block mr-2 ml-5' width={30} height={31} />
                    <a href="#home" className={activeItem === 'home' ? black : white} onClick={() => handleItemClick('home')}>Home</a>
                </li>
                <li className={activeItem === 'budget' ? 'bg-[#D9D9D9]' : 'bg-[#43534D]'}>
                    <img src={activeItem === 'budget' ? walletff : newwallet} alt="budget icon" className='inline-block mr-2 ml-5' width={30} height={31} />
                    <a href="#budget" className={activeItem === 'budget' ? black : white} onClick={() => handleItemClick('budget')}>Budget</a>
                </li>
                <li className={activeItem === 'goals' ? 'bg-[#D9D9D9]' : 'bg-[#43534D]'}>
                    <img src={activeItem === 'goals' ? dart : ncdart} alt="goals icon" className='inline-block mr-2 ml-5' width={30} height={31} />
                    <a href="#goals" className={activeItem === 'goals' ? black : white} onClick={() => handleItemClick('goals')}>Goals</a>
                </li>
                <li className={activeItem === 'analytics' ? 'bg-[#D9D9D9]' : 'bg-[#43534D]'}>
                    <img src={activeItem === 'analytics' ? graph : ncgraph} alt="analytics icon" className='inline-block mr-2 ml-5' width={30} height={31} />
                    <a href="#analytics" className={activeItem === 'analytics' ? black : white} onClick={() => handleItemClick('analytics')}>Analytics</a>
                </li>
            </ul>
        </nav>
    );
};

export default Hamburger;
