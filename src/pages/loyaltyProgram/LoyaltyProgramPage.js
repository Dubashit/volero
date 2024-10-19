import React, { useEffect } from 'react'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import './index.css'
import ScrollToTopButton from '../../components/scrollToTopButton/ScrollToTopButton'
import { useLocation, useNavigate } from 'react-router-dom'

export default function LoyaltyProgramPage() {

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        // window.scrollTo(0, 0)
        document.title = 'Volerò - Loyalty Program'
    }, [location])

    return (
        <div>
            <Header />
            <div className='main'>
                <div className='loyalty'>
                    <div className='product__first__block'>
                        <div className='page__title'>Loyalty Program</div>
                        <div className='description'>The more you book, the more you earn</div>
                    </div>
                </div>
                <div className='white__background'>
                    <div className='container'>
                        <div className='loyalty__second__block'>
                            <div className='loyalty__content'>
                                <div className='title'>Welcome to our Volero Loyalty Program</div>
                                <p>Our rewards program is designed exclusively for bookers to earn points with each hotel
                                    booking and redeem them for exciting travel products based on their performance. </p>
                                <button className='about__btn__register loyalty__btn' onClick={() => navigate('/register')}>Join Us</button>
                                <div className='loyalty__navigate'>Already a member of loyalty program?<br /><div onClick={() => navigate('/login')}><u>Log in to your member account</u></div></div>
                            </div>
                            <div className='images'>
                                <img src='aboutFirstBlock1.jpg' alt='iam' />
                                <img src='aboutFirstBlock3.jpg' alt='iam' />
                                <img src='aboutFirstBlock2.jpg' alt='iam' />
                                <img src='aboutFirstBlock4.jpg' alt='iam' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='gray__background'>
                    <div className='container'>
                        <div className='loyalty__trird__block'>
                            <div className='loyalty__content__item'>
                                <div className='left'>
                                    <div className='img__background'>
                                        <img src='join.jpg' alt='img' />
                                    </div>
                                </div>
                                <div className='right'>
                                    <div className='subtitle'>Join</div>
                                    <p>Create a Volero account and make your first hotel booking to start enjoying the loyalty program.</p>
                                </div>
                            </div>
                            <div className='item__line__1440'></div>
                            <div className='loyalty__content__item'>
                                <div className='left'>
                                    <div className='img__background'>
                                        <img src='earn.jpg' alt='img' />
                                    </div>
                                </div>
                                <div className='right'>
                                    <div className='subtitle'>Earn</div>
                                    <p>Receive points for your successful hotel booking activity. Exchange points for your own private trip.</p>
                                </div>
                            </div>
                            <div className='item__line__1440'></div>
                            <div className='loyalty__content__item'>
                                <div className='left'>
                                    <div className='img__background'>
                                        <img className='air__image' src='air.jpg' alt='img' />
                                    </div>
                                </div>
                                <div className='right'>
                                    <div className='subtitle'>Redeem</div>
                                    <p>Pay for bookings with points and reduce your travel expenses or make discounts to your customers.</p>
                                </div>
                            </div>
                            <div className='loyalty__content__item__mobile'>
                                <div className='left'>
                                    <div className='img__background'>
                                        <img src='join.jpg' alt='img' />
                                    </div>
                                    <div className='subtitle'>Join</div>
                                </div>
                                <div className='right'>
                                    <p>Create a Volero account and make your first hotel booking to start enjoying the loyalty program.</p>
                                </div>
                            </div>
                            <div className='item__line__1024'></div>
                            <div className='loyalty__content__item__mobile'>
                                <div className='left'>
                                    <div className='img__background'>
                                        <img src='earn.jpg' alt='img' />
                                    </div>
                                    <div className='subtitle'>Earn</div>
                                </div>
                                <div className='right'>
                                    <p>Receive points for your successful hotel booking activity. Exchange points for your own private trip.</p>
                                </div>
                            </div>
                            <div className='item__line__1024'></div>
                            <div className='loyalty__content__item__mobile'>
                                <div className='left'>
                                    <div className='img__background'>
                                        <img className='air__image' src='air.jpg' alt='img' />
                                    </div>
                                    <div className='subtitle'>Redeem</div>
                                </div>
                                <div className='right'>
                                    <p>Pay for bookings with points and reduce your travel expenses or make discounts to your customers.</p>
                                </div>
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
