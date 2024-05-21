import React, { useState } from 'react';
import Menubar from '../components/menubar';
import GoalsActive from '../components/goalsActive';



const Goals = () => {

    const [goals, setGoals] = useState('completed');
    const [goalProp, setGoalProp] = useState('completed');
    

    const handleButtonClick = (item) =>{
            setGoals(item);
            setGoalProp(item);
    }

    return (
        <section className='flex'>
            <Menubar />
            <section className='mt-2 pt-16 bg-[#D9D9D9] lg:w-10/12 w-full h-screen'>
                <section className='w-full flex justify-center'>
                    <button className={goals === 'active' ? ' bg-white text-center p-6 text-xl w-1/2' : ' bg-[#D9D9D9] text-center p-6 text-xl w-1/2'} onClick={() => handleButtonClick('active')}>ACTIVE</button>
                    <button className={goals === 'completed' ? ' bg-white text-center p-6 text-xl w-1/2' : ' bg-[#D9D9D9] text-center p-6 text-xl w-1/2' } onClick={() => handleButtonClick('completed')}>COMPLETED</button>
                </section>
                <section className='flex justify-center pt-6 h-5/6 overflow-auto'>
                    <GoalsActive goals={goalProp}/>
                </section>
            </section>
        </section>
    );
};

export default Goals;
