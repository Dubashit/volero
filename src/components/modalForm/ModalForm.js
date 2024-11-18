// Modal.js
import React, { useState } from 'react';
import './index.css';
import PhoneNumberInput from '../phoneNumberInput/PhoneNumberInput';
import { postRequestForPoints } from '../../api';

export default function ModalForm({ show, onClose }) {

    const [username, setuUsername] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [countryCode, setCountryCode] = useState('')
    const [message, setMessage] = useState('')

    if (!show) return null;

    const sendForm = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('username', username)
            formData.append('email', email)
            formData.append('phone', phone)
            formData.append('countryCode', countryCode)
            formData.append('message', message)
            formData.append('isDone', 'notCompleted')

            await postRequestForPoints(formData, onClose)
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <span className="close" onClick={onClose}>&times;</span>
                <div className='title'>Contact Us</div>
                <form onSubmit={sendForm}>
                    <div className='point__form__group'>
                        <label htmlFor='username'>Username:</label>
                        <input
                            type='text'
                            id='username'
                            value={username}
                            onChange={(e) => setuUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className='point__form__group'>
                        <label htmlFor='email'>Email:</label>
                        <input
                            type='email'
                            id='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className='point__form__group'>
                        <label htmlFor='phone'>Phone number:</label>
                        <PhoneNumberInput
                            onPhoneSelect={setPhone}
                            onCountrySelect={setCountryCode}
                        />
                    </div>
                    <div className='point__form__group'>
                        <label htmlFor='message'>Message:</label>
                        <textarea
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}
