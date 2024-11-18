import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { deleteRequestForPoints, getRequestForPoints } from '../../api';
import './index.css';
import { notification, Pagination } from 'antd';

export default function RequestForPoints() {
    const location = useLocation();
    const navigate = useNavigate();
    const [filteredRequestsForPoints, setFilteredRequestsForPoints] = useState([]);
    const [noResults, setNoResults] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('NotCompleted');

    // Пагинация для NotCompleted
    const [currentPageNotCompleted, setCurrentPageNotCompleted] = useState(1);
    const [pageSizeNotCompleted, setPageSizeNotCompleted] = useState(10);

    // Пагинация для Completed
    const [currentPageCompleted, setCurrentPageCompleted] = useState(1);
    const [pageSizeCompleted, setPageSizeCompleted] = useState(10);

    useEffect(() => {
        document.querySelector('.main__content__admin').scrollTo(0, 0);
        fetchRequestsForPoints();
    }, [location]);

    useEffect(() => {
        if (location.state?.refresh) {
            fetchRequestsForPoints();
        }
    }, [location.state]);

    const fetchRequestsForPoints = async () => {
        try {
            await getRequestForPoints(setFilteredRequestsForPoints);
            setLoading(false);
            setNoResults(false);
        } catch (error) {
            setError('Failed to fetch data');
            setLoading(false);
        }
    };

    const deleteData = async (id) => {
        try {
            const response = await deleteRequestForPoints(id);
            if (response.status === 200 || response.status === 204) {
                notification.success({
                    message: 'Successful',
                    description: 'Request has been deleted',
                    duration: 3,
                });
                fetchRequestsForPoints();
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

    // Фильтры данных для каждой вкладки
    const notCompletedRequests = filteredRequestsForPoints.filter(request => request.isDone !== 'Completed');
    const completedRequests = filteredRequestsForPoints.filter(request => request.isDone === 'Completed');

    // Данные для текущей страницы
    const paginatedNotCompletedRequests = notCompletedRequests.slice(
        (currentPageNotCompleted - 1) * pageSizeNotCompleted,
        currentPageNotCompleted * pageSizeNotCompleted
    );

    const paginatedCompletedRequests = completedRequests.slice(
        (currentPageCompleted - 1) * pageSizeCompleted,
        currentPageCompleted * pageSizeCompleted
    );

    return (
        <div className="all__content__admin">
            <div className="title__admin">Requests for points</div>
            <div className="tabs">
                <button
                    className={`tab ${activeTab === 'NotCompleted' ? 'active' : ''}`}
                    onClick={() => setActiveTab('NotCompleted')}
                >
                    Not completed
                </button>
                <button
                    className={`tab ${activeTab === 'Completed' ? 'active' : ''}`}
                    onClick={() => setActiveTab('Completed')}
                >
                    Completed
                </button>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {noResults && !loading && <p>No requests found.</p>}
            {!loading && !error && !noResults && activeTab === 'NotCompleted' && (
                <>
                    <div className="content__block__admin">
                        <table className="requests__list">
                            <thead>
                                <tr>
                                    <th className="list__title__admin">Username</th>
                                    <th className="list__title__admin">Email</th>
                                    <th className="list__title__admin">Created at</th>
                                    <th className="list__title__admin">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedNotCompletedRequests.map(requestForPoints => (
                                    <tr className="request__item" key={requestForPoints.id}>
                                        <td>{requestForPoints.username}</td>
                                        <td>{requestForPoints.email}</td>
                                        <td>
                                            {new Date(requestForPoints.createdAt).toLocaleString('en-US', {
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
                                                    navigate(`/admin/requestForPoints/details/${requestForPoints.id}`, {
                                                        state: { requestForPoints, isCompletedTab: false },
                                                    })
                                                }
                                            >
                                                Show
                                            </button>
                                            <button
                                                className="delete__btn"
                                                onClick={() => deleteData(requestForPoints.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Pagination
                        current={currentPageNotCompleted}
                        pageSize={pageSizeNotCompleted}
                        total={notCompletedRequests.length}
                        onChange={(page, size) => {
                            setCurrentPageNotCompleted(page);
                            setPageSizeNotCompleted(size);
                        }}
                        align='center'
                        showSizeChanger
                        pageSizeOptions={['5', '10', '20', '50']}
                    />
                </>
            )}
            {!loading && !error && !noResults && activeTab === 'Completed' && (
                <>
                    <div className="content__block__admin">
                        <table className="requests__list">
                            <thead>
                                <tr>
                                    <th className="list__title__admin">Username</th>
                                    <th className="list__title__admin">Email</th>
                                    <th className="list__title__admin">Created at</th>
                                    <th className="list__title__admin">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedCompletedRequests.map(requestForPoints => (
                                    <tr className="request__item" key={requestForPoints.id}>
                                        <td>{requestForPoints.username}</td>
                                        <td>{requestForPoints.email}</td>
                                        <td>
                                            {new Date(requestForPoints.createdAt).toLocaleString('en-US', {
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
                                                    navigate(`/admin/requestForPoints/details/${requestForPoints.id}`, {
                                                        state: { requestForPoints, isCompletedTab: true },
                                                    })
                                                }
                                            >
                                                Show
                                            </button>
                                            <button
                                                className="delete__btn"
                                                onClick={() => deleteData(requestForPoints.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Pagination
                        current={currentPageCompleted}
                        pageSize={pageSizeCompleted}
                        total={completedRequests.length}
                        onChange={(page, size) => {
                            setCurrentPageCompleted(page);
                            setPageSizeCompleted(size);
                        }}
                        align='center'
                        showSizeChanger
                        pageSizeOptions={['5', '10', '20', '50']}
                    />
                </>
            )}
        </div>
    );
}
