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
                        <div className='title'>Volero - complete online travel booking solution</div>

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
                    </div>
                </div>
            </div>
            <Footer />
            <ScrollToTopButton />
        </div>
    )
}