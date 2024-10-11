import React, { useEffect, useRef, useState } from 'react'
import './index.css'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import ScrollToTopButton from '../../components/scrollToTopButton/ScrollToTopButton'
import { useLocation } from 'react-router-dom'

export default function TermsOfUsePage() {

    const location = useLocation()

    const [isFixed, setIsFixed] = useState(false);
    const firstBlockRef = useRef(null);
    const lastItem = useRef(null)

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
        document.title = 'Volerò - Terms of Use'
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
                        <div className='terms__fisrt__block'>
                            <div className='title'>Terms of Use</div>
                            <p>This Privacy Policy will help you better understand how we collect, use, and share your personal information.</p>
                        </div>
                    </div>
                </div>
                <div className='white__background'>
                    <div className='container'>
                        <div className='terms__second__block'>
                            <div className='terms__content'>
                                <div className='subtitle' id='introduction'>Introduction</div>
                                <p>Agreement between the Client ( "CLIENT") and Volero Tourism Ltd. ,holder of https://volero.net ,("Volero").</p>
                                <p>Please read these terms and conditions carefully (Terms & Conditions) before using the website https://volero.net ("The WEBSITE").</p>
                                <div className='subtitle' id='site'>Site</div>
                                <p>The site is owned by Volero Tourism Ltd., an Israeli legal entity, with its registered office at 7 Mesada st. Besser 4 Building Bnei Brak
                                    Israel, registered at the Trade Register under: 516324787.</p>
                                <div className='subtitle' id='acceptance'>Acceptance of Terms of Use</div>
                                <p>By using this Site you fully agree to these Terms of Use without any further restrictions. Please note that all transactions made through
                                    this site or through the Customer Support department are subject to this regulation. When making the reservation or purchasing the offer
                                    available on "The Site", the "CLINET" and its users unconditionally accepts the Terms of Use of this site.</p>
                                <div className='subtitle' id='services'>"Volero" services</div>
                                <p>"Volero" offers the user an online booking tool ( "The site"), with a possibility to search and and book in real time availability different
                                    tourist services in competitive price. "Volero" is limited to intermediation between the client and suppliers. "The site" acts as an agent
                                    for third party providers, such as: airlines, hotels, other tourism service providers. "Volero" does not assume any responsibility for the
                                    services offered by the tourist service providers and does not guarantee in any way (explicitly or implicitly) the accuracy or quality of
                                    the services promoted on this site.</p>
                                <div className='subtitle' id='informationPublished'>The information published on the site</div>
                                <p>"Volero" provides through the site general information, for advisory purposes. For this reason, we recommend "Client" users to carefully read
                                    the Regulations of Tourist Service Providers and / or to check with the embassy or tourist office at the destination, the actuality of the
                                    information on the site, related to the calendar period, geographical area, restrictions, terms and conditions imposed by certain domestic and international bodies.
                                    "Volero" does not provide any guarantee regarding the arrangements of travel documents (passports, visas, necessary vaccinations, etc.) nor the
                                    fact that the information on the site is updated.It is the user's responsibility to ensure that he / she travels in accordance with the measures
                                    applicable to these travel documents. "Volero" makes every effort to ensure that the information on the site (including rates, descriptions, data)
                                    is current and in line with reality and in the event that you notify us of the slightest error or lack of information, it will be corrected in the shortest time.</p>
                                <div className='subtitle' id='travelService'>Travel Service</div>
                                <p>The following additional Terms and Conditions apply to the CLIENT’s (hereinafter also referred to as “Passenger”) booking travel services through Volero site.</p>
                                <p>The service booked may only be used by the person(s) named on the booking or for whom it has been purchased and may not be transferred to or used by anyone else.
                                    The person that requests the Website/XML booking-form must have the authority to do so from all the other travelers in the group and confirm that the people named
                                    on it accept the booking conditions, and is responsible for the full cost of the service, including any cancellation or amendment charges. He/she will inform other
                                    members of the party of confirmation details and any other appropriate information.</p>
                                <p>The Client may only use the Booking System and XML Interface and the Net Prices only apply for FIT sales only. Reservation requests for 10 and more people must be
                                    sent to Volero by email to info@volero.net. If the Client attempts to flout this rule by splitting groups to make them appear as FIT sales, hotels will be within
                                    their rights to levy charges for group cancellation or otherwise, for which the Client will be liable. The Hotel may cancel Reservations the Client has added to
                                    the Booking System, if they appear to it to be group Reservations and not genuine FIT Reservations.</p>
                                <div className='subtitle' id='reservations&booking'>Reservations & Booking Confirmation</div>
                                <p>Communication of the confirmation of the reservation shall be made via the WEBSITE and/or XML integration. Once the Travel Service booking is completed, a voucher
                                    or electronic ticket with the reference number will be available online. The voucher must be printed and presented as proof of reservation.</p>
                                <p>Reservations may be made only per bona fide. Volero has the right to cancel reservations, with a previous email communication, when they appear to have been made with the intention to hold space.</p>
                                <p>Volero reserves the right, previous email communication to the CLIENT, to cancel or amend any booking made, in case of an error or mistake made by Volero or the hotel
                                    regarding a rate. Volero will not be obligated to pay to the CLIENT any compensation other than to refund any amount paid for the reservation.</p>
                                <p>The CLIENT agrees that passenger nationality declaration is mandatory at the time of the request/booking and must be in accordance to the passenger passport. Faulty or no
                                    declaration may cause unwilling consequences for which Volero holds no responsibility. Furthermore, if any financial damage may occur because of faulty
                                    nationality or no declaration, will be covered by the CLIENT towards their customers or to Volero in full.
                                    Volero will not held responsible if the given passengers’ names are as UNKNOWN or TBA or FAKE, and they might not be considered as confirmed by the hotel neither Volero.</p>
                                <p>For any change in the trip due to the contractor's fault (e.g. airlines) or in case of flight delay / cancellation, "Volero" will try to contact the customer by phone or email,
                                    in order to inform him of the changes. In this situation, the "The site" is not responsible for changes in travel, delays, canceled flights, or other changes caused by the
                                    contractor / executor of the service. It is necessary for the user to comply with the regulations of the organizer / provider of the ordered service (egg restrictions imposed
                                    by the airline for check-in and passport control).</p>
                                <p>We recommend the user to check the correctness of the information (first name, last name, date of departure, destination). If you notice any errors, you must notify "Volero"
                                    Customer Service within a maximum of 24 hours of booking to change them. There may be situations, depending on the time of notification of "Volero", in which the correction
                                    of this information will not be possible without certain additional costs, given that the rules for modification and cancellation of the reservation are defined by the provider
                                    of the product / service. Some operators (especially low cost airlines) do not allow corrections resulting from the fault of the person making the reservation.</p>
                                <p>These information errors in the reservation due to the user do not lead to the termination of the contract concluded with "Volero". Airline tickets are sent to him in electronic
                                    format, to the email address indicated during the booking.</p>
                                <div className='subtitle' id='termsOfTravel'>Terms of Travel</div>
                                <p>The terms and conditions of the Travel Service Provider apply in addition to the Terms of use of this site. These may include provisions relating to various payment procedures,
                                    obligations, cancellations, changes to reservations and refunds (if any), or other restrictions.
                                    Some airlines may charge additional fees such as the Transit-with-visa fee. "Volero" is not responsible for additional costs that may arise when transferring from one airport / terminal to another.</p>
                                <p>The user is directly responsible for compliance with all the information and terms of use imposed by the Tourist Service Provider.</p>
                                <ol>
                                    <li>Flight Service - boarding times, reconfirmation of flights. Note that the minimum boarding time (before departure) recommended by airlines is 180 minutes for international flights and 120 minutes for
                                        domestic flights, respectively. Some charter carriers request to reconfirm the flight at least 72 hours before departure and failure to follow this rule may result in the cancellation of the flight reservation.</li>
                                    <li>Accommodation service- check in/out time, room types, board basis, Bedding Type, Min.age stay, local tax and more.</li>
                                    <li>Transfers- Pick up and Drop off Meeting point, scheduled Time, No, of luggage, No, of Passengers, Contact details etc.</li>
                                    <li>Activities- Meeting point, Voucher collection details, No. of Visitors specify on the voucher, etc.</li>
                                    <li>Car Rental- Valid International driving license , min age, Meeting point, Car type etc.</li>
                                </ol>
                                <p>If the client use “Special requests” option, "Volero" does not guarantee the confirmation of these requests, but will send them to the Tourist Service Provider. It is the user's responsibility to reconfirm directly with the Travel Service Provider if these special requests can be met.
                                    While browsing the "Volero" website, you will be able to observe references to different conditions applicable to special offers. We recommend that you read these terms carefully and for complete details, contact the "Volero" FIT team (Customer Support) directly.</p>
                                <div className='subtitle' id='prices'>Prices</div>
                                <p>The prices offered to the user are confidential and may not be disclosed to any third party to this Agreement, including any subsidiary, affiliate or holding company or any subsidiary of its holding company of the user.
                                    Prices quoted on the site and/or XML integration are net prices (non-commissionable) including all indirect taxes, unless specified differently. Any increase in tax will be directly added to the prices offered in this agreement. Any other taxes such as tourist tax, Resort Fees and/or local, city, state taxes are not included. These taxes need to be paid at the hotel by the passenger (“guest taxes”). Also, some hotels in certain destinations charge a resort fee or similar, which must be paid to the hotel directly by the Client. Volero is not responsible for resort fee charges and has no control over their implementation.</p>
                                <p>The user hereby commits to not use Volero prices appeared on "The site" and/or XML integration to contact Volero suppliers disclosing such prices for the purpose of negotiating new rates and/or any other meaning, in this event, the "USER" shall indemnify Volero and Volero will notify the supplier the illicit use of the rates by "THE USER".
                                    The price includes All services, products and fees agreed upon the WEBSITE and/or XML integration.
                                    The price does not include any service not specified in the reservation confirmation. Both price and availability of the selected service may be subject to change before confirmation of the booking.</p>
                                <div className='subtitle' id='airPrice'>Air Fare price</div>
                                <ol>
                                    <li>Full Price. The Full Price that is displayed on Our Website is the final price for the Flight ticket(s) and it includes the base fare to the Destination, the airport charges, fuel charges, VAT and price of Our Services. Provided You add them during the Booking, Full Price includes also other fees, charges or payments for services related to Your carriage under the Contract of Carriage, which are provided by the Selected Carrier(s) and/or third parties, such as priority boarding, or any ancillary services such as luggage, paid seats, meal, etc. However, it does not include other fees, charges or payments for Our Additional Services (Handling Fees), tourist taxes, banking fees, visa fees, airport transfer fees etc.</li>
                                    <li>Price change. Please note that in case the price of the Flight ticket(s) changes any time after You make Your Booking with Us, namely when the price becomes lower, We are not obligated to provide You with any kind of a refund, because We booked Your Flight(s) and processed the respective payment(s) for the price valid at the time of Your Booking and We are unable to make any further changes in this regard.</li>
                                    <li>VOID Ticket- is possible only at the same date of booking.</li>
                                    <li>Refunds-</li>
                                </ol>
                                <div className='subtitle' id='vaucher'>Voucher & Air Ticket</div>
                                <p>The voucher and Air Ticket will show all the information necessary to reach the service. The voucher will also show a contact telephone number for checking the booking and informing about contingencies.</p>
                                <div className='subtitle' id='changes'>Changes/amendments</div>
                                <p>Changes/amendments are allowed and base on the cancellation policy of the reservation.
                                    Each booking must have full guest / PAX name per room and the passenger entered first, will automatically assigned as lead name and the lead name will appear on all correspondence (example: vouchers, invoices, etc.). The lead name cannot be modified once the booking has been confirmed, unless is requested and agreed by email. The hotel / supplier reserves the right to reject the booking, without giving any notice, if the guest(s) full name(s) for each room booked is not provided.
                                    Schedule Flight Cancellations and Modifications are subjected to Airlines Terms and conditions. Low Cost Carriers ( LCC) bookings are subject to 100% cancellation fees once booking is made. If the user wishes to cancel or modify the reserved / purchased service (and the Service Provider allows this), he has the responsibility to inform Volero (Customer support Department) at support@volero.net for land services. The reservation may be canceled in accordance with the Terms and Conditions of the Tourist Service Provider. In some cases you may not be able to cancel / modify certain travel services or you may have to comply with certain
                                    requirements for these actions. If the cancellation / modification email is sent outside the working hours of the Customer Support department, the request will be processed the next working day. "Volero" is not responsible if for technical reasons in the process of communication with the user there are errors or problems in sending messages</p>
                                <p>In the event of a reservation being modified,"Volero" reserves the right to apply certain fees to cover the administrative costs resulting from this action. These fees are different / separate from the fees charged directly by the Supplier.
                                    In the event of duplicate Bookings the Company may incur additional charges for all such identical confirmed Bookings. Volero will endeavor to minimize the charges but cannot guarantee to waive these charges, in part or in whole.
                                    If a hotel is overbooked, then the hotel may offer alternative accommodation for the Customer. We will advise you immediately, upon receipt of such notice from the Provider, and you will be free to accept or decline and cancel the reservation with us within 24 hours. For clarification, we will bear no liability towards yourselves and/or the Customers for any such overbooking or for any failure to find alternative accommodation. Should the Customer wish to re-book a different hotel or facility at a higher price, then, he/she will be liable for the additional costs.
                                    Any amendments or cancellations of bookings must be made directly through us and not via the Provider. Should you fail to comply with this, full charges will apply for the Travel Products booked through us, regardless of your direct dealings with the Provider.</p>
                                <div className='subtitle' id='cancellation'>Cancellation</div>
                                <p>Cancellations policies will be advised at the time of booking.
                                    Volero reserves the right to cancel any bookings due to non-payment of dues. Volero will give notice to the client for such cancellations. Cancellations and/or changes requested by the Client shall be authorized solely by Volero. Where in exceptional circumstances, if any obvious pricing or data errors are found on the Volero website, they should be immediately brought to Volero's notice, so appropriate corrections can be made. Volerol reserves the right to either cancel or relocate any confirmed booking where such an obvious error is identified.</p>
                                <div className='subtitle' id='no-shows'>No-shows</div>
                                <p>A no-show by the passenger without prior warning shall be considered a cancellation. No reimbursement to the final consumer shall be made in the event of a 'no-show' without prior consultation with and express authorization from Volerol.</p>
                                <p>The CLIENT provides information for the booking of the Travel Service. It is the client’s responsibility to check the voucher and air ticket for any errors.</p>
                                <p>The final consumer must present the voucher or air ticket to the service provider upon request.</p>
                                <p>Non-refundable rates.</p>
                                <p>The non-refundable rates do not allow any changes or amendments. In the event of a cancellation it would be 100% penalties. No reimbursement to the final consumer shall be made.</p>
                                <p>The reservation with non-refundable rates should be paid at the time of the booking and it would be included on the current invoice period.</p>
                                <div className='subtitle' id='usage'>Usage of WEBSITE</div>
                                <p>Volero site is not responsible for the User's skills to access or use the site, nor for the failures generated by the lack of these skills.
                                    "Volero" is not responsible for the costs that may arise from the incorrect use of the service or the misinterpretation of the information contained therein.</p>
                                <p>"Volero" tends to a good functioning of the site, but cannot guarantee that the site cannot be affected by viruses or other actions that can generate failures or other losses. The same applies to other information contained on this site and the services provided by third parties because the site contains links to other websites. "Volero" is therefore not responsible for their availability or for their privacy policies, their content.</p>
                                <p>The information posted on the site is dynamic and can be changed frequently. "Volerol" has the right to make changes without notifying the customer. "Volero" is not responsible for technical issues that may arise with the Organizers / Service Providers.</p>
                                <p>"Volero" is not responsible and does not compensate for delays, cancellations, strikes or other events that are not under the direct control of "Volero".</p>
                                <div className='subtitle' id='userLiability'>User Liability</div>
                                <p>Neither Volero or the CLIENT shall be liable for the behavior of its final consumers in the event of abnormal behavior, vandalism, or misconduct. In this case, Volero and/or the service supplier reserve the right to automatically cancel final consumer stay or reservations with no right of the final consumer to any compensation whatsoever.
                                    Any incidents that may and could be resolved during the provision of the travel services shall be addressed and resolved by the CLIENT and the Hotel directly.</p>
                                <p>Notwithstanding the above Volero’ entire liability under this Agreement, whether in contract, tort (including breach of statutory duty), or otherwise shall not exceed the sums paid by the CLIENT to Volero for the specific services in question. Neither party shall be liable for any indirect, special, or consequential loss, including economic loss, which term shall include, but not be limited to, loss of profits, loss of use of profits, business, revenue, goodwill or anticipated savings.</p>
                                <div className='subtitle' id='voleroliability'>Volero Liability</div>
                                <p>Volero acts as the CLIENT’s agent and as an independent intermediary in the contracting of accommodation, Air transportation and other tourist services, and thus shall not be held liable for death, injury, illness, damage, loss, accident, theft, delays or any other irregularity which may arise, whether directly or indirectly, from the supply of services the suppliers and which have been contracted via Volero.</p>
                                <p>Volero shall use reasonable endeavor to ensure the suppliers accept liability and indemnify from and against any claims of the CLIENT arising from the provision of the services. Therefore, the CLIENT hereby commits to file any claim for the services directly with the service provider. The CLIENT also acknowledges that Volero has no control over the provision of the services rendered by the service supplier.</p>
                                <p>Volero shall not deal with any claims that have not been presented by the final consumer during the period of the provision of the travel services by the final consumer.</p>
                                <p>Volero shall not be able to negotiate any claim with the service provider that is presented after the date of final consumer departure.</p>
                                <div className='subtitle' id='forceMajor'>Force Major</div>
                                <p>Volero shall have no liability for any delay or failure to carry the passenger or for breach of contract when caused by a circumstance beyond Volero reasonable control.</p>
                                <p>The following shall, without restriction, be considered to be circumstances beyond Volero reasonable control: war or threat of war, accidents causing delays on the service route, exceptional severe weather conditions, fire and/or damage at a station, compliance with requests from the police, customs or other government officials and security services, deaths and accidents on the road, vandalism and terrorism, unforeseen traffic delays, strike/industrial action, riot or local disturbance or unrest, problems caused by other final consumers, bankruptcy, insolvency or cessation of trade of any carrier used by Volero and other circumstances affecting passenger safety.</p>
                                <p>Volero maximum liability to the CLIENT and/or passenger(s) for any reasonable and foreseeable loss, damage or liability which the passenger may suffer or incur as a result of Volero failure, breach of contract, or the deliberate or negligent acts or omissions of any of Volero employees, shall be limited to the reservation price booked.</p>
                                <div className='subtitle' id='disclaimer'>Disclaimer</div>
                                <p>The information on this site is posted in good faith but Volerol cannot guarantee that it is completely free from inaccuracies and typographical errors and does not accept liability for any error or omission on this site. Information on the various services is as accurate as possible given that the information is provided by the service supplier.</p>
                                <p>In no event shall Volero be liable for any direct, indirect, special, punitive, exemplary or consequential losses or damages of whatsoever kind arising out of access to, the use of this WEBSITE and/or XML integration or any information contained in it or the inability to access to, including loss of profit and similar. The Service providers are independent businesses and are not agents or employees of Volerol or its affiliates. These independent business providers provide the services in accordance with their own Terms and Conditions, which may limit or exclude their liability to the CLIENT or the final consumer. Volero and its affiliates are not liable for any acts, omissions, breaches, or negligence of any such independent businesses or any damages or expenses resulting from the aforesaid. Volero and its affiliates are not liable for any refunds in the event of overbooking or force majeure or any other cause beyond their control.</p>
                                <p>To the maximum extent permitted by law, Volero disclaims all implied warranties regarding the information, services and materials contained on this WEBSITE and/or XML integration. All such information, services and materials are provided “as is” and “as available” without warranty of any kind.</p>
                                <div className='subtitle' id='ownership'>Ownership</div>
                                <p>The CLIENT acknowledges and agrees that any element and intellectual property rights pertaining thereto (including without limitation all commercial names, trade names, copyrights, logos, patents, trademarks, service marks and trade secrets) in Volero WEBSITE and/or XML integration (including without limitation its Terms and Conditions, rules, policies and operating procedures, and Volero’ Confidential Information -as defined above-), received or acceded are the exclusive property of Volero or its suppliers.</p>
                                <div className='subtitle' id='contents'>Contents</div>
                                <p>Volero grants to the CLIENT, under these Terms and Conditions, a non-exclusive, royalty-free, non-transferable license to see and use all the elements provided and/or included in the accommodation and other services contents (texts, photographs, descriptions, maps…) available in Volero WEBSITE and/or XML integration (hereinafter referred to as contents). The duration of this license shall be equal to the duration of the commercial agreement between both parties. License may be revoked by Volero at any time giving one-month previous notice. The CLIENT shall be entitled to use the contents provided under this license only in connection with the WEBSITE and/or XML integration run through Volero system and only for the purpose of sale of the travel services provided by Volero or its subsidiaries or affiliates. The contents cannot be used to promote the same service but from another travel intermediary. Volero shall not be held liable for inaccuracies or errors in the accommodation contents or any of its elements.</p>
                                <div className='subtitle' id='changesToVolero'>Changes to Volero WEBSITE and/or XML Integration</div>
                                <p>Volero may make improvements or changes to the information, elements, data, services, and other materials on this WEBSITE and/or XML integration, or terminate this Integration, at any time without notice.</p>
                                <p>Volero may also modify these Terms and Conditions at any time, and such modification shall be effective immediately upon posting of the modified Terms and Conditions on this WEBSITE and/or XML integration.</p>
                                <p>Accordingly, the continued access or use of this WEBSITE and/or XML integration by the CLIENT or Agency is deemed to be their acceptance of the modified Terms and Conditions.</p>
                                <p>Volero may suspend access to the program because of maintenance works, security reasons or force majeure, with no obligation to reimburse or compensate the CLIENT for the time for which access has been suspended.</p>
                                <p>Notices</p>
                                <p>All communications and notices made under this Agreement by the Parties must be in writing to mail address: support@volero.net, as long as there is at all times evidence of receipt by the addressee.</p>
                                <p>Complaints must be reported by Customer to the Provider and "Volero" on a real-time basis. However, we will not be liable for any complaints to Providers. Customer is responsible for making Provider aware of any complaints compensation for a problem which could have been rectified during the Customer's stay, had the Provider been made aware of it.</p>
                                <div className='subtitle' id='newsletter'>Newsletter</div>
                                <p>The Newsletter is a marketing tool which can be used in order to contact and inform the Users via email email about specific marketing and product related topics, news and offers.The Users may be asked to enter their email address via "Subscribe to Newsletter" filed, as well as to confirm via checkbox if marketing offers and news can be sent into his/her email address.</p>
                                <div className='subtitle' id='legislation' ref={lastItem}>Legislation and Courts of Jurisdiction</div>
                                <p>Israel law will govern this Agreement and any non-contractual obligations arising out of or in connection with it.
                                    Each party agrees that the courts of the country of domicile of the defendant of the relevant action have exclusive jurisdiction to determine any dispute arising out of or in connection with this Agreement (including in relation to any non-contractual obligations), provided that any counterclaims shall be ignored in deciding who is the defendant. Where there are separate but related actions the courts with jurisdiction shall be decided by the first of such actions to be issued. Each party irrevocably waives any right that it may have to object to an action being brought in such courts, to claim that the action has been brought in an inconvenient forum, or to claim that such courts do not have jurisdiction.</p>
                            </div>
                            <div className={`terms__list ${isFixed ? 'fixed' : ''}`}>
                                <div className='subtitle'>Table of Contents</div>
                                <div className='terms__link' onClick={() => scrollToSection('introduction')}>Introduction</div>
                                <div className='terms__link' onClick={() => scrollToSection('site')}>Site</div>
                                <div className='terms__link' onClick={() => scrollToSection('acceptance')}>Acceptance of Terms of Use</div>
                                <div className='terms__link' onClick={() => scrollToSection('services')}>"Volero" services</div>
                                <div className='terms__link' onClick={() => scrollToSection('informationPublished')}>The information published on the site</div>
                                <div className='terms__link' onClick={() => scrollToSection('travelService')}>Travel Service</div>
                                <div className='terms__link' onClick={() => scrollToSection('reservations&booking')}>Reservations & Booking Confirmation</div>
                                <div className='terms__link' onClick={() => scrollToSection('termsOfTravel')}>Terms of Travel</div>
                                <div className='terms__link' onClick={() => scrollToSection('prices')}>Prices</div>
                                <div className='terms__link' onClick={() => scrollToSection('airPrice')}>Air Fare price</div>
                                <div className='terms__link' onClick={() => scrollToSection('vaucher')}>Voucher & Air Ticket</div>
                                <div className='terms__link' onClick={() => scrollToSection('changes')}>Changes/amendments</div>
                                <div className='terms__link' onClick={() => scrollToSection('cancellation')}>Cancellation</div>
                                <div className='terms__link' onClick={() => scrollToSection('no-shows')}>No-shows</div>
                                <div className='terms__link' onClick={() => scrollToSection('usage')}>Usage of WEBSITE</div>
                                <div className='terms__link' onClick={() => scrollToSection('userLiability')}>User Liability</div>
                                <div className='terms__link' onClick={() => scrollToSection('voleroliability')}>Volero Liability</div>
                                <div className='terms__link' onClick={() => scrollToSection('forceMajor')}>Force Major</div>
                                <div className='terms__link' onClick={() => scrollToSection('disclaimer')}>Disclaimer</div>
                                <div className='terms__link' onClick={() => scrollToSection('ownership')}>Ownership</div>
                                <div className='terms__link' onClick={() => scrollToSection('contents')}>Contents</div>
                                <div className='terms__link' onClick={() => scrollToSection('changesToVolero')}>Changes to Volero WEBSITE and/or XML Integration</div>
                                <div className='terms__link' onClick={() => scrollToSection('newsletter')}>Newsletter</div>
                                <div className='terms__link' onClick={() => scrollToSection('legislation')}>Legislation and Courts of Jurisdiction</div>
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