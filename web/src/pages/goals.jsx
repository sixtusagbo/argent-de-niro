import React from 'react';
import Menubar from '../components/menubar';

const goals = () => {
    return (
        <section className='flex'>
            <Menubar />
            <section>
                <button>Active</button>
            </section>
        </section>
    );
};

export default goals;
