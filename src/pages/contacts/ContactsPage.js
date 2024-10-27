import React, { useEffect } from 'react'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import './index.css'
import ScrollToTopButton from '../../components/scrollToTopButton/ScrollToTopButton'
import { useLocation } from 'react-router-dom'

export default function ContactsPage() {

    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'Volerò - Contact Us'
    }, [location]);

    return (
        <div>
            <Header />
            <div className='main'>
                <div className='contact'>
                    <div className='product__first__block'>
                        <div className='page__title'>Contact Us</div>
                        <div className='description'>our duty is to serve!</div>
                    </div>
                </div>
                <div className='contact__content'>
                    <div className='container'>
                        <div className='contact__second__block'>
                            <div className='title__block__center'>
                                <div className='title__line'></div>
                                <div className='title__text'>Contact Us</div>
                            </div>
                            <div className='small__title'>Working hours:</div>
                            <p>Sunday - Friday 09:00-18:00<br />
                                Tel: +972-774711315/+44-1224076189<br />
                                Customer support email: <a href='mailto:support@volero.net'>support@volero.net</a></p>
                            <div>--------------------------------------------</div>
                            <div className='small__title'>After working hours (7 days a week):</div>
                            <p>Tel: +972-774711315/+44-1224076189<br />
                                Email: <a href='mailto:support@volero.net'>support@volero.net</a><br />
                                Emergency line: <a href='mailto:emergency@volero.net'>emergency@volero.net</a></p>
                        </div>
                    </div>
                    <div className='gray__background'>
                        <div className='container'>
                            <div className='contact__trird__block'>
                                <div className='title'>Volero Departments</div>
                                <div className='contact__content__second'>
                                    <div className='contact__item'>
                                        <div className='subtitle'>Customer Support</div>
                                        <p>Tel: +972-774711315 (*1)<br />
                                            Mail: <a href='mailto:support@volero.net'>support@volero.net</a></p>
                                    </div>
                                    <div className='item__line'></div>
                                    <div className='contact__item'>
                                        <div className='subtitle'>Tailro Made</div>
                                        <p>Tel: +972-774711315 (*2)<br />
                                            Mail: <a href='mailto:tailormade@volero.net'>tailormade@volero.net</a></p>
                                    </div>
                                    <div className='item__line'></div>
                                    <div className='contact__item'>
                                        <div className='subtitle'>Finance</div>
                                        <p>Tel: +972-774711315 (*3)<br />
                                            Mail: <a href='mailto:finance@volero.net'>finance@volero.net</a></p>
                                    </div>
                                    <div className='contact__item'>
                                        <div className='subtitle'>Sales</div>
                                        <p>Tel: +972-774711315 (*4)<br />
                                            Mail: <a href='mailto:sales@volero.net'>sales@volero.net</a></p>
                                    </div>
                                    <div className='item__line'></div>
                                    <div className='contact__item'>
                                        <div className='subtitle'>Marketing</div>
                                        <p>Tel: +972-774711315 (*4)<br />
                                            Mail: <a href='mailto:marketing@volero.net'>marketing@volero.net</a></p>
                                    </div>
                                    <div className='item__line'></div>
                                    <div className='contact__item'>
                                        <div className='subtitle'>General</div>
                                        <p>Tel: +972-774711315 <br />
                                            Mail: <a href='mailto:info@volero.net'>info@volero.net</a></p>
                                    </div>
                                </div>
                            </div>
                            <div className='contact__fourth__block'>
                                Company Registration No: 517015764<br />
                                Address: 281 Hayuvalim street, Beerotayim , zip code: 4285000, Israel
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
