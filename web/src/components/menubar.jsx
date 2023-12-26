import React, { useState } from 'react';
import logo from '../assets/logo.svg';
import Button from './button';
import nchome from '../assets/nchome.svg';
import newwallet from '../assets/newwallet.svg';
import ncdart from '../assets/ncdart.svg';
import ncgraph from '../assets/ncgraph.svg';
import home from '../assets/home.svg';
import walletff from '../assets/walletff.svg';
import dart from '../assets/dart.svg';
import graph from '../assets/graph.svg';

const Menubar = () => {
    let white = 'text-white text-xl text-center';
    let black = 'text-black bg-[D9D9D9] text-xl';

    // const padding = 'py-3 px-5';

    const [activeItem, setActiveItem] = useState('home');

    const handleItemClick = (item) => {
        setActiveItem(item);
    };

    return (
        <menu className='bg-[#43534D] w-1/5 h-screen'>
            <img src={logo} alt="logo" className='pt-3' width={80} height={41} />
            <section className=''>
                <ul className="list-none mt-36 mb-12 content-center">
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
            </section>

            <Button label="Transaction" intent="transaction" />
        </menu>
    );
};

export default Menubar;
