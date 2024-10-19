import React from 'react';
import './index.css';

export default function TeamView() {
    return (
        <div className='head__team'>
            <div className="card">
                <img src="tzafir.PNG" alt="Card" className="card__image" draggable='false' />
                <div className="card__overlay">
                    <a className='link' target='_blank' rel="noopener noreferrer" href='https://www.linkedin.com/in/tzafrir-ben-avinoam-0659465?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app'>
                        <img className="linkedin__icon" src='/linkinWhite.png' alt='linkidin' />
                    </a>
                    <div>
                        <div className="card__name">Tzafrir Ben Avinoam</div>
                        <div className="card__position">Co Founder & CEO</div>
                    </div>
                </div>
            </div>
            <div className='card'>
                <img src="Irina.jpg" alt="Card" className="card__image" draggable='false' />
                <div className="card__overlay">
                    <a target='_blank' rel="noopener noreferrer" href='https://www.linkedin.com/in/irina-lorynets?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app'>
                        <img className="linkedin__icon" src='/linkinWhite.png' alt='linkidin' />
                    </a>
                    <div>
                        <div className="card__name">Irina Lorynets</div>
                        <div className="card__position">Marketing & BD manager</div>
                    </div>
                </div>
            </div>
            <div className='card'>
                <img src="sharona.jpg" alt="Card" className="card__image" draggable='false' />
                <div className="card__overlay">
                    <a target='_blank' rel="noopener noreferrer" href='https://www.linkedin.com/in/sharona-avitay-0842b8197/'>
                        <img className="linkedin__icon" src='/linkinWhite.png' alt='linkidin' />
                    </a>
                    <div>
                        <div className="card__name">Sharona Avitay</div>
                        <div className="card__position">Sales Manager</div>
                    </div>
                </div>
            </div>
            <div className='card'>
                <img src="noa.jpg" alt="Card" className="card__image" draggable='false' />
                <div className="card__overlay">
                    <a target='_blank' rel="noopener noreferrer" href='https://www.linkedin.com/in/sharona-avitay-0842b8197/'>
                        <img className="linkedin__icon" src='/linkinWhite.png' alt='linkidin' />
                    </a>
                    <div>
                        <div className="card__name">Noa Weiss</div>
                        <div className="card__position">Tailor Made Manager</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
