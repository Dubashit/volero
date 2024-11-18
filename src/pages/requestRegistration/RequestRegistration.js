import React, { useEffect, useState } from 'react';
import Filter from '../../components/filter/Filter';
import { useLocation, useNavigate } from 'react-router-dom';
import './index.css';
import { deleteRequestRegister, getRequestRegister } from '../../api';
import { notification, Pagination } from 'antd';

export default function RequestRegistration() {
    const location = useLocation();
    const navigate = useNavigate();
    const [filteredRequestRegister, setFilteredRequestRegister] = useState([]);
    const [noResults, setNoResults] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Пагинация
    const [currentPage, setCurrentPage] = useState(1); // Текущая страница
    const [pageSize, setPageSize] = useState(10); // Количество элементов на странице

    useEffect(() => {
        document.querySelector('.main__content__admin').scrollTo(0, 0);
        fetchRequestsRegister();
    }, [location]);

    const fetchRequestsRegister = async () => {
        try {
            await getRequestRegister(setFilteredRequestRegister);
            setLoading(false);
            setNoResults(false);
        } catch (error) {
            setError('Failed to fetch requests');
            setLoading(false);
        }
    };

    const deleteData = async (id) => {
        try {
            const response = await deleteRequestRegister(id);
            if (response.status === 200 || response.status === 204) {
                notification.success({
                    message: 'Successful',
                    description: 'Request has been deleted',
                    duration: 3,
                });
                fetchRequestsRegister();
            } else {
                console.error('Failed to delete request:', response);
                notification.error({
                    message: 'Error',
                    description: 'Failed to delete request',
                    duration: 3,
                });
            }
        } catch (error) {
            console.error('Error deleting request:', error);
            notification.error({
                message: 'Error',
                description: 'The server is not responding',
                duration: 3,
            });
        }
    };

    // Обработчик изменения страницы
    const onPageChange = (page, size) => {
        setCurrentPage(page);
        setPageSize(size);
        window.scrollTo(0, 0); // Прокрутка к началу страницы
    };

    // Данные для текущей страницы
    const paginatedRequests = filteredRequestRegister.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return (
        <div className="all__content__admin">
            <div className="title__admin">Requests registration</div>
            <Filter
                setFilteredItems={(filtered) => {
                    setFilteredRequestRegister(filtered);
                    setNoResults(filtered.length === 0);
                }}
                refreshData={fetchRequestsRegister}
            />
            <div className="content__block__admin">
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {noResults && !loading && <p>No requests found.</p>}
                {!loading && !error && !noResults && (
                    <table className="requests__list">
                        <thead>
                            <tr>
                                <th className="list__title__admin">First name</th>
                                <th className="list__title__admin">Last name</th>
                                <th className="list__title__admin">Created at</th>
                                <th className="list__title__admin">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedRequests.map((requestRegister) => (
                                <tr className="request__item" key={requestRegister.id}>
                                    <td>{requestRegister.firstName}</td>
                                    <td>{requestRegister.lastName}</td>
                                    <td>
                                        {new Date(requestRegister.createdAt).toLocaleString('en-US', {
                                            year: 'numeric',
                                            month: 'numeric',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            second: '2-digit',
                                            hour12: false,
                                        })}
                                    </td>
                                    <td className="request__actions">
                                        <button
                                            className="edit__btn"
                                            onClick={() =>
                                                navigate(`/admin/requestRegister/details/${requestRegister.id}`, {
                                                    state: { requestRegister },
                                                })
                                            }
                                        >
                                            Show
                                        </button>
                                        <button
                                            className="delete__btn"
                                            onClick={() => deleteData(requestRegister.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            <Pagination
                showQuickJumper
                current={currentPage}
                pageSize={pageSize}
                total={filteredRequestRegister.length}
                onChange={onPageChange}
                showSizeChanger
                align='center'
                pageSizeOptions={['5', '10', '20', '50']}
            />
        </div>
    );
}
