import React, { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import ScrollToTopButton from '../../components/scrollToTopButton/ScrollToTopButton';
import { useLocation } from 'react-router-dom';
import './index.css';
import ModalForm from '../../components/modalForm/ModalForm';
import { getUserBookings } from '../../api';
import { Pagination } from 'antd'; // Импортируем Pagination из antd

export default function PointsPage() {
    const location = useLocation();
    const agent = location.state?.agent;
    console.log(agent);

    const [filteredBookings, setFilteredBookings] = useState([]);
    const [noResults, setNoResults] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(20); // Размер страницы

    const fetchBookingsForUser = async () => {
        try {
            await getUserBookings(setFilteredBookings, agent);
            setLoading(false);
            setNoResults(false);
        } catch (error) {
            setError('Failed to fetch data');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookingsForUser();
    }, [location]);

    const totalItems = filteredBookings.length;
    const indexOfLastItem = currentPage * pageSize;
    const indexOfFirstItem = indexOfLastItem - pageSize;
    const currentItems = filteredBookings.slice(indexOfFirstItem, indexOfLastItem);

    const onPageChange = (page, size) => {
        setCurrentPage(page);
        setPageSize(size);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div>
            <Header />
            <div className='main'>
                <div className='gray__background'>
                    <div className='container'>
                        <div className='points__first__block'>
                            <div className='title'>Welcome, {agent?.name}</div>
                            <p>You have {parseFloat(agent?.usd).toFixed(2)} USD, {parseFloat(agent?.eur).toFixed(2)} EUR, {parseFloat(agent?.gbp).toFixed(2)} GBP points available.</p>
                            <p>You have made {totalItems} reservation(s).</p>
                            <p>You can spend your loyalty points on hotel bookings, please <span onClick={() => setIsModalOpen(true)}>contact us</span> or your account manager directly.</p>
                        </div>
                        <div className='point__second__block'>
                            {loading && <p>Loading...</p>}
                            {error && <p>{error}</p>}
                            {noResults && !loading && <p>No requests found.</p>}
                            {!loading && !error && !noResults && (
                                <>
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
                                                    <td>{item.id}</td>
                                                    <td>{item.sellingPrice}</td>
                                                    <td>{item.pointsCollected}</td>
                                                    <td>{item.currency}</td>
                                                    <td>{new Date(item.expireDate).toISOString().substring(0, 10)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <Pagination
                                        showQuickJumper
                                        current={currentPage}
                                        pageSize={pageSize}
                                        total={totalItems}
                                        onChange={onPageChange}
                                        showSizeChanger
                                        align='center'
                                        pageSizeOptions={['5', '10', '20', '50']}
                                    />
                                </>
                            )}
                            <ModalForm show={isModalOpen} onClose={() => setIsModalOpen(false)} />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <ScrollToTopButton />
        </div>
    );
}
