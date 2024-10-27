import React, { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import './index.css'
import ScrollToTopButton from '../../components/scrollToTopButton/ScrollToTopButton'
import Rotation from '../../components/rotation/Rotation'
import FeedBack from '../../components/feedBack/FeedBack'

export default function HomePage() {
    const location = useLocation()
    const navigate = useNavigate()
    const grayBackgroundRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0)
        document.title = 'Volerò'
    }, [location])

    return (
        <div>
            <Header />
            <div className='main'>
                <div className='home'>
                    <div className='home__first__block'>
                        <div className='title'>Your Passport to Boundless Horizons</div>
                        <div className='slogan__text'>We empower travel companies to elevate their business with our powerful All-in-One ecosystem.</div>
                        <button className='about__btn__register' onClick={() => navigate('/register')}>Join us</button>
                    </div>
                </div>
                <Rotation />
                <div className='gray__background' ref={grayBackgroundRef}>
                    <div className='home__second__block'>
                        <div className='home__title__block'>
                            <div className='title'>Welcome to Volero!</div>
                            <p>Discover the ultimate online travel booking solution that brings a wide range of services together in one place. From FIT bookings to tailored itineraries, Volero simplifies your travel planning process, eliminating the need to juggle multiple solutions for your customers' diverse needs.<br />
                                <br /><b>Why Choose Volero?</b></p>
                            <ul>
                                <li><b>Empower Your Business:</b> Our platform supports travel agencies of all sizes, helping you boost revenue and streamline operations.</li>
                                <li><b>Top-Level Support:</b> Benefit from our expert assistance as you navigate the travel landscape.</li>
                                <li><b>Fast, Worry-Free Booking:</b> Enjoy seamless transactions that enhance your clients' experience and set your agency apart.</li>
                                <li><b>B2B Travel Portal:</b> Leverage our robust portal to cut expenses and simplify the complexities of managing multiple travel partners.</li>
                            </ul>
                            <p>Join the thousands of travel agencies that trust Volero to elevate their offerings and thrive in a competitive market.
                                Let’s take your travel business to new heights!</p>
                        </div>
                        <div className="home__laptop">
                            <img src='/homeLaptop.webp' alt='laptop' />
                        </div>
                    </div>
                </div>
                <div className='darkgray__background'>
                    <div className='home__third__block'>
                        <div className='title__block__center'>
                            <div className='title__line'></div>
                            <div className='title__text'>Our core values</div>
                        </div>
                        <div className='title'>Driven by Excellence, Empowering Your Success</div>
                        <div className='home__content'>
                            <div className='home__content__item'>
                                <img src='/homeCore1.webp' alt='b' />
                                <div className='subtitle'>Powerful Technology</div>
                                <p>Volero’s advanced API connects you to an extensive network of travel services, providing real-time availability and secure transactions.
                                    Our platform is designed for speed, performance, and reliability, ensuring that you can manage bookings effortlessly. With continuous
                                    updates and enhancements, Volero evolves alongside your business needs, empowering you to deliver exceptional travel experiences and stay ahead in the industry.</p>
                            </div>
                            <div className='home__content__item'>
                                <img src='/homeCore2.webp' alt='b' />
                                <div className='subtitle'>Innovation</div>
                                <p>Innovation is at the heart of what we do at Volero. We offer tailored solutions that range from personalized bookings to a comprehensive
                                    loyalty program, all designed to help you stay ahead in the travel industry. With Volero, you can unlock new growth opportunities,
                                    enhance customer loyalty, and differentiate your offerings. Let us empower your business to thrive in a constantly evolving market!</p>
                            </div>
                            <div className='home__content__item'>
                                <img src='/homeCore3.webp' alt='b' />
                                <div className='subtitle'>Human Capital</div>
                                <p>Our dedicated team of travel experts is here for you 24/7, providing multilingual support and personalized account management. We blend
                                    cutting-edge technology with human expertise to ensure you receive exceptional service at every step. With Volero, you can rely on our
                                    knowledgeable team to assist you in maximizing your travel business and enhancing customer satisfaction.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='gray__background'>
                    <div className='container'>
                        <div className='product__fiveth__block'>
                            <div className='title__block'>
                                <div className='title__line'></div>
                                <div className='title__text'>Our testimonials</div>
                            </div>
                            <div className='feedback__title'>
                                <div className='title'>Trusted by 10k+ customers</div>
                                <p>Whether you're a small startup or a multinational corporation, let us be your trusted advisor on the path to success.</p>
                            </div>
                        </div>
                        <FeedBack />
                        <div className='wraper1'>
                            <div className='subtitle'>Ready to transform your business?</div>
                            <button className='about__btn__register' onClick={() => navigate('/register')}>Join us</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <ScrollToTopButton />
        </div>
    )
}