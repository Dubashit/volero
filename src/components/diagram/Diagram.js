import React from 'react'
import './index.css'
import { useNavigate } from 'react-router-dom'

export default function Diagram() {

    const navigate = useNavigate()

    return (
        <div className="diagram__container">
            <div className='options'>
                <div className='option'>
                    <div className='option__title'>B2B Platform</div>
                    <button className='option__btn' onClick={() => navigate('/register')}>Join us</button>
                </div>
                <div className='option'>
                    <div className='option__title'>API/XML</div>
                    <p>Integrate your own brand identity platform to our content via API</p>
                </div>
                <div className='option'>
                    <div className='option__title'>White Label</div>
                    <p>Maintain your brand look and feel with our platform and inventory</p>
                </div>
            </div>
            <img className='first__line__largeScreen' src='/diagramLine1L.svg' alt='arrow' />
            <img className='first__line__mediumScreen' src='/diagramLine1M.svg' alt='arrow' />
            <div className='diagram__logo'><img src='/logoWhite.webp' alt='logo' /></div>
            <img className='second__line__largeScreen' src='/diagramLine2L.svg' alt='arrow' />
            <div className='diagram__line'></div>
            <div className='client__block'>
                <div><p>Travel Agencies</p></div>
                <div><p>Tour Operators</p></div>
                <div><p>Freelancers</p></div>
                <div><p>OTA`s</p></div>
                <div><p>Corporations</p></div>
            </div>
        </div>
    )
}