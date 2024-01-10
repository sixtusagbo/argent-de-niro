/**
 * Renders the landing page component.
 * 
 * @returns {JSX.Element} The landing page component.
 */
import React from 'react';
import Button from '../components/Button';

const LandingPage = () => {
    return (
        <section>
            <header>
                <ul className="headerItem">
                    <li>
                        <a href="#about-us">About Us</a>
                    </li>
                    <li>
                        <a href="how-to-use">How To Use</a>
                    </li>
                    <li>
                        <a href="features">Features</a>
                    </li>
                </ul>
                <Button label="sign up" intent="landing" />
            </header>
            <section aria-label="Hero Section" className="hero" id="home">
                {/* Section 1 */}
            </section>
            <section aria-label="How to Use Section" className="how" id="how-to-use">
                {/* Section 2 */}
            </section>
            <section aria-label="About Us Section" className="about" id="about-us">
                {/* Section 3 */}
            </section>
            <Button />
        </section>
    );
};

export default LandingPage;
