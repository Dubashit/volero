import React, { useState } from 'react'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import ScrollToTopButton from '../../components/scrollToTopButton/ScrollToTopButton'
import { useLocation, useNavigate } from 'react-router-dom'
import './index.css'
import ModalForm from '../../components/modalForm/ModalForm'

export default function PointsPage() {

    const location = useLocation()
    const navigate = useNavigate()
    // const agent = location?.state.agent

    const [isModalOpen, setIsModalOpen] = useState(false);

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
                                    <tr>
                                        <td>62843</td>
                                        <td>150.32</td>
                                        <td>1.54</td>
                                        <td>EUR</td>
                                        <td>20/06/25</td>
                                    </tr>
                                    <tr>
                                        <td>62843</td>
                                        <td>150.32</td>
                                        <td>1.54</td>
                                        <td>EUR</td>
                                        <td>20/06/25</td>
                                    </tr>
                                    <tr>
                                        <td>62843</td>
                                        <td>150.32</td>
                                        <td>1.54</td>
                                        <td>EUR</td>
                                        <td>20/06/25</td>
                                    </tr>
                                    <tr>
                                        <td>62843</td>
                                        <td>150.32</td>
                                        <td>1.54</td>
                                        <td>EUR</td>
                                        <td>20/06/25</td>
                                    </tr>
                                    <tr>
                                        <td>62843</td>
                                        <td>150.32</td>
                                        <td>1.54</td>
                                        <td>EUR</td>
                                        <td>20/06/25</td>
                                    </tr>
                                    <tr>
                                        <td>62843</td>
                                        <td>150.32</td>
                                        <td>1.54</td>
                                        <td>EUR</td>
                                        <td>20/06/25</td>
                                    </tr>
                                </tbody>
                            </table>
                            <ModalForm show={isModalOpen} onClose={() => setIsModalOpen(false)} />
                            {/* <Pagination
                                blogsPerPage={blogsPerPage}
                                totalBlogs={filteredBlogs.length}
                                paginate={paginate}
                                currentPage={currentPage}
                            /> */}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <ScrollToTopButton />
        </div>
    )
}

// function Pagination({ blogsPerPage, totalBlogs, paginate, currentPage }) {
//     const pageNumbers = [];

//     for (let i = 1; i <= Math.ceil(totalBlogs / blogsPerPage); i++) {
//         pageNumbers.push(i);
//     }

//     return (
//         <nav>
//             <ul className='pagination'>
//                 <li>
//                     <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
//                         &lt;
//                     </button>
//                 </li>
//                 {pageNumbers.map(number => (
//                     <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
//                         <button onClick={() => paginate(number)}>
//                             {number}
//                         </button>
//                     </li>
//                 ))}
//                 <li>
//                     <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === pageNumbers.length}>
//                         &gt;
//                     </button>
//                 </li>
//             </ul>
//         </nav>
//     );
// }