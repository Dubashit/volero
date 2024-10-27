import React, { useEffect } from 'react'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import './index.css'
import TeamView from '../../components/teamView/TeamView'
import ScrollToTopButton from '../../components/scrollToTopButton/ScrollToTopButton'
import { useLocation, useNavigate } from 'react-router-dom'
import FeedBack from '../../components/feedBack/FeedBack'

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
                                <p>Volero embodies a visionary quest, led by a dynamic team of industry pioneers dedicated to redefining tourism
                                    as a catalyst for profound experiences. We believe in transcending boundaries and enriching lives through travel.</p>
                                <p>We are transforming the way travel agencies operate with our seamless, user-friendly ecosystem. By simplifying the booking process, we
                                    empower you to access a wide array of travel services in one place. With real-time availability, personalized solutions, and robust support,
                                    delivering exceptional travel experiences has never been easier. Join us in shaping the future of travel, where every journey
                                    becomes an enriching adventure!</p>
                            </div>
                            <div className='images'>
                                <img src='aboutFirstBlock1.webp' alt='iam' loading="lazy" />
                                <img src='aboutFirstBlock3.webp' alt='iam' loading="lazy" />
                                <img src='aboutFirstBlock2.webp' alt='iam' loading="lazy" />
                                <img src='aboutFirstBlock4.webp' alt='iam' loading="lazy" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='darkgray__background'>
                    <div className='container'>
                        <div className='about__second__block'>
                            <div className='vision'>
                                <div className='title'>Vision</div>
                                <p>To be Global market leaders and a preferred supplier among the company's customers, while adhering to integrity and business fairness</p>
                            </div>
                            <div className='mission'>
                                <div className='title'>Mission</div>
                                <p>To provide a customer experience, with an emphasis on innovation, advanced technological tools, creativity and optimization of processes,
                                    competitive prices and personal, top notch cross-border customer service</p>
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
                            <p>We are a dedicated team of professionals committed to seamlessly blending travel and technology. With a hands-on approach, our employees boldly
                                challenge industry norms through innovation, creativity, and perseverance. At the heart of our company culture are core values such as service,
                                teamwork, trust, integrity, collaboration, respect, and optimism. Join us on this journey and experience the difference that dedication and
                                innovation can make!</p>
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
                                        <img src='item1.webp' alt='img' loading="lazy" />
                                    </div>
                                    <div className='item__text'>Top notch 24/7 multilingual call center</div>
                                </div>
                                <div className='item__line__1440'></div>
                                <div className='item__line__1024'></div>
                                <div className='reasons__item'>
                                    <div className='img__background'>
                                        <img src='item2.webp' alt='img' loading="lazy" />
                                    </div>
                                    <div className='item__text'>No transaction fees</div>
                                </div>
                                <div className='item__line__1440'></div>
                                <div className='reasons__item'>
                                    <div className='img__background'>
                                        <img src='item3.webp' alt='img' loading="lazy" />
                                    </div>
                                    <div className='item__text'>Best offers in real time availability</div>
                                </div>
                                <div className='item__line__1024'></div>
                                <div className='reasons__item'>
                                    <div className='img__background'>
                                        <img src='item4.webp' alt='img' loading="lazy" />
                                    </div>
                                    <div className='item__text'>Constant optimization</div>
                                </div>
                                <div className='item__line__1440'></div>
                                <div className='reasons__item'>
                                    <div className='img__background'>
                                        <img src='item5.webp' alt='img' loading="lazy" />
                                    </div>
                                    <div className='item__text'>Account management</div>
                                </div>
                                <div className='item__line__1440'></div>
                                <div className='item__line__1024'></div>
                                <div className='reasons__item'>
                                    <div className='img__background'>
                                        <img src='item6.webp' alt='img' loading="lazy" />
                                    </div>
                                    <div className='item__text'>Advanced technology</div>
                                </div>
                                <div className='reasons__item'>
                                    <div className='img__background'>
                                        <img src='item7.webp' alt='img' loading="lazy" />
                                    </div>
                                    <div className='item__text'>Data protection</div>
                                </div>
                                <div className='item__line__1440'></div>
                                <div className='item__line__1024'></div>
                                <div className='reasons__item'>
                                    <div className='img__background'>
                                        <img src='item8.webp' alt='img' loading="lazy" />
                                    </div>
                                    <div className='item__text'>Payment solutions</div>
                                </div>
                                <div className='item__line__1440'></div>
                                <div className='reasons__item'>
                                    <div className='img__background'>
                                        <img src='item9.webp' alt='img' loading="lazy" />
                                    </div>
                                    <div className='item__text'>Personal touch</div>
                                </div>

                            </div>
                            <div className='wraper1'>
                                <div className='subtitle'>Ready to transform your business?</div>
                                <button className='about__btn__register' onClick={() => navigate('/register')}>Join us</button>
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