import React, { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import './index.css'
import ScrollToTopButton from '../../components/scrollToTopButton/ScrollToTopButton'
import Rotation from '../../components/rotation/Rotation'

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
                    <div className='container'>
                        <div className='home__first__block'>
                            <div className='title'>Your Passport to Boundless Horizons</div>
                            <div className='slogan__text'>We help travel companies to leverage their travel business with our powerful All-in-One ecosystem</div>
                            <button className='about__btn__register' onClick={() => navigate('/register')}>Join us</button>
                        </div>
                    </div>
                </div>
                <Rotation />
                <div className='gray__background' ref={grayBackgroundRef}>
                    <div className='home__second__block'>
                        <div className='home__title__block'>
                            <div className='title'>Welcome to Volero</div>
                            <p>the ultimate online travel booking solution providing a wide range of services all in one place—from FIT bookings to customized itineraries. You no longer need to search for multiple solutions to meet your customers’ needs. Volero empowers and grows your travel business by offering top-level support, helping thousands of travel agencies skyrocket their revenues. Our platform delivers fast, worry-free booking experiences that set you apart. Leverage the power of our B2B travel portal to streamline operations, cut expenses, and escape the complexities of dealing with multiple travel partners.</p>
                        </div>

                        {/* <div className='devices'> */}
                        <div className='phone__block'>
                            <div className='phone__display'>
                                <div className='phone__camera'>
                                    <div className='phone__block1'></div>
                                    <div className='phone__block2'></div>
                                </div>
                                <img src='/phoneDisplay.jpg' alt='phone' />
                            </div>
                            <div className='phone__button__mute'></div>
                            <div className='phone__button__volumeUp'></div>
                            <div className='phone__button__volumeDown'></div>
                        </div>

                        {/* це блок ноутбука */}
                        <div className='laptop__block'>
                            <div className='first__monitor'>
                                <div className='second__monitor'>
                                    <img className='monitor__header' src='/headerImage.jpg' alt='header' />
                                    <img className='monitor__body' src='/bodyImage.jpg' alt='body' />
                                </div>
                            </div>
                            <div className='laptop__corpus'>
                                <div className='laptop__left'></div>
                            </div>
                            <div className='laptop__footer'></div>
                        </div>
                        {/* </div> */}
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
                                <img src='/spa.jpg' alt='b' />
                                <div className='subtitle'>Powerful Technology</div>
                                <p>Volero’s advanced API connects you to a vast network of travel services with real-time availability and secure transactions. Our platform is optimized for speed, performance, and reliability, continuously evolving to meet your business needs.</p>
                            </div>
                            <div className='home__content__item'>
                                <img src='/luxury.jpg' alt='b' />
                                <div className='subtitle'>Innovation</div>
                                <p>Innovation drives us. Volero offers tailored solutions, from personalized bookings to a loyalty program, helping you stay ahead and unlock new growth opportunities in the travel industry.</p>
                            </div>
                            <div className='home__content__item'>
                                <img src='/mice.jpg' alt='b' />
                                <div className='subtitle'>Human Capital</div>
                                <p>Our dedicated team of travel experts provides 24/7 multilingual support and personalized account management. We combine cutting-edge technology with human expertise to deliver exceptional service.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <ScrollToTopButton />
        </div>
    )
}