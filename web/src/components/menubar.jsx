/**
 * Represents a menu bar component.
 * @component
 */

import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.svg';
import Button from './button';
import nchome from '../assets/icons/nchome.svg';
import newwallet from '../assets/icons/newwallet.svg';
import ncdart from '../assets/icons/ncdart.svg';
import ncgraph from '../assets/icons/ncgraph.svg';
import home from '../assets/icons/home.svg';
import walletff from '../assets/icons/walletff.svg';
import dart from '../assets/icons/dart.svg';
import graph from '../assets/icons/graph.svg';
import { UilEllipsisH } from '@iconscout/react-unicons';
import SearchBar from './searchButton';
import Hamburger from './hamburger';
import { Link } from 'react-router-dom';

const Menubar = () => {
    let white = 'text-white text-xl text-center';
    let black = 'text-black bg-[D9D9D9] text-xl';

    const [activeItem, setActiveItem] = useState('home');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const handleSize = () => {
            if (window.innerWidth > 820) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleSize);

        return () => {
            window.removeEventListener('resize', handleSize);
        }
    })

    /**
     * Handles the click event of a menu item.
     * @param {string} item - The item that was clicked.
     */
    const handleItemClick = (item) => {
        setActiveItem(item);
    };

    return (
        <menu >
            <section className='bg-[#43534D] w-[305px] max-lg:hidden h-screen relative'>
                <img src={logo} alt="logo" className='pt-3' width={80} height={41} />
                <nav className='flex flex-col'>
                    <ul className="list-none mt-36 mb-12 content-center">
                        <li className={activeItem === 'home' ? 'bg-[#D9D9D9]' : 'bg-[#43534D]'}>
                            <img src={activeItem === 'home' ? home : nchome} alt="home icon" className='inline-block mr-2 ml-5' width={30} height={31} />
                            {/* <a href="#home" className={activeItem === 'home' ? black : white} onClick={() => handleItemClick('home')}>Home</a> */}
                            <Link to="dashboard/home" className={activeItem === 'home' ? black : white} onClick={() => handleItemClick('home')}>Home</Link>
                        </li>
                        <li className={activeItem === 'budget' ? 'bg-[#D9D9D9]' : 'bg-[#43534D]'}>
                            <img src={activeItem === 'budget' ? walletff : newwallet} alt="budget icon" className='inline-block mr-2 ml-5' width={30} height={31} />
                            {/* <a href="#budget" className={activeItem === 'budget' ? black : white} onClick={() => handleItemClick('budget')}>Budget</a> */}
                            <Link to="dashboard/budget" className={activeItem === 'budget' ? black : white} onClick={() => handleItemClick('budget')}>Budget</Link>
                        </li>
                        <li className={activeItem === 'goals' ? 'bg-[#D9D9D9]' : 'bg-[#43534D]'}>
                            <img src={activeItem === 'goals' ? dart : ncdart} alt="goals icon" className='inline-block mr-2 ml-5' width={30} height={31} />
                            {/* <a href="#goals" className={activeItem === 'goals' ? black : white} onClick={() => handleItemClick('goals')}>Goals</a> */}
                            <Link to="dashbard/goals" className={activeItem === 'goals' ? black : white} onClick={() => handleItemClick('goals')}>Goals</Link>
                        </li>
                        <li className={activeItem === 'analytics' ? 'bg-[#D9D9D9]' : 'bg-[#43534D]'}>
                            <img src={activeItem === 'analytics' ? graph : ncgraph} alt="analytics icon" className='inline-block mr-2 ml-5' width={30} height={31} />
                            {/* <a href="#analytics" className={activeItem === 'analytics' ? black : white} onClick={() => handleItemClick('analytics')}>Analytics</a> */}
                            <Link to="dashboard/analytics" className={activeItem === 'analytics' ? black : white} onClick={() => handleItemClick('analytics')}>Analytics</Link>
                        </li>
                    </ul>
                    <Button label="Transaction" intent="transaction" />
                </nav>
            </section>
            <section className='bg-zinc-100 max-lg:bg-[#43534D] h-20 max-lg:w-full w-4/5 absolute top-0 right-0 flex flex-row'>
                <h2 className='p-7 max-lg:text-white'> {activeItem.toUpperCase()} </h2>
                <SearchBar />
                <UilEllipsisH size={30} onClick={toggleMenu} className="hidden max-lg:inline-block absolute top-1/2 transform -translate-y-1/2 right-6 text-white" />
            </section>
            {isMenuOpen && <Hamburger />}
        </menu>
    );
};

export default Menubar;
