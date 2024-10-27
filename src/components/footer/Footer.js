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
                        <img onClick={() => { navigate('/') }} className='logo' src={'/logoRed.webp'} alt='logo' />
                        <p>We specialize in meeting the needs of SME’s businesses, helping them to drive growth for a better return on investment. Let us partner with you to unlock your business's full potential!</p>
                        <div className='messengers'>
                            <a href='https://www.instagram.com/volero_tourism?igsh=NnJuZm5vcjliZzVl&utm_source=qr' target='_blanc'>
                                <img src='/inst.webp' alt='instagram' />
                            </a>
                            <a href='https://www.linkedin.com/company/volero-tourism/?viewAsMember=true' target='_blanc'>
                                <img src='/linkin.webp' alt='linkedin' />
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
                            <p>281 Hayuvalim street, Beerotayim, Israel, 4285000</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='copyright'>
                &copy; 2024 <img className='logo__copyright' src='/logoWhite.webp' alt='logo' /> , Inc. All rights reserved.
            </div>
        </footer>
    )
}
