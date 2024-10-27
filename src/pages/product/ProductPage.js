import React, { useEffect } from 'react'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import './index.css'
import Rotation from '../../components/rotation/Rotation'
import Diagram from '../../components/diagram/Diagram'
import ScrollToTopButton from '../../components/scrollToTopButton/ScrollToTopButton'
import FeedBack from '../../components/feedBack/FeedBack'
import { useLocation, useNavigate } from 'react-router-dom'

export default function ProductPage() {

    useEffect(() => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = '/public/back2.webp';
        link.as = "image";

        document.head.appendChild(link);

        return () => {
            document.head.removeChild(link);
        };
    }, []);

    const location = useLocation()
    const navigate = useNavigate()


    useEffect(() => {
        // window.scrollTo(0, 0)
        document.title = 'Volerò - Product'
    }, [location])

    return (
        <div>
            <Header />
            <div className='main'>
                <div className='product'>
                    <div className='product__first__block'>
                        <div className='page__title'>20+</div>
                        <div className='description'>years of tourism expertise</div>
                    </div>
                </div>
                <Rotation />
                <div className='gray__background'>
                    <div className='container'>
                        <div className='product__second__block'>
                            <div className='title__block'>
                                <div className='title__line'></div>
                                <div className='title__text'>All-in-One ecosystem</div>
                            </div>
                            <div className='title'>Your powerful marketplace for</div>
                            <div className='product__content'>
                                <div className='content__item'>
                                    <div className='left'>
                                        <div className='img__background'>
                                            <img src='hotel.webp' alt='img' />
                                        </div>
                                    </div>
                                    <div className='right'>
                                        <div className='subtitle'>Volero Hotels</div>
                                        <p>Provide users access to more than 400K accommodation options globally.</p>
                                    </div>
                                </div>
                                <div className='item__line__1440'><div></div></div>
                                <div className='item__line__1024'></div>
                                <div className='content__item'>
                                    <div className='left'>
                                        <div className='img__background'>
                                            <img src='air.webp' alt='img' />
                                        </div>
                                    </div>
                                    <div className='right'>
                                        <div className='subtitle'> Volero Air</div>
                                        <p>Allows IATA & None IATA users to book through multiple Air  sources, including GDS, NDC, LCC, consolidators fares.</p>
                                    </div>
                                </div>
                                <div className='item__line__1440'><div></div></div>
                                <div className='content__item'>
                                    <div className='left'>
                                        <div className='img__background'>
                                            <img src='package.webp' alt='img' />
                                        </div>
                                    </div>
                                    <div className='right'>
                                        <div className='subtitle'>Volero Package</div>
                                        <p>Indulge family and seaside packages in European destinations.</p>
                                    </div>
                                </div>
                                <div className='item__line__1024'></div>
                                <div className='content__item'>
                                    <div className='left'>
                                        <div className='img__background'>
                                            <img src='carRental.webp' alt='img' />
                                        </div>
                                    </div>
                                    <div className='right'>
                                        <div className='subtitle'>Volero Car Rentals</div>
                                        <p>Unbeatable offers from top car rental companies in 7k locations worldwide.</p>
                                    </div>
                                </div>
                                <div className='item__line__1440'><div></div></div>
                                <div className='content__item'>
                                    <div className='left'>
                                        <div className='img__background'>
                                            <img src='transfer.webp' alt='img' />
                                        </div>
                                    </div>
                                    <div className='right'>
                                        <div className='subtitle'>Volero Transfers</div>
                                        <p>Book door-to-door service with private or shared rides, budget or luxury vehicles, and professional drivers ready to pick you up.</p>
                                    </div>
                                </div>
                                <div className='item__line__1024'></div>
                                <div className='item__line__1440'><div></div></div>
                                <div className='content__item'>
                                    <div className='left'>
                                        <div className='img__background'>
                                            <img src='activities.webp' alt='img' />
                                        </div>
                                    </div>
                                    <div className='right'>
                                        <div className='subtitle'>Volero Activities</div>
                                        <p>Book Theme Parks tickets, sightseeing tours and a wide range of excursions.</p>
                                    </div>
                                </div>






                                <div className='content__item__mobile'>
                                    <div className='left'>
                                        <div className='img__background'>
                                            <img src='hotel.webp' alt='img' />
                                        </div>
                                        <div className='subtitle'>Volero Hotels</div>
                                    </div>
                                    <div className='right'>
                                        <p>Provide users access to more than 400K accommodation options globally.</p>
                                    </div>
                                </div>
                                <div className='content__item__mobile'>
                                    <div className='left'>
                                        <div className='img__background'>
                                            <img src='air.webp' alt='img' />
                                        </div>
                                        <div className='subtitle'> Volero Air</div>
                                    </div>
                                    <div className='right'>
                                        <p>Allows IATA & None IATA users to book through multiple Air  sources, including GDS, NDC, LCC, consolidators fares.</p>
                                    </div>
                                </div>
                                <div className='content__item__mobile'>
                                    <div className='left'>
                                        <div className='img__background'>
                                            <img src='package.webp' alt='img' />
                                        </div>
                                        <div className='subtitle'>Volero Package</div>
                                    </div>
                                    <div className='right'>
                                        <p>Indulge family and seaside packages in European destinations.</p>
                                    </div>
                                </div>
                                <div className='content__item__mobile'>
                                    <div className='left'>
                                        <div className='img__background'>
                                            <img src='carRental.webp' alt='img' />
                                        </div>
                                        <div className='subtitle'>Volero Car Rentals</div>
                                    </div>
                                    <div className='right'>
                                        <p>Unbeatable offers from top car rental companies in 7k locations worldwide.</p>
                                    </div>
                                </div>
                                <div className='content__item__mobile'>
                                    <div className='left'>
                                        <div className='img__background'>
                                            <img src='transfer.webp' alt='img' />
                                        </div>
                                        <div className='subtitle'>Volero Transfers</div>
                                    </div>
                                    <div className='right'>
                                        <p>Book Door to Door service, Private or shared rides, Budget or Luxury Vehicles, with professional drivers ready to pick up </p>
                                    </div>
                                </div>
                                <div className='content__item__mobile'>
                                    <div className='left'>
                                        <div className='img__background'>
                                            <img src='activities.webp' alt='img' />
                                        </div>
                                        <div className='subtitle'>Volero Activities</div>
                                    </div>
                                    <div className='right'>
                                        <p>Book Theme Parks tickets, sightseeing tours and a wide range of excursions.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='white__background'>
                    <div className='container'>
                        <div className='product__fourth__block'>
                            <div className='title__block'>
                                <div className='title__line'></div>
                                <div className='title__text'>Volero concierge service</div>
                            </div>
                            <div className='title__content'>
                                <div className='title'>When you book <br />travel services with Volero expert</div>
                                <p>You’re unlocking a treasure trove of expertise and exclusive benefits.<br /> Enjoy personalized service that ensures every detail
                                    is tailored to your preferences. With us, you’ll experience heartfelt welcomes, forge deeper connections with local cultures, and create
                                    unforgettable memories in every destination. Let’s make your travel dreams a reality!</p>
                            </div>
                            <div className='services'>
                                <div className='service'>
                                    <img src='/luxury.webp' alt='luxury' />
                                    <div className='service__title'>Luxury Travel</div>
                                </div>
                                <div className='service'>
                                    <img src='/tailor.jpg' alt='tailor' />
                                    <div className='service__title'>Tailor Made</div>
                                </div>
                            </div>
                            <div className='services'>
                                <div className='service'>
                                    <img src='/spa.webp' alt='spa' />
                                    <div className='service__title'>SPA & Wellness</div>
                                </div>
                                <div className='service'>
                                    <img src='/mice.webp' alt='mice' />
                                    <div className='service__title'>MICE</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='darkgray__background'>
                    <div className='container'>
                        <div className='product__third__block'>
                            <div className='title__block'>
                                <div className='title__line'></div>
                                <div className='title__text'>The ideal travel agent portal</div>
                            </div>
                            <div className='title'>Volero - Cutting edge technology</div>
                            <Diagram />
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
