import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './index.css';

export default function ResumeDetails() {

    const location = useLocation();
    const resume = location.state?.resume;  
    
    useEffect(() => {
        document.querySelector('.main__content__admin').scrollTo(0, 0);
    }, [location]);

    return (
        <div className='all__content__admin'>
            <div className='title__admin'>Resume</div>
            <div className='content__block__admin'>
                <div className='resume__detail__item'>
                    <div className='subtitle__admin resume__title'>Full name :</div>
                    <div className='resume__field'>{resume.name}</div>
                </div>
                <div className='resume__detail__item'>
                    <div className='subtitle__admin resume__title'>Vacancy :</div>
                    <div className='resume__field'>{resume.vacancy}</div>
                </div>
                <div className='resume__detail__item'>
                    <div className='subtitle__admin resume__title'>Phone :</div>
                    <div className='resume__field'>Country code : +{resume.countryCode}<br />National Number : {resume.phone}</div>
                </div>
                <div className='resume__detail__item'>
                    <div className='subtitle__admin resume__title'>City :</div>
                    <div className='resume__field'>{resume.city}</div>
                </div>
                <div className='resume__detail__item'>
                    <div className='subtitle__admin resume__title'>Linkedin profile :</div>
                    <div className='resume__field'>{resume.linkedIn}</div>
                </div>
                <div className='resume__detail__item'>
                    <div className='subtitle__admin resume__title'>From source :</div>
                    <div className='resume__field'>{resume.source}</div>
                </div>
                <div className='resume__detail__item'>
                    <div className='subtitle__admin resume__title'>Resume :</div>
                    <div className='resume__field'>
                        <a href={`http://localhost:4444${resume.cv}`} target="_blank" rel="noopener noreferrer">Open resume</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
