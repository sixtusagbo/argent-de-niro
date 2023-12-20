import React from 'react';
import logo from '../assets/logo.svg';
import Button from './button';

const Menubar = () => {
    return (
        <menu>
            <img src={logo} alt="logo" width={140} height={41}/>
            <ul className="headerItem">
                <li>
                    <a href="#home">Home</a>
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
            <Button label="Transaction" intent="adding" />
        </menu>
    );
};

export default Menubar;
