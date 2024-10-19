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
                                <img src='/inst.png' alt='instagram' />
                            </a>
                            <a href='https://www.linkedin.com/company/volero-tourism/?viewAsMember=true' target='_blanc'>
                                <img src='/linkin.png' alt='linkedin' />
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
