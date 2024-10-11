import React from 'react'
import './index.css'
import { useNavigate } from 'react-router-dom'

export default function Footer() {

    let navigate = useNavigate()

    return (
        <footer>
            <div className='container'>
                <div className='footer__content'>
                    <div className='footer__first__block'>
                        <img onClick={() => { navigate('/') }} className='logo' src={`${process.env.PUBLIC_URL}/logoRed.png`} alt='logo' />
                        <p>We focus on the needs of middle to big market business to improve and grow their return</p>
                        <div className='messengers'>
                            <a href='#' target='_blanc'>
                                <svg width="39" height="39" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="rgb(0, 0, 0)">
                                    <path d="M17 2h-3a5 5 0 00-5 5v3H6v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                            </a>
                            <a href='#' target='_blanc'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                    <rect x="2" y="9" width="4" height="12"></rect>
                                    <circle cx="4" cy="4" r="2"></circle>
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div className='footer__second__block'>
                        <div className='second'>
                            <p className='title'>Quick Links</p>
                            <div onClick={() => navigate('/about')}>About us</div>
                            <div onClick={() => navigate('/product')}>Product</div>
                            <div onClick={() => navigate('/blog')}>Blog</div>
                            <div onClick={() => navigate('/contacts')}>Contact us</div>
                        </div>
                        <div className='third'>
                            <p className='title'>Services</p>
                            <div onClick={() => navigate('/loyaltyProgram')}>Loyalty program</div>
                            <div onClick={() => navigate('/career')}>Career</div>
                            <div onClick={() => navigate('/privacyPolicy')}>Privacy policy</div>
                            <div onClick={() => navigate('/termsOfUse')}>Terms of Use</div>
                        </div>
                        <div className='fourth'>
                            <p className='title'>Address</p>
                            <p>281 Hayuvalim street, Beerotayim, Israel</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='copyright'>
                &copy; 2024 <img className='logo__copyright' src='/logoWhite.png' alt='logo' /> , Inc. All rights reserved.
            </div>
        </footer>
    )
}
