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

    const location = useLocation()
    const navigate = useNavigate()
    

    useEffect(() => {
        window.scrollTo(0, 0)
        document.title = 'Volerò'
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
                                            <img src='hotel.jpg' alt='img' />
                                        </div>
                                    </div>
                                    <div className='right'>
                                        <div className='subtitle'>Volero Hotels</div>
                                        <p>Provide users access to more than 400K accommodation options globally.</p>
                                    </div>
                                </div>
                                <div className='item__line__1440'></div>
                                <div className='item__line__950'></div>
                                <div className='content__item'>
                                    <div className='left'>
                                        <div className='img__background'>
                                            <img src='air.jpg' alt='img' />
                                        </div>
                                    </div>
                                    <div className='right'>
                                        <div className='subtitle'> Volero Air</div>
                                        <p>Allows IATA & None IATA users to book through multiple Air  sources, including GDS, NDC, LCC, consolidators fares.</p>
                                    </div>
                                </div>
                                <div className='item__line__1440'></div>
                                <div className='content__item'>
                                    <div className='left'>
                                        <div className='img__background'>
                                            <img src='package.jpg' alt='img' />
                                        </div>
                                    </div>
                                    <div className='right'>
                                        <div className='subtitle'>Volero Package</div>
                                        <p>Indulge family and seaside packages in European destinations.</p>
                                    </div>
                                </div>
                                <div className='item__line__950'></div>
                                <div className='content__item'>
                                    <div className='left'>
                                        <div className='img__background'>
                                            <img src='carRental.jpg' alt='img' />
                                        </div>
                                    </div>
                                    <div className='right'>
                                        <div className='subtitle'>Volero Car Rentals</div>
                                        <p>Unbeatable offers from top car rental companies in 7k locations worldwide.</p>
                                    </div>
                                </div>
                                <div className='item__line__1440'></div>
                                <div className='content__item'>
                                    <div className='left'>
                                        <div className='img__background'>
                                            <img src='transfer.jpg' alt='img' />
                                        </div>
                                    </div>
                                    <div className='right'>
                                        <div className='subtitle'>Volero Transfers</div>
                                        <p>Book Door to Door service, Private or shared rides, Budget or Luxury Vehicles, with professional drivers ready to pick up </p>
                                    </div>
                                </div>
                                <div className='item__line__950'></div>
                                <div className='item__line__1440'></div>
                                <div className='content__item'>
                                    <div className='left'>
                                        <div className='img__background'>
                                            <img src='activities.jpg' alt='img' />
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
                                            <img src='hotel.jpg' alt='img' />
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
                                            <img src='air.jpg' alt='img' />
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
                                            <img src='package.jpg' alt='img' />
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
                                            <img src='carRental.jpg' alt='img' />
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
                                            <img src='transfer.jpg' alt='img' />
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
                                            <img src='activities.jpg' alt='img' />
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
                <div className='white__background'>
                    <div className='container'>
                        <div className='product__fourth__block'>
                            <div className='title__block'>
                                <div className='title__line'></div>
                                <div className='title__text'>Volero concierge service</div>
                            </div>
                            <div className='title__content'>
                                <div className='title'>When you book <br />travel services with Volero expert</div>
                                <p>you tap into a world of expert knowledge,
                                    exclusive travel perks, and a personal touch throughout your Journey. Experience warmer
                                    welcomes, deeper connections, and unforgettable moments in your destinations.</p>
                            </div>
                            <div className='services'>
                                <div className='service'>
                                    <img src='luxury.jpg' alt='luxury' />
                                    <div className='service__title'>Luxury Travel</div>
                                </div>
                                <div className='service'>
                                    <img src='tailor.jpg' alt='tailor' />
                                    <div className='service__title'>Tailor Made</div>
                                </div>
                            </div>
                            <div className='services'>
                                <div className='service'>
                                    <img src='spa.jpg' alt='spa' />
                                    <div className='service__title'>SPA & Wellness</div>
                                </div>
                                <div className='service'>
                                    <img src='mice.jpg' alt='mice' />
                                    <div className='service__title'>MICE</div>
                                </div>
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
