/**
 * Renders the landing page component.
 * 
 * @returns {JSX.Element} The landing page component.
 */
import React from 'react';
import Button from '../components/button';
import { Link } from 'react-router-dom';
import landingImage from '../assets/images/landingImage.svg';


const LandingPage = () => {

    const buttonClick = () => {
        window.location.href = `/signup`;
    }

    return (
        <section>
            <header className='flex relative items-center bg-neutral-600 justify-between'>
                <nav className='pr-60 md:pr-24 pl-1 md:pl-4 w-full flex flex-col-reverse absolute items-center max-lg:hidden' style={{left: '-10%'}}>
                    <ul className="flex-1 flex justify-center items-center gap-6 md:gap-36">
                        <li className='text-base md:text-xl text-white'>
                            <Link to="#about-us">About Us</Link>
                        </li>
                        <li className='text-base md:text-xl  text-white'>
                            <Link to="#how-to-use">How To Use</Link>
                        </li>
                        <li className='text-base md:text-xl text-white'>
                            <Link to="#features">Features</Link>
                        </li>
                    </ul>
                </nav>
                <button className="px-2 py-2 rounded-3xl text-center text-lg m-4 bg-[#CBFAE8] border-[#CBFAE8] w-1/4 cursor-pointer text-black ml-auto" onClick={buttonClick}> Sign In</button>
            </header>
            
            <section className="bg-neutral-600 w-full flex xl:flex-row flex-col justify-center min-h-screen gap-10  " id="home">
                <aside className='relative flex-1 flex justify-center items-center xl:min-h-screen max-xl:py-8  bg-primary bg-hero bg-contain bg-no-repeat bg-center'>
                <article className='relative xl:w-2/5 flex flex-col justify-center items-start w-full max-lg:pb-36 max-xl:sm:px-16 px-8'>
                    <h1 className='text-2xl text-white max-lg:indent-6'><p>Argent</p> <p>De</p> <p>Niro</p></h1>
                </article>
                </aside>
                {/* <aside className=''>
                    <img src={landingImage} alt="landingImage" className='' width={600}
                        height={400} />
                </aside> */}
            </section>
            <h1 className='bg-neutral-600 text-3xl text-white pl-10 pt-2 pb-2'>How To Use</h1>
            <section aria-label="How to Use Section"  className="pt-2 bg-neutral-600 grid gap-6 max-sm:gap-2 grid-cols-4 max-sm:grid-cols-1" id="how-to-use">
                
                <article className='bg-white text-center w-64 h-36 ml-4 rounded-md'>
                    <h2 className='pt-12 text-lg'>Step 1</h2>
                    <p>Sign into the platform</p>
                </article >
                <article className='bg-white text-center w-64 h-36 rounded-md'>
                    <h2 className='pt-12 text-lg'>Step 2</h2>
                    <p>Enter your budget</p>
                </article>
                <article className='bg-white text-center w-64 h-36 rounded-md'>
                    <h2 className='pt-6 text-lg'>Step 3</h2>
                    <p>Update budget by adding transactions. According to whether it is an income or an expense transaction</p>
                </article>
                <article className='bg-white text-center w-64 h-36 rounded-md'>
                    <h2 className='pt-12 text-lg'>Step 4</h2>
                    <p>Setup your fincial goals</p>
                </article>
            </section>
            <section aria-label="About Us Section" className="bg-neutral-600" id="about-us">
                {/* Section 3 */}
            </section>

        </section>
    );
};

export default LandingPage;
