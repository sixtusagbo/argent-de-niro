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
    const [activeItem, setActiveItem] = useState('home');
    // const []

    const handleItemClick = (item) => {
        setActiveItem(item);
    };

    return (
        <menu className='bg-[#43534D]'>
            <section className='ml-5'>
                <img src={logo} alt="logo" className='pt-3' width={80} height={41} />
                <ul className="list-none">
                    <li className=''>
                        <img src={activeItem === 'home' ? home : nchome} alt="home icon" className='inline-block mr-1' width={30} height={31} />
                        <a href="#home" className=`${activeItem} === 'home' ? text-white : text-black` onClick={() => handleItemClick('home')}>Home</a>
                    </li>
                    <li>
                        <img src={activeItem === 'budget' ? walletff : newwallet} alt="budget icon" className='inline-block mr-1' width={30} height={31} />
                        <a href="#budget" className="text-white" onClick={() => handleItemClick('budget')}>Budget</a>
                    </li>
                    <li>
                        <img src={activeItem === 'goals' ? dart : ncdart} alt="goals icon" className='inline-block mr-1' width={30} height={31} />
                        <a href="#goals" className="text-white" onClick={() => handleItemClick('goals')}>Goals</a>
                    </li>
                    <li>
                        <img src={activeItem === 'analytics' ? graph : ncgraph} alt="analytics icon" className='inline-block mr-1' width={30} height={31} />
                        <a href="#analytics" className="text-white" onClick={() => handleItemClick('analytics')}>Analytics</a>
                    </li>
                </ul>
            </section>

            <Button label="Transaction" intent="transaction" />
        </menu>
    );
};

export default Menubar;
