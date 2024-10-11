import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import ScrollToTopButton from '../../components/scrollToTopButton/ScrollToTopButton';
import './index.css'
import { getVacancies } from '../../api';

export default function CareerPage() {
    const location = useLocation();
    const navigate = useNavigate()
    const [vacancies, setVacancies] = useState([])

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'Volerò - Career'
        handleFetchVacancies()
    }, [location]);

    const handleFetchVacancies = async ()=>{
        const fetchVacancies = await getVacancies()
        setVacancies(fetchVacancies)
    }

    return (
        <div>
            <Header />
            <div className='main'>
                <div className='gray__background'>
                    <div className='container'>
                        <div className='career__first__block'>
                            <div className='career__content'>
                                <div className='title__block'>
                                    <div className='title__line'></div>
                                    <div className='title__text'>Our career</div>
                                </div>
                                <div className='title'>Join our team</div>
                                <p>We’re a team of hard-working professionals driven by the passion for technology and travel. Trust,
                                    honesty, innovation, and collaboration are the main values that flow through everything we do</p>
                            </div>
                            <div className='images'>
                                <img className='image' src='aboutFirstBlock1.jpg' alt='iam' />
                                <img className='image' src='aboutFirstBlock3.jpg' alt='iam' />
                                <img className='image' src='aboutFirstBlock2.jpg' alt='iam' />
                                <img className='image' src='aboutFirstBlock4.jpg' alt='iam' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='darkgray__background'>
                    <div className='container'>
                        <div className='career__second__block'>
                            <div className='title'>Open positions</div>
                            <p>If our company resonates with you, join our talented team to skyrocket your career</p>
                            {vacancies.map(vacancy => (
                                <div className='vacancy__block'>
                                    <div className='vacancy__content'>
                                        <div className='vacancy__title'>{vacancy.title}</div>
                                        <div className='vacancy__details'>{vacancy.location} &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; {vacancy.employmentType}</div>
                                    </div>
                                    <button className='vacancy__btn' onClick={() => navigate(`/career/vacancy/${vacancy.id}`, { state: { vacancy } })}>Apply now</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <ScrollToTopButton />
        </div >
    )
}