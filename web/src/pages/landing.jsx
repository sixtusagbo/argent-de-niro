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
    return (
        <section>
            <header className='pl-60 md:pl-24 pr-1 md:pr-4 absolute w-full flex justify-between items-center max-container bg-neutral-600'>
                <nav className='max-lg:hidden'>
                    <ul className="flex-1 flex justify-center items-center gap-5 md:gap-40">
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
                <Button intent="landing" label="log in" />
            </header>
            <section className="bg-neutral-600 w-full flex xl:flex-row flex-col justify-center min-h-screen gap-10 px-2 " id="home">
                <article className='text-white border-l-2 border-solid min-w-0'>
                    <h1>Argent De Niro</h1>
                </article>
                <img src={landingImage} alt="landingImage" className='' width={610}
                    height={502} />
            </section>
            <section aria-label="How to Use Section" className="how" id="how-to-use">
                {/* Section 2 */}
            </section>
            <section aria-label="About Us Section" className="about" id="about-us">
                {/* Section 3 */}
            </section>

        </section>
    );
};

export default LandingPage;
