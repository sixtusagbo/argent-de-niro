import React from 'react';
import logo from '../assets/logo.svg';
import Button from './button';
import { UilPlusCircle } from '@iconscout/react-unicons';

const Menubar = () => {
    return (
        <menu>
            <img src={logo} alt="logo" width={80} height={41}/>
            <ul className="list-none">
                <li>
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
            <Button label="Transaction" intent="transaction" >
                <UilPlusCircle size="300" color="#191C1B"/>
            </Button>
        </menu>
    );
};

export default Menubar;
