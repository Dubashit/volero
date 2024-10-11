import React, { useState, useEffect } from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import './index.css';
import { useLocation, useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Volerò - Registration'
  }, [location]);

  const navigate = useNavigate();

  const [formType, setFormType] = useState('personal');
  const [isPersonalFormSubmitted, setIsPersonalFormSubmitted] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');

  const [companyName, setCompanyName] = useState('');
  const [companyType, setCompanyType] = useState('');
  const [roleInCompany, setRoleInCompany] = useState('');
  const [country, setCountry] = useState('');
  const [hearAboutUs, setHearAboutUs] = useState('');
  const [reason, setReason] = useState('');

  const isFormValid = firstName && lastName && email && mobile;

  const handleContinueClick = (event) => {
    event.preventDefault();
    if (formType === 'personal') {
      console.log('First Name:', firstName);
      console.log('Last Name:', lastName);
      console.log('Email:', email);
      console.log('Mobile :', mobile);
      setIsPersonalFormSubmitted(true);
      setFormType('company');
    } else if (formType === 'company') {
      console.log('Company Name:', companyName);
      console.log('Company Type:', companyType);
      console.log('Role In Company:', roleInCompany);
      console.log('Country:', country);
      console.log('Where did you hear about us:', hearAboutUs);
      console.log('Reason of contacting us:', reason);
    }
  };

  return (
    <div>
      <Header />
      <div className='main'>
        <div className='container'>
          <div className='white__background'>
            <div className='register__text'>
              <div className='title'>Welcome to Volerò</div>
              <p>
                Please successfully request access to the Volero.<br /> As soon as all the data is filled in, you will receive confirmation email.
              </p>
            </div>
            <div className='register__block'>
              <button className='already__btn' onClick={() => { navigate('/login') }}>
                <u>I already have an account</u>
              </button>
              <div className='navbar'>
                <button className='nav__first' onClick={() => setFormType('personal')}>
                  {isPersonalFormSubmitted ? '✔' : '1'}
                </button>
                <div className='nav__line'></div>
                <button
                  className={`nav__second ${isPersonalFormSubmitted ? 'active' : ''}`}
                  onClick={() => setFormType('company')}
                >
                  2
                </button>
              </div>

              {formType === 'personal' && (
                <form className='registration__form' onSubmit={handleContinueClick}>
                  <div className='reg__form__title'>General info</div>
                  <div className='reg__form__group'>
                    <label htmlFor='firstName'>First Name</label>
                    <input
                      type='text'
                      id='firstName'
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>

                  <div className='reg__form__group'>
                    <label htmlFor='lastName'>Last Name</label>
                    <input
                      type='text'
                      id='lastName'
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>

                  <div className='reg__form__group'>
                    <label htmlFor='email'>Email</label>
                    <input
                      type='email'
                      id='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className='reg__form__group'>
                    <label htmlFor='mobile'>Mobile</label>
                    <input
                      type='tel'
                      id='mobile'
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      required
                    />
                  </div>

                  <button className='log__btn' disabled={!isFormValid}>
                    Continue
                  </button>
                </form>
              )}

              {formType === 'company' && (
                <form className='registration__form' onSubmit={handleContinueClick}>
                  <div className='reg__form__title'>Company details</div>
                  <div className='reg__form__group'>
                    <label htmlFor='companyName'>Company Name</label>
                    <input
                      type='text'
                      id='companyName'
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      required
                    />
                  </div>

                  <div className='reg__form__group'>
                    <label htmlFor='companyType'>Company Type</label>
                    <select
                      id='companyType'
                      value={companyType}
                      onChange={(e) => setCompanyType(e.target.value)}
                      required
                    >
                      <option value=''>Select...</option>
                      <option value='Travel Agency'>Travel Agency</option>
                      <option value='Tour Operator'>Tour Operator</option>
                      <option value='Wholesaler'>Wholesaler</option>
                      <option value='Freelancer'>Freelancer</option>
                      <option value='OTA'>OTA</option>
                      <option value='Corporate'>Corporate</option>
                    </select>
                  </div>

                  <div className='reg__form__group'>
                    <label htmlFor='roleInCompany'>Role In Company</label>
                    <input
                      type='text'
                      id='roleInCompany'
                      value={roleInCompany}
                      onChange={(e) => setRoleInCompany(e.target.value)}
                      required
                    />
                  </div>

                  <div className='reg__form__group'>
                    <label htmlFor='country'>Country</label>
                    <select
                      id='country'
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      required
                    >
                      <option value=''>Select Country</option>
                      <option value='USA'>USA</option>
                      <option value='UK'>UK</option>
                      <option value='Germany'>Germany</option>
                    </select>
                  </div>

                  <div className='reg__form__group'>
                    <label htmlFor='hearAboutUs'>Where did you hear about us?</label>
                    <select
                      id='hearAboutUs'
                      value={hearAboutUs}
                      onChange={(e) => setHearAboutUs(e.target.value)}
                      required
                    >
                      <option value=''>Select...</option>
                      <option value='Partner Referral'>Partner Referral</option>
                      <option value='Social Media'>Social Media</option>
                      <option value='Travel Fairs'>Travel Fairs</option>
                      <option value='Webinars'>Webinars</option>
                      <option value='Sales meetings'>Sales meetings</option>
                      <option value='Software Company'>Software Company</option>
                      <option value='Others'>Others</option>
                    </select>
                  </div>

                  <div className='reg__form__group'>
                    <label htmlFor='reason'>Reason of contacting us</label>
                    <select
                      id='reason'
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      required
                    >
                      <option value=''>Select...</option>
                      <option value='Become a new client'>Become a new client</option>
                      <option value='Become a new supplier'>Become a new supplier</option>
                      <option value='Others'>Others</option>
                    </select>
                  </div>

                  <button type='submit' className='log__btn'>Send</button>
                </form>
              )}

            </div>
          </div>
        </div>
        <div className='register__block__mobile'>
          <button className='already__btn' onClick={() => { navigate('/login') }}>
            <u>I already have an account</u>
          </button>
          <div className='navbar'>
            <button className='nav__first' onClick={() => setFormType('personal')}>
              {isPersonalFormSubmitted ? '✔' : '1'}
            </button>
            <div className='nav__line'></div>
            <button
              className={`nav__second ${isPersonalFormSubmitted ? 'active' : ''}`}
              onClick={() => setFormType('company')}
            >
              2
            </button>
          </div>

          {formType === 'personal' && (
            <form className='registration__form' onSubmit={handleContinueClick}>
              <div className='reg__form__title'>General info</div>
              <div className='reg__form__group'>
                <label htmlFor='firstName'>First Name</label>
                <input
                  type='text'
                  id='firstName'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>

              <div className='reg__form__group'>
                <label htmlFor='lastName'>Last Name</label>
                <input
                  type='text'
                  id='lastName'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>

              <div className='reg__form__group'>
                <label htmlFor='email'>Email</label>
                <input
                  type='email'
                  id='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className='reg__form__group'>
                <label htmlFor='mobile'>Mobile</label>
                <input
                  type='tel'
                  id='mobile'
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                />
              </div>

              <button className='log__btn' disabled={!isFormValid}>
                Continue
              </button>
            </form>
          )}

          {formType === 'company' && (
            <form className='registration__form' onSubmit={handleContinueClick}>
              <div className='reg__form__title'>Company details</div>
              <div className='reg__form__group'>
                <label htmlFor='companyName'>Company Name</label>
                <input
                  type='text'
                  id='companyName'
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                />
              </div>

              <div className='reg__form__group'>
                <label htmlFor='companyType'>Company Type</label>
                <select
                  id='companyType'
                  value={companyType}
                  onChange={(e) => setCompanyType(e.target.value)}
                  required
                >
                  <option value=''>Select...</option>
                  <option value='Travel Agency'>Travel Agency</option>
                  <option value='Tour Operator'>Tour Operator</option>
                  <option value='Wholesaler'>Wholesaler</option>
                  <option value='Freelancer'>Freelancer</option>
                  <option value='OTA'>OTA</option>
                  <option value='Corporate'>Corporate</option>
                </select>
              </div>

              <div className='reg__form__group'>
                <label htmlFor='roleInCompany'>Role In Company</label>
                <input
                  type='text'
                  id='roleInCompany'
                  value={roleInCompany}
                  onChange={(e) => setRoleInCompany(e.target.value)}
                  required
                />
              </div>

              <div className='reg__form__group'>
                <label htmlFor='country'>Country</label>
                <select
                  id='country'
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                >
                  <option value=''>Select Country</option>
                  <option value='USA'>USA</option>
                  <option value='UK'>UK</option>
                  <option value='Germany'>Germany</option>
                </select>
              </div>

              <div className='reg__form__group'>
                <label htmlFor='hearAboutUs'>Where did you hear about us?</label>
                <select
                  id='hearAboutUs'
                  value={hearAboutUs}
                  onChange={(e) => setHearAboutUs(e.target.value)}
                  required
                >
                  <option value=''>Select...</option>
                  <option value='Partner Referral'>Partner Referral</option>
                  <option value='Social Media'>Social Media</option>
                  <option value='Travel Fairs'>Travel Fairs</option>
                  <option value='Webinars'>Webinars</option>
                  <option value='Sales meetings'>Sales meetings</option>
                  <option value='Software Company'>Software Company</option>
                  <option value='Others'>Others</option>
                </select>
              </div>

              <div className='reg__form__group'>
                <label htmlFor='reason'>Reason of contacting us</label>
                <select
                  id='reason'
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                >
                  <option value=''>Select...</option>
                  <option value='Become a new client'>Become a new client</option>
                  <option value='Become a new supplier'>Become a new supplier</option>
                  <option value='Others'>Others</option>
                </select>
              </div>

              <button type='submit' className='log__btn'>Send</button>
            </form>
          )}

        </div>
      </div>
      <Footer />
    </div>
  );
}
