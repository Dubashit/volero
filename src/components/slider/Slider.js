import React, { useState, useEffect } from 'react';
import './index.css';

export default function Slider() {
    const images = ['iam.jpg', 'instagram.png', 'linkedin.png', 'facebook.png'];

    const [currentIndex, setCurrentIndex] = useState(0);

    const [fadeIn, setFadeIn] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setFadeIn(false);
            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
                setFadeIn(true);
            }, 500);
        }, 3500);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="slider">
            <img
                src={`/${images[currentIndex]}`}
                alt={`Slide ${currentIndex}`}
                className={`slider-image ${fadeIn ? 'fade-in' : 'fade-out'}`}
                draggable='false'
            />
        </div>
    );
}
