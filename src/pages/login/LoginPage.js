import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import './index.css'
import { useLocation, useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0)
        document.title = 'Volerò - Login'
    }, [location])
    
    const [formType, setFormType] = useState('login');

    const [salesId, setSalesId] = useState('')
    const [username, setUsername] = useState('')
    // const [password, setPassword] = useState('')

    // const [newPassword, setNewPassword] = useState('')

    const handleContinueClick = (event) => {
        event.preventDefault();
        console.log('Sales Id:', salesId);
        console.log('Username:', username);
    };

    return (
        <div>
            <Header />
            <div className='main'>
                <div className='container'>
                    <div className='white__background'>
                        <div className='register__text'>
                            <div className='title'>Welcome to Volerò</div>
                            <p>Fill in your login credentials to access the platform</p>
                        </div>
                        <div className='login__block'>
                            <button className='already__btn' onClick={() => { navigate('/register') }}>
                                <u>I don't have an account</u>
                            </button>
                            {formType === 'login' &&
                                <form className="login__form" onSubmit={handleContinueClick}>
                                    <div className="log__form__group">
                                        <label htmlFor="sales__id">Sales ID</label>
                                        <input
                                            type="text"
                                            id="sales__id"
                                            value={salesId}
                                            onChange={(e) => setSalesId(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="log__form__group">
                                        <label htmlFor="username">Username</label>
                                        <input
                                            type="text"
                                            id="username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="log__form__group">
                                        <label htmlFor="password">Password</label>
                                        <input
                                            type="password"
                                            id="password"
                                            required
                                        />
                                    </div>

                                    <div className="log__form__actions">
                                        <div className="forgot__password" onClick={() => setFormType('forgot__password')}><u>Forgot Password?</u></div>
                                        {/* <label>
                                            <input
                                                type="checkbox"
                                                name="remember"
                                            />
                                            Remember me
                                        </label> */}
                                    </div>

                                    <button type="submit" className='log__btn'>Login</button>
                                </form>
                            }
                            {formType === 'forgot__password' &&
                                <form className="login__form">
                                    <div className="log__form__group">
                                        <label htmlFor="sales__id">Sales ID</label>
                                        <input
                                            type="text"
                                            id="sales__id"
                                            value={salesId}
                                            onChange={(e) => setSalesId(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="log__form__group">
                                        <label htmlFor="username">Username</label>
                                        <input
                                            type="text"
                                            id="username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="log__form__group">
                                        <label htmlFor="new__password">New password</label>
                                        <input
                                            type="password"
                                            id="password"
                                            required
                                        />
                                    </div>

                                    <button type="submit" className='log__btn' onClick={() => setFormType('login')}>Save</button>
                                </form>
                            }
                        </div>
                    </div>
                </div>
                <div className='login__block__mobile'>
                    <button className='already__btn' onClick={() => { navigate('/register') }}>
                        <u>I don't have an account</u>
                    </button>
                    {formType === 'login' &&
                        <form className="login__form__mobile" onSubmit={handleContinueClick}>
                            <div className="log__form__group">
                                <label htmlFor="sales__id">Sales ID</label>
                                <input
                                    type="text"
                                    id="sales__id"
                                    value={salesId}
                                    onChange={(e) => setSalesId(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="log__form__group">
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="log__form__group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    required
                                />
                            </div>

                            <div className="log__form__actions">
                                <div className="forgot__password" onClick={() => setFormType('forgot__password')}><u>Forgot Password?</u></div>
                                {/* <label>
                                    <input
                                        type="checkbox"
                                        name="remember"
                                    />
                                    Remember me
                                </label> */}
                            </div>

                            <button type="submit" className='log__btn'>Login</button>
                        </form>
                    }
                    {formType === 'forgot__password' &&
                        <form className="login__form__mobile">
                            <div className="log__form__group">
                                <label htmlFor="sales__id">Sales ID</label>
                                <input
                                    type="text"
                                    id="sales__id"
                                    value={salesId}
                                    onChange={(e) => setSalesId(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="log__form__group">
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="log__form__group">
                                <label htmlFor="new__password">New password</label>
                                <input
                                    type="password"
                                    id="password"
                                    required
                                />
                            </div>

                            <button type="submit" className='log__btn' onClick={() => setFormType('login')}>Save</button>
                        </form>
                    }
                </div>
            </div>
            <Footer />
        </div>
    )
}