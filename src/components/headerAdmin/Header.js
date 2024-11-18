import React from 'react'
import './index.css'
import { useNavigate } from 'react-router-dom'

export default function Header() {

    const navigate = useNavigate()

    return (
        <header className='header__admin'>
            <div className='logo__admin'>
                <img src='/logoWhite.png' alt='logo' onClick={() => navigate('/admin/agents')} />
            </div>
            <div className='header__btns__admin'>
                <button onClick={() => navigate('/admin/changePassword')}><img src='/blackKey.png' alt='change password' /></button>
                <button onClick={() => {
                    navigate('/')
                    localStorage.removeItem('authToken')
                    window.location.reload()
                }}><img src='/exit.png' alt='log out' /></button>
            </div>
        </header>
    )
}