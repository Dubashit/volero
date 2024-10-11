import React, { useEffect, useRef, useState } from 'react'
import './index.css'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import ScrollToTopButton from '../../components/scrollToTopButton/ScrollToTopButton'
import { useLocation } from 'react-router-dom'

export default function PrivacyPage() {

    const location = useLocation()

    const [isFixed, setIsFixed] = useState(false);
    const firstBlockRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const firstBlock = firstBlockRef.current;
            if (firstBlock) {
                const { bottom } = firstBlock.getBoundingClientRect();
                if (bottom < 0) {
                    setIsFixed(true);
                } else {
                    setIsFixed(false);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0)
        document.title = 'Volerò - Privacy Policy'
    }, [location])

    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            const elementPosition = section.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - 70;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div>
            <Header />
            <div className='main'>
                <div className='gray__background' ref={firstBlockRef}>
                    <div className='container'>
                        <div className='privacy__fisrt__block'>
                            <div className='title'>Privacy Policy</div>
                            <p>This Privacy Policy will help you better understand how we collect, use, and share your personal information.</p>
                        </div>
                    </div>
                </div>
                <div className='white__background'>
                    <div className='container'>
                        <div className='privacy__second__block'>
                            <div className='privacy__content'>
                                <div className='subtitle' id='introduction'>Introduction</div>
                                <p>The main function of our Site is to provide company information and we do not sell any products or services directly
                                    through it. We may however collect and process some personal information about its visitors and this is described in this “Privacy Policy”.</p>
                                <p>If you access, visit or use this Site, you are agreeing to us collecting, storing, transferring or processing this data, as set out in this Policy.</p>
                                <ul>
                                    <li>Information that you provide us with for marketing purposes may be used by us on mailing lists to inform you about our company’s products or services.
                                        Subscription to any of these is voluntary and you have the right to unsubscribe at any time</li>
                                    <li>Any information that you provide us with in correspondence during any contact with us, will be kept as a record in order for us to be able to
                                        communicate with you. This includes but is not limited to correspondence regarding business cooperation, recruitment, advertising, etc.</li>
                                    <li>We may on occasion request you to complete a survey for research and statistical purposes. If you provide this information, it is voluntary
                                        and you are in no way obliged to provide this information.</li>
                                    <li>We may collect information about your visit to this Site and the areas that you visit. This can include, but is not limited to, location data,
                                        traffic data, communication data and weblogs. This does not identify a particular individual visiting our Site and we collect the information in
                                        order monitor how users are accessing our content and to ensure it is delivered effectively for you and your computer.</li>
                                    <li>Data transmitted by the system, including cookies and their usage, as well as personal data such as:
                                        <ol>
                                            <li>Browser/Version</li>
                                            <li>Operating system</li>
                                            <li>Referrer URL (the page visited before)</li>
                                            <li>Host name of the accessing computer (IP address)</li>
                                            <li>Time of the server request</li>
                                        </ol>
                                    </li>
                                    <li>Is automatically transmitted from your computer to us and stored on our server. These “Cookies” are usually small text files, given ID tags that
                                        are stored on your computer's browser directory or program data subfolders. Cookies are created when you use your browser to visit a website that
                                        uses cookies to keep track of your movements within the site, help you resume where you left off, remember your registered login, theme selection,
                                        preferences, and other customization functions. Like many companies, we use these to enhance your customer experience but you can use our Site without
                                        these if preferred. You can disable the use of Cookies at any point by changing your browser settings.</li>
                                </ul>
                                <p>Information you provide us with is stored securely on our servers.
                                    The transmission of information via the internet is unfortunately not completely secure. Although we will do our utmost to protect your personal data, we cannot
                                    guarantee the security of any data transmitted to our site; transmission of this is at your own risk. Once we have received your information, we will use strict
                                    procedures and security features to try to prevent unauthorized access.</p>
                                <br /><br /><br /><br />
                                <div className='subtitle' id='data'>Data Protection Policy<br />SECTION ONE: INTRODUCTION</div>
                                <p>Volero receive instructions from its clients. These instructions concern Volero making hotel bookings which are part of the holiday packages. The tourist for whom
                                    the holiday is arranged is the end user. As Volerol is processing the end user’s requirements on behalf of the client and is accountable to the client, Volero is
                                    proceeding on the basis that Volero the data processor and the client is the data controller. Volero will have no dealings with the end user.
                                    With effect from 25 May 2018 the General Data Protection Regulations (GDPR) will replace the outgoing 1998 Data Protection Act. When the Data
                                    Protection Bill becomes law that legislation will, post Brexit, enshrine the GDPR in UK law. Reference to the GDPR is also a reference to the
                                    applicable provision of the Data Protection Bill. Reference to an Article is a reference to an Article in the GDPR.
                                    The GDPR places additional obligations and liabilities on data processors. The applicable points are set out below.</p>
                                <ul>
                                    <li>Process personal data only according to the data controller's instructions under Article 29.</li>
                                    <li>Maintain a record of data processing activities that complies with Article 30(2).</li>
                                    <li>Implement appropriate technical and organizational measures in compliance with Article 32.</li>
                                    <li>Have written data controller authorization before engaging subcontractors under Article 28(2) and pass obligations down to any data processors it engages via
                                        contract as specified in Article 28(4).</li>
                                    <li>Notify the data controller of any security breach without undue delay in accordance with Article 33(2).</li>
                                    <li>Only transfer personal data internationally in accordance with Article 44, which requires the data processor to have a compliant data transfer mechanism.</li>
                                    <li>Make available to the data controller all information for the data controller to demonstrate compliance with its obligations under Article 28 (Processors), as set out in Article 28(3)(h).</li>
                                </ul>
                                <p>Volero is aware of these obligations. The purpose of this document is to outline the necessary contractual clauses and to disclose the relevant information pertaining to Tamla’s role as the data processor.</p>
                                <br /><br /><br /><br />
                                <div className='subtitle' id='audit'>SECTION TWO: AUDIT</div>
                                <p>The GDPR requires data processors to confirm that they are GDPR compliant. To that end Volero is happy to disclose certain information. Volero confirms that, unless requested,
                                    personal data disclosed to Volerol will not be transferred outside the European Economic Area. If any such request is made then Volero will insist that the transfer is done
                                    in accordance with the GDPR. Volero will not “profile” people. Volero will be fully transparent. Volero recognizes that its clients in their capacity as data controllers have
                                    to compile its own audits and assessments. Volero will do what is reasonable to assist.</p>
                            </div>
                            <div className={`privacy__list ${isFixed ? 'fixed' : ''}`}>
                                <div className='subtitle'>Table of Contents</div>
                                <div className='privacy__link' onClick={() => scrollToSection('introduction')}>Introduction</div>
                                <div className='privacy__link' onClick={() => scrollToSection('data')}>Data Protection Policy <br /> SECTION ONE: INTRODUCTION</div>
                                <div className='privacy__link' onClick={() => scrollToSection('audit')}>SECTION TWO: AUDIT</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <ScrollToTopButton />
        </div>
    )
}