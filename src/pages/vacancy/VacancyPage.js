import React, { useEffect, useRef, useState } from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Inner from '../../components/inner/Inner';
import ScrollToTopButton from '../../components/scrollToTopButton/ScrollToTopButton';
import { useLocation, useNavigate } from 'react-router-dom';
import './index.css';
import FileUpload from '../../components/fileUpload/FileUpload';
import PhoneNumberInput from '../../components/phoneNumberInput/PhoneNumberInput';
import { postResume } from '../../api';

export default function VacancyPage() {

    useEffect(() => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = `${process.env.REACT_APP_API_URL}`;

        document.head.appendChild(link);

        return () => {
            document.head.removeChild(link);
        };
    }, []);

    const location = useLocation();
    const navigate = useNavigate();
    const vacancy = location.state?.vacancy;

    const thirdBlockRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'Volerò - Vacancy'
    }, [location]);

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('');
    const [countryCode, setCountryCode] = useState('')
    const [city, setCity] = useState('')
    const [linkedIn, setLinkedIn] = useState('')
    const [cv, setCv] = useState(null)
    const [source, setSource] = useState('')

    const handleApplyNowClick = () => {
        if (thirdBlockRef.current) {
            thirdBlockRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const sendForm = async (e) => {
        e.preventDefault();

        if (!name || !email || !phone || !city || !linkedIn || !cv) {
            alert('Please fill all fields and upload a CV.');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('countryCode', countryCode);
        formData.append('phone', phone);
        formData.append('city', city);
        formData.append('linkedIn', linkedIn);
        formData.append('cv', cv);
        formData.append('source', source)
        formData.append('vacancy', vacancy.title)

        await postResume(formData, navigate)
    }

    if (!vacancy) {
        return (
            <div>
                <Header />
                <div className="main">
                    <div className='gray__background'>
                        <div className='container'>
                            <div className='vacancy__error__content'>
                                <h2>Vacancy details not available</h2>
                                <button onClick={() => navigate('/vacancies')}>Back to Vacancies List</button>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div>
            <Header />
            <div className='main'>
                <div className='gray__background'>
                    <div className='container'>
                        <div className='vacancy__first__block'>
                            <div className='title__block'>
                                <div className='title__line'></div>
                                <div className='title__text'>Our vacancy</div>
                            </div>
                            <div className='title'>{vacancy?.title || 'Vacancy Title Not Available'}</div>
                            {/* <div className='vacan__details'>{vacancy.location} &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; {vacancy.employmentType}</div> */}
                            <div className='vacan__details'>
                                {vacancy?.location ? `${vacancy.location} | ${vacancy.employmentType}` : 'Location and employment type not available'}
                            </div>

                            <button className='vacancy__btn' onClick={handleApplyNowClick}>Apply now</button>
                        </div>
                    </div>
                </div>
                <div className='white__background'>
                    <div className='container'>
                        <div className='vacancy__second__block'>
                            <Inner serverContent={vacancy?.body} />
                        </div>
                    </div>
                </div>
                <div ref={thirdBlockRef} className='gray__background'>
                    <div className='container'>
                        <div className='vacancy__third__block'>
                            <div className='third__block__content'>
                                <div className='title__block'>
                                    <div className='title__line'></div>
                                    <div className='title__text'>Send resume</div>
                                </div>
                                <div className='title'>Apply for this job</div>
                                <p>Please provide all the necessary information to successfully apply for this vacancy.
                                    As soon as all the data is filled in, our manager will provide all the necessary information regarding further actions</p>
                            </div>
                            <form className='vacancy__form'>
                                <div className='form__group'>
                                    <div className='group__title'>Name</div>
                                    <input
                                        type='text'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className='form__group'>
                                    <div className='group__title'>Email</div>
                                    <input
                                        type='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className='form__group'>
                                    <div className='group__title__option'>Phone number</div>
                                    <PhoneNumberInput
                                        onPhoneSelect={setPhone}
                                        onCountrySelect={setCountryCode}
                                    />
                                </div>
                                <div className='form__group'>
                                    <div className='group__title'>City</div>
                                    <input
                                        type='text'
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className='form__group'>
                                    <div className='group__title'>Link to your LinkedIn profile</div>
                                    <input
                                        type='text'
                                        value={linkedIn}
                                        onChange={(e) => setLinkedIn(e.target.value)}
                                        required
                                    />
                                </div>
                                <FileUpload onFileSelect={setCv} />
                                <div className='form__group'>
                                    <div className='group__title__option'>Where did you learn about us?</div>
                                    <select onChange={(e) => setSource(e.target.value)}>
                                        <option value={''}></option>
                                        <option value={'Word of Mouth'}>Word of Mouth</option>
                                        <option value={'Recommendation'}>Recommendation</option>
                                        <option value={'Trade shop'}>Trade shop</option>
                                        <option value={'Social media'}>Social media</option>
                                        <option value={'Volero staff'}>Volero staff</option>
                                        <option value={'Software company'}>Software company</option>
                                        <option value={'Other'}>Other</option>
                                    </select>
                                </div>
                                <button className='form__btn' onClick={sendForm}>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <ScrollToTopButton />
        </div>
    );
}
