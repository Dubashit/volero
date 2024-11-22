import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import './index.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { getUserFromLoyalty, postAuth, postLoginMain } from '../../api';
import { notification } from 'antd';
import axios from 'axios';


export default function LoginPage() {

    useEffect(() => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = `${process.env.REACT_APP_API_URL}`;

        document.head.appendChild(link);

        return () => {
            document.head.removeChild(link);
        };
    }, []);

    const location = useLocation()
    const navigate = useNavigate()

    const searchParams = new URLSearchParams(location.search);
    const source = searchParams.get('source');

    useEffect(() => {
        window.scrollTo(0, 0)
        if (location.pathname.includes('/login?source=main')) {
            document.title = 'Volerò - Login'
        } else if (location.pathname.includes('/login?source=loyalty')) {
            document.title = 'Volerò - Loyalty'
        }
    }, [location])

    const [formType, setFormType] = useState('login');

    const [salesId, setSalesId] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    // const [newPassword, setNewPassword] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault();

        const tokenUrl = 'https://www.volero.net/reseller/oauth2/token';
        const formUrl = 'https://www.volero.net/reseller/oauth2/authorize';
        const redirectUrl = 'https://www.volero.net/reseller/home/';

        const clientId = 'a3e3fea730714437a5c0d30937d590cc';
        const clientSecret = '0dc5156575814fe1a783134c27e34ae8';

        const loginData = {
            salesId: salesId,
            username: username,
            password: password,
        };

        try {
            const tokenResponse = await axios.post(tokenUrl, new URLSearchParams({
                grant_type: 'client_credentials',
                client_id: clientId,
                client_secret: clientSecret,
            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
    
            const accessToken = tokenResponse.data.access_token;
            console.log('Access Token:', accessToken);
    
            const response = await axios.post(formUrl, loginData, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.status === 200) {
                console.log('Login successful! Redirecting...');
                window.open(redirectUrl, '_blank');
            } else {
                console.error('Login failed:', response.status, response.data);
            }
        } catch (error) {
            console.error('Error during authentication:', error.response?.data || error.message);
        }
        // await postLoginMain(data);
    }

    const handleLoginLoyalty = async (e) => {
        e.preventDefault();

        // const formData = new URLSearchParams();
        // formData.append('resellerCode', salesId);
        // formData.append('username', salesId);
        // formData.append('password', username);
        // formData.append('action', 'login');

        // const loginInIrix = await axios.post('https://185.131.222.183/_test/admin/auth/', formData, {
        //     headers: {
        //         'Content-Type': 'application/x-www-form-urlencoded',
        //     },
        // });
        // if(loginInIrix){
        //     console.log("loh");

        // }
        // console.log(loginInIrix.data);


        const responce = await postAuth(salesId, username)

        if (responce.data.access_token) {
            navigate('/admin/agents')

        } else {
            const response = await getUserFromLoyalty(salesId, username);

            if (response !== undefined) {
                notification.success({
                    message: 'Successful login',
                    description: 'You have successfully logged into the loyalty system!',
                    duration: 3
                });
                navigate(`/points/${response.data.salesId}/${response.data.username}/${response.data.id}`, {
                    state: { agent: response.data }
                });
            } else {
                notification.error({
                    message: 'Error',
                    description: 'Agent not found or blocked',
                    duration: 3
                });
            }
        }
    }




    // const handle2FACodeSubmit = async (code) => {
    //     try {
    //         const response = await axios.post('https://www.volero.net/reseller/auth/2fa/authenticator', {
    //             code: code,
    //         }, {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             }
    //         });

    //         if (response.status === 200) {
    //             console.log('2FA successful');
    //         }
    //     } catch (error) {
    //         console.error('Ошибка двухфакторной аутентификации:', error);
    //     }
    // };



    return (
        <div>
            <Header />
            <div className='main'>
                <div className={window.innerWidth > 426 ? 'container' : ''}>
                    <div className='white__background'>
                        <div className='register__text'>
                            <div className='title'>Welcome to Volerò</div>
                            <p>Fill in your login credentials to access the platform</p>
                        </div>
                        {source === 'main' && (
                            <div className={window.innerWidth > 426 ? 'login__block' : 'login__block__mobile'}>
                                <button className='already__btn' onClick={() => { navigate('/register') }}>
                                    <u>I don't have an account</u>
                                </button>
                                {formType === 'login' &&
                                    <form className="login__form" onSubmit={handleLogin}>
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
                                                onChange={(e) => setPassword(e.target.value)}
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
                        )}
                        {source === 'loyalty' && (
                            <div className={window.innerWidth > 426 ? 'login__block' : 'login__block__mobile'}>
                                <form className="login__form" onSubmit={handleLoginLoyalty}>
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

                                    <button type="submit" className='log__btn'>Login</button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
