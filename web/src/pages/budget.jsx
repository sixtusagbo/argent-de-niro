import React from 'react';
import Menubar from '../components/menubar';

const budget = () => {
    return (
        <section className='flex'>
            <Menubar />
            <section className='pt-20 bg-[#D9D9D9] lg:w-10/12 w-full h-screen overflow-hidden'>
                <section className='h-1/2'>
                    Chart
                </section>
                <section className='h-1/2 px-2'>
                    <section className='h-full rounded-xl bg-white overflow:hidden overflow-auto'>
                    </section>
                </section>
                
                    
                
            </section>
            {/* Your code here */}
        </section>
    );
};

export default budget;
