import React, { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './index.css'

export default function PhoneNumberInput({ onPhoneSelect, onCountrySelect }) {
    const [phone, setPhone] = useState('');
    const [dialCode, setDialCode] = useState('');

    useEffect(() => {
        if (phone.startsWith(dialCode)) {
            const localPhone = phone.slice(dialCode.length);
            onPhoneSelect(localPhone);
        } else {
            onPhoneSelect(phone);
        }
        onCountrySelect(dialCode)
    }, [phone, dialCode, onPhoneSelect, onCountrySelect])

    return (
        <div className="phone-input-container">
            <PhoneInput
                country={'ua'}
                value={phone}
                onChange={(phone, countryData) => {
                    setPhone(phone);
                    setDialCode(countryData.dialCode);
                }}
                inputStyle={{
                    width: '100%',
                    backgroundColor: '#fff',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    padding: '10px 60px',
                    height: '45px',
                    fontSize: '15px'
                }}
                buttonStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #ddd',
                    height: '45px'
                }}
            />
        </div>
    );
}
