import React, { useEffect } from 'react'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import './index.css'
// import Slider from '../../components/slider/Slider'
import TeamView from '../../components/teamView/TeamView'
import ScrollToTopButton from '../../components/scrollToTopButton/ScrollToTopButton'
import { useLocation, useNavigate } from 'react-router-dom'

export default function AboutUsPage() {

    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0)
        document.title = 'Volerò - About Us'
    }, [location])

    return (
        <div>
            <Header />
            <div className='main'>
                <div className='gray__background'>
                    <div className='container'>
                        <div className='about__first__block'>
                            <div className='about__content'>
                                <div className='title__block'>
                                    <div className='title__line'></div>
                                    <div className='title__text'>Our journey</div>
                                </div>
                                <div className='title'>Revolutionizing tourism with a seamless travel booking ecosystem.</div>
                                <p>Volero embodies a visionary quest, steered by a dynamic team of industry pioneers. We redefine tourism as a catalyst for
                                    profound experiences, transcending boundaries and enriching lives.</p>
                                <p>We are more than just an Online Travel Booking platform. We are the nexus where diverse distribution sources converge,
                                    creating a seamless and user-friendly ecosystem that encompasses a wide array of travel services content.</p>
                            </div>
                            <div className='images'>
                                <img src='aboutFirstBlock1.jpg' alt='iam' />
                                <img src='aboutFirstBlock3.jpg' alt='iam' />
                                <img src='aboutFirstBlock2.jpg' alt='iam' />
                                <img src='aboutFirstBlock4.jpg' alt='iam' />
                            </div>
                            {/* <Slider /> */}
                        </div>
                    </div>
                </div>
                <div className='darkgray__background'>
                    <div className='container'>
                        <div className='about__second__block'>
                            <div className='vision'>
                                <div className='title'>Vision</div>
                                <p>To become a powerful, trusted, and preferred Partner in the travel industry. We aim to be the go-to choice for
                                    those seeking seamless, efficient, and delightful travel booking experience.</p>
                            </div>
                            <div className='mission'>
                                <div className='title'>Mission</div>
                                <p>Streamline the booking process, enriching it with a treasure trove of content and delivering real-time
                                    competitive rates. Behind the scenes, we optimize and automate every step of the journey.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='white__background'>
                    <div className='container'>
                        <div className='about__third__block'>
                            <div className='title__block'>
                                <div className='title__line'></div>
                                <div className='title__text'>Our team</div>
                            </div>
                            <div className='title'>Meet our management team</div>
                            <p>We are a dedicated team of professionals driven by the goal of blending travel and technology seamlessly. With a hands-on approach, our employees
                                boldly challenge industry norms through innovation, creativity, and perseverance. At the heart of our company culture are the values of service,
                                teamwork, trust, integrity, collaboration, respect, and optimism. Thanks to our commitment, Volero has evolved from a modest accommodation tool
                                into a comprehensive all-in-one platform, offering top-tier travel services at the best guaranteed rates.</p>
                            <TeamView />
                        </div>
                    </div>
                </div>
                <div className='gray__background'>
                    <div className='container'>
                        <div className='about__fourth__block'>
                            <div className='title__block'>
                                <div className='title__line'></div>
                                <div className='title__text'>Why choose us?</div>
                            </div>
                            <div className='title'>20+ years of tourism Expertise</div>
                            <div className='reasons'>
                                <div className='reasons__item'>
                                    <div className='img__background'>
                                        <img src='item1.png' alt='img' />
                                    </div>
                                    <div className='item__text'>Top notch 24/7 multilingual call center</div>
                                </div>
                                <div className='reasons__item'>
                                    <div className='img__background'>
                                        <img src='item2.png' alt='img' />
                                    </div>
                                    <div className='item__text'>No transaction fees</div>
                                </div>
                                <div className='reasons__item'>
                                    <div className='img__background'>
                                        <img src='item3.png' alt='img' />
                                    </div>
                                    <div className='item__text'>Best offers in real time availability</div>
                                </div>
                                <div className='reasons__item'>
                                    <div className='img__background'>
                                        <img src='item4.png' alt='img' />
                                    </div>
                                    <div className='item__text'>Constant optimization</div>
                                </div>
                                <div className='reasons__item'>
                                    <div className='img__background'>
                                        <img src='item5.png' alt='img' />
                                    </div>
                                    <div className='item__text'>Account management</div>
                                </div>
                                <div className='reasons__item'>
                                    <div className='img__background'>
                                        <img src='item6.png' alt='img' />
                                    </div>
                                    <div className='item__text'>Advanced technology</div>
                                </div>
                                <div className='reasons__item'>
                                    <div className='img__background'>
                                        <img src='item7.png' alt='img' />
                                    </div>
                                    <div className='item__text'>Data protection</div>
                                </div>
                                <div className='reasons__item'>
                                    <div className='img__background'>
                                        <img src='item8.png' alt='img' />
                                    </div>
                                    <div className='item__text'>Payment solutions</div>
                                </div>
                                <div className='reasons__item'>
                                    <div className='img__background'>
                                        <img src='item9.png' alt='img' />
                                    </div>
                                    <div className='item__text'>Personal touch</div>
                                </div>
                            </div>
                            <div className='request__join'>
                                <div className='subtitle'>Ready to transform your business?</div>
                                <button className='about__btn__register' onClick={() => navigate('/register')}>Join us</button>
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