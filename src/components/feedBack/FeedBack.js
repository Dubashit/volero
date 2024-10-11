import React, { useEffect, useState } from 'react'
import './index.css'
import { getTestimonialAuthorImage, getTestimonials } from '../../api'

export default function FeedBack() {
    const [testimonials, setTestimonials] = useState([])
    const [loading, setLoading] = useState(true);

    const handleFetchTestimonials = async () => {
        try {
            setLoading(true);
            const fetchTestimonials = await getTestimonials();
            if (fetchTestimonials) {
                setTestimonials(fetchTestimonials);
            }
        } catch (error) {
            console.error('Error fetching testimonials:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        handleFetchTestimonials();
    }, []);

    return (
        <div className='site__container'>
            <div className='feedback__container'>
                <div className='feedback__track'>
                    {loading ? (
                        <p>Loading testimonials...</p>
                    ) : (
                        testimonials && testimonials.length > 0 ? (
                            testimonials.map((testimonial) => (
                                <div className='feedback__item' key={testimonial.id}>
                                    <div className='feedback__first__block'>
                                        <div className='stars'>
                                            {
                                                Array.from({ length: testimonial.countOfStars }).map((_, index) => (
                                                    <img src='fullStar.svg' alt='star' key={index} />
                                                ))
                                            }
                                            {
                                                Array.from({ length: 5 - testimonial.countOfStars }).map((_, index) => (
                                                    <img src='emptyStar.svg' alt='star' key={`empty-${index}`} />
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
                        ) : (
                            <p>No testimonials available</p>
                        )
                    )}
                </div>
            </div>
        </div>
    )
}