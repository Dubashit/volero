import React, { useCallback, useEffect, useState } from 'react';
import './index.css';
import { getTestimonialAuthorImage, getTestimonials } from '../../api';
import { useLocation } from 'react-router-dom';

export default function FeedBack() {
    const location = useLocation();

    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [animationDuration, setAnimationDuration] = useState('30s');
    const [translateDistance, setTranslateDistance] = useState(0);

    const handleFetchTestimonials = useCallback(async () => {
        try {
            setLoading(true);
            let pageType = '';

            if (location.pathname === '/') {
                pageType = 'homePage';
            } else if (location.pathname === '/about') {
                pageType = 'aboutPage';
            } else if (location.pathname === '/product') {
                pageType = 'productPage';
            } else if (location.pathname === '/loyaltyProgram') {
                pageType = 'loyaltyPage';
            }

            if (pageType) {
                const fetchTestimonials = await getTestimonials(pageType);
                if (fetchTestimonials) {
                    setTestimonials(fetchTestimonials);
                }
            }
        } catch (error) {
            console.error('Error fetching testimonials:', error);
        } finally {
            setLoading(false);
        }
    }, [location.pathname]);

    useEffect(() => {
        handleFetchTestimonials();
    }, [handleFetchTestimonials]);

    useEffect(() => {
        const testimonialCount = testimonials.length * 4;
        const singleItemWidth = 300 + 20;
        const totalWidth = singleItemWidth * testimonialCount;

        const durationPerItem = 20;
        const totalDuration = testimonialCount * durationPerItem;
        setAnimationDuration(`${totalDuration}s`);

        setTranslateDistance(totalWidth * 1.5);
    }, [testimonials]);

    return (
        <div className='site__container'>
            <div className='feedback__container'>
                <div
                    className='feedback__track'
                    style={{
                        animationDuration,
                        transform: `translateX(-${translateDistance}px)`
                    }}
                >
                    {loading ? (
                        <p>Loading testimonials...</p>
                    ) : (
                        testimonials && testimonials.length > 0 ? (
                            Array.from({ length: 4 }).flatMap((_, i) => 
                                testimonials.map((testimonial, index) => (
                                    <div className='feedback__item' key={`${testimonial.id}-${i}-${index}`}>
                                        <div className='feedback__first__block'>
                                            <div className='stars'>
                                                {
                                                    Array.from({ length: testimonial.countOfStars }).map((_, i) => (
                                                        <img src='fullStar.svg' alt='star' key={i} />
                                                    ))
                                                }
                                                {
                                                    Array.from({ length: 5 - testimonial.countOfStars }).map((_, i) => (
                                                        <img src='emptyStar.svg' alt='star' key={`empty-${i}`} />
                                                    ))
                                                }
                                            </div>
                                            <div className='comment'>
                                                <p>{testimonial.comment}</p>
                                            </div>
                                        </div>
                                        <div className='author__data'>
                                            {getTestimonialAuthorImage(testimonial)}
                                            <div>
                                                <div className='author__name'>{testimonial.author}</div>
                                                <div className='author__position'>{testimonial.position}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )
                        ) : (
                            <p>No testimonials available</p>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}
