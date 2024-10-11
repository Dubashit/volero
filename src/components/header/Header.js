import React, { useState } from 'react'
import './index.css'
import { useNavigate, useLocation } from 'react-router-dom'

export default function Header() {
    const navigate = useNavigate()
    const location = useLocation()
    const [isMenuOpen, setMenuOpen] = useState(false);

    const isActive = (path) => {
        return location.pathname.startsWith(path) ? 'nav__link active' : 'nav__link';
    }
    const isActiveBtn = (path) => {
        return location.pathname === path ? 'header__btn__login active' : 'header__btn__login'
    }
    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    }

    return (
        <header>
            <div>
                <img onClick={() => { navigate('/') }} className='logo' src='/logoRed.png' alt='logo' draggable='false' />
                <div className={`nav ${isMenuOpen ? 'open' : ''}`}>
                    <div onClick={() => { navigate('/about'); setMenuOpen(false) }} className={isActive('/about')}>About us</div>
                    <div onClick={() => { navigate('/product'); setMenuOpen(false) }} className={isActive('/product')}>Product</div>
                    <div onClick={() => { navigate('/loyaltyProgram'); setMenuOpen(false) }} className={isActive('/loyaltyProgram')}>Loyalty program</div>
                    <div onClick={() => { navigate('/blog'); setMenuOpen(false) }} className={isActive('/blog')}>Blog</div>
                    <div onClick={() => { navigate('/contacts'); setMenuOpen(false) }} className={isActive('/contacts')}>Contact us</div>
                    <button onClick={() => { navigate('/login'); setMenuOpen(false) }} className={isActiveBtn('/login')}>Log in</button>
                    {/* <a href='https://www.volero.net/reseller/auth/' className={isActiveBtn('/login')}>Log in</a> */}
                    <button onClick={() => { navigate('/register') }} className={isActiveBtn('/register')}>Join us</button>
                </div>
                <div className={`burger ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                    <span className='first__span'></span>
                    <span className='second__span'></span>
                    <span className='third__span'></span>
                </div>
            </div>
        </header>
    )
}
