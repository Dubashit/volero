import React, { useState, useEffect } from 'react';
import './index.css';

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <div className="scroll__to__top">
            {isVisible && (
                <button onClick={scrollToTop} className="scroll__button">
                    <img src='/arrow.webp' alt='arrow' draggable='false'/>
                </button>
            )}
        </div>
    );
};

export default ScrollToTopButton;
