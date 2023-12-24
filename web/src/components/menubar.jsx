import React from 'react';
import logo from '../assets/logo.svg';
import Button from './button';
import { UilEstate } from '@iconscout/react-unicons'

const Menubar = () => {
    return (
        <menu className='ml-5 mt-2'>
            <img src={logo} alt="logo" width={80} height={41}/>
            <ul className="list-none">
                <li>
                    <UilEstate className="inline-block mr-1" size={30} />
                    <a href="#home" className="">Home</a>
                </li>
                <li>
                    <a href="#budget">Budget</a>
                </li>
                <li>
                    <a href="#goals">Goals</a>
                </li>
                <li>
                    <a href="#analytics">Analytics</a>
                </li>
            </ul>
           
            <Button label="Transaction" intent="transaction" />
        </menu>
    );
};

export default Menubar;
