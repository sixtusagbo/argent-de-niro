import React, { useEffect, useState } from 'react';
import { UilMoneyWithdraw } from '@iconscout/react-unicons';
import axios from 'axios';

const Home = () => {
    // const [userData, setUserData] = useState(null);

    // useEffect(() => {
    //     const fetchUserData = async () => {
    //         try {
    //             const response = await axios.get('http://localhost:5000/api/user');
    //             setUserData(response.data);
    //         } catch (error) {
    //             console.error('Error fetching user data:', error);
    //         }
    //     };

    //     fetchUserData();
    // }, []);

    return (
        <section className='pl-4 '>
            <section className='flex pb-10 gap-10 pr-4'>
                <article className='w-[263px] h-[150px] bg-zinc-900 rounded-[25px] text-center text-lg text-white pt-11'>
                    Income:
                    <br />
                    <p className='text-center text-2xl text-white'>6,400</p>
                    {/* {userData.income} */}
                </article>
                <article className='w-[263px] h-[150px] bg-zinc-900 rounded-[25px] text-center text-lg text-white pt-9'>
                    <p className='text-center text-2xl text-white'>May Budget</p>
                    Available:
                    <br />
                    <p className='text-center text-2xl text-white'>12,000</p>
                    {/* {userData.available} */}
                </article>
                <article className='w-[263px] h-[150px] bg-zinc-900 rounded-[25px] text-center text-lg text-white pt-11'>
                    Expenses:
                    <br />
                    <p className='text-center text-2xl text-white'>5,400</p>
                    {/* - {userData.expenses} */}
                </article>
                {/* Your home component content here */}
            </section>
            <section className='w-[850px] h-[210px] bg-white rounded-[30px] pb-10 text-black px-5 pt-2 rtl'>
                <p className='text-lg'> Saving plan</p>
                <p className='font-light mb-1'>Your Goals are within reach, Keep it up!</p>

                <span className='inline-block w-[366px] h-[95px] bg-zinc-300 bg-opacity-30 rounded-[25px] px-2 py-2'>
                    <article className='flex-col'>
                        <p className=' '>
                            <span className='flex items-center'>
                                <UilMoneyWithdraw className='mr-4' />
                                Save 3000
                            </span>
                        </p>
                    </article>
                    <p className='ml-72'>3000</p>
                    <div className="w-[289px] h-2 bg-amber-400 rounded-[15px] ml-6" />
                    <div className="flex">
                        <p className="ml-4 text-black">Accumulated 2,000</p>
                        <p className="text-black font-light ml-10">left 1,000</p>
                    </div>
                </span>
                <span className='inline-block w-[366px] h-[95px] bg-zinc-300 bg-opacity-30 rounded-[25px] ml-8 px-2 py-2'>
                    <article className='flex-col'>
                        <p className=''>
                            <span className='flex items-center'>
                                <UilMoneyWithdraw className='mr-4' />
                                Buy MacBook Pro 16
                            </span>
                        </p>
                    </article>
                    <p className='ml-72'>6000</p>
                    <div className="w-[289px] h-2 bg-orange-400 rounded-[15px] ml-6" />
                    <div className="flex">
                        <p className="ml-4 text-black">Accumulated 2,000</p>
                        <p className="text-black font-light ml-10">left 4,000</p>
                    </div>
                </span>
                <button className='ml-[700px] mt-2 bg-zinc-300 p-2 rounded-lg text-sm'>Add Goal</button>
            </section>
            <section>
                <p> My recent transactions</p>
                {/* get recent transcations from api  */}
            </section>
        </section>
    );
}

export default Home;
