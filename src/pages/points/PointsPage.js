import React, { useState } from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import ScrollToTopButton from '../../components/scrollToTopButton/ScrollToTopButton';
import { useLocation, useNavigate } from 'react-router-dom';
import './index.css';
import ModalForm from '../../components/modalForm/ModalForm';

export default function PointsPage() {
    const location = useLocation();
    const navigate = useNavigate();
    // const agent = location?.state.agent;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    const items = [
        { id: 1, bookingId: "62841", totalValue: 150.32, points: 1.54, currency: "EUR", expiryDate: "20/06/25" },
        { id: 1, bookingId: "62842", totalValue: 150.32, points: 1.54, currency: "EUR", expiryDate: "20/06/25" },
        { id: 1, bookingId: "62843", totalValue: 150.32, points: 1.54, currency: "EUR", expiryDate: "20/06/25" },
        { id: 1, bookingId: "62844", totalValue: 150.32, points: 1.54, currency: "EUR", expiryDate: "20/06/25" },
        { id: 1, bookingId: "62845", totalValue: 150.32, points: 1.54, currency: "EUR", expiryDate: "20/06/25" },
        { id: 1, bookingId: "62846", totalValue: 150.32, points: 1.54, currency: "EUR", expiryDate: "20/06/25" },
        { id: 1, bookingId: "62847", totalValue: 150.32, points: 1.54, currency: "EUR", expiryDate: "20/06/25" },
        { id: 1, bookingId: "62848", totalValue: 150.32, points: 1.54, currency: "EUR", expiryDate: "20/06/25" },
        { id: 1, bookingId: "62849", totalValue: 150.32, points: 1.54, currency: "EUR", expiryDate: "20/06/25" },
        { id: 1, bookingId: "628430", totalValue: 150.32, points: 1.54, currency: "EUR", expiryDate: "20/06/25" },
        { id: 1, bookingId: "628431", totalValue: 150.32, points: 1.54, currency: "EUR", expiryDate: "20/06/25" },
        { id: 1, bookingId: "628432", totalValue: 150.32, points: 1.54, currency: "EUR", expiryDate: "20/06/25" },
        { id: 1, bookingId: "628433", totalValue: 150.32, points: 1.54, currency: "EUR", expiryDate: "20/06/25" },
        { id: 1, bookingId: "628434", totalValue: 150.32, points: 1.54, currency: "EUR", expiryDate: "20/06/25" },
        { id: 1, bookingId: "628435", totalValue: 150.32, points: 1.54, currency: "EUR", expiryDate: "20/06/25" },
        { id: 1, bookingId: "628436", totalValue: 150.32, points: 1.54, currency: "EUR", expiryDate: "20/06/25" },
        { id: 1, bookingId: "628437", totalValue: 150.32, points: 1.54, currency: "EUR", expiryDate: "20/06/25" },
        { id: 1, bookingId: "628438", totalValue: 150.32, points: 1.54, currency: "EUR", expiryDate: "20/06/25" },
        { id: 1, bookingId: "628439", totalValue: 150.32, points: 1.54, currency: "EUR", expiryDate: "20/06/25" },
        { id: 1, bookingId: "628430", totalValue: 150.32, points: 1.54, currency: "EUR", expiryDate: "20/06/25" },
        { id: 1, bookingId: "62", totalValue: 150.32, points: 1.54, currency: "EUR", expiryDate: "20/06/25" },
        { id: 1, bookingId: "623", totalValue: 150.32, points: 1.54, currency: "EUR", expiryDate: "20/06/25" },
        { id: 1, bookingId: "643", totalValue: 150.32, points: 1.54, currency: "EUR", expiryDate: "20/06/25" },
        { id: 1, bookingId: "63", totalValue: 150.32, points: 1.54, currency: "EUR", expiryDate: "20/06/25" },
        { id: 1, bookingId: "43", totalValue: 150.32, points: 1.54, currency: "EUR", expiryDate: "20/06/25" },
    ];

    const totalItems = items.length;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div>
            <Header />
            <div className='main'>
                <div className='gray__background'>
                    <div className='container'>
                        <div className='points__first__block'>
                            <div className='title'>Welcome, {/*{agent?.firstName} {agent?.lastName}*/}</div>
                            {/* <p>You have {agent?.usd} USD, {agent?.eur} EUR, {agent?.gbp} GBP points available</p> */}
                            <p>You can spend your loyalty points on hotel bookings, please <span onClick={() => setIsModalOpen(true)}>contact us</span> or your account manager directly.</p>
                        </div>
                        <div className='point__second__block'>
                            <table className='point__table'>
                                <thead>
                                    <tr>
                                        <th className='list__title'>Booking ID</th>
                                        <th className='list__title'>Total value</th>
                                        <th className='list__title'>Points awarded</th>
                                        <th className='list__title'>Currency</th>
                                        <th className='list__title'>Expiry date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.bookingId}</td>
                                            <td>{item.totalValue}</td>
                                            <td>{item.points}</td>
                                            <td>{item.currency}</td>
                                            <td>{item.expiryDate}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <ModalForm show={isModalOpen} onClose={() => setIsModalOpen(false)} />
                            <Pagination
                                itemsPerPage={itemsPerPage}
                                totalItems={totalItems}
                                paginate={paginate}
                                currentPage={currentPage}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <ScrollToTopButton />
        </div>
    );
}

function Pagination({ itemsPerPage, totalItems, paginate, currentPage }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className='pagination'>
                <li>
                    <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                        &lt;
                    </button>
                </li>
                {pageNumbers.map(number => (
                    <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                        <button onClick={() => paginate(number)}>
                            {number}
                        </button>
                    </li>
                ))}
                <li>
                    <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === pageNumbers.length}>
                        &gt;
                    </button>
                </li>
            </ul>
        </nav>
    );
}