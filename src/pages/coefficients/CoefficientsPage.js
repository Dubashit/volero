import React, { useEffect, useState } from 'react';
import './index.css';
import { useLocation } from 'react-router-dom';
import Filter from '../../components/filter/Filter';
import EditModal from '../../components/editModal/EditModal';
import AddModal from '../../components/addModal/AddModal';
import { deleteCoefficient, getCoefficients } from '../../api';
import { notification, Pagination } from 'antd';

export default function CoefficientsPage() {
    const location = useLocation();
    const [filteredCoefficients, setFilteredCoefficients] = useState([]);
    const [selectedCoefficient, setSelectedCoefficient] = useState(null);
    const [noResults, setNoResults] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // Пагинация
    const [currentPage, setCurrentPage] = useState(1); // Текущая страница
    const [pageSize, setPageSize] = useState(10); // Количество элементов на странице

    useEffect(() => {
        document.querySelector('.main__content__admin').scrollTo(0, 0);
        fetchCoefficients();
    }, [location]);

    const fetchCoefficients = async () => {
        try {
            await getCoefficients(setFilteredCoefficients);
            setLoading(false);
            setNoResults(false);
        } catch (error) {
            setError('Failed to fetch coefficients');
            setLoading(false);
        }
    };

    const deleteData = async (id) => {
        try {
            const response = await deleteCoefficient(id);
            if (response.status === 200 || response.status === 204) {
                notification.success({
                    message: 'Successful',
                    description: 'Coefficient has been deleted',
                    duration: 3,
                });
                fetchCoefficients();
            } else {
                console.error('Failed to delete coefficient:', response);
                notification.error({
                    message: 'Error',
                    description: 'Failed to delete coefficient',
                    duration: 3,
                });
            }
        } catch (error) {
            console.error('Error deleting coefficient:', error);
            notification.error({
                message: 'Error',
                description: 'The server is not responding',
                duration: 3,
            });
        }
    };

    const editData = (coefficient) => {
        setSelectedCoefficient(coefficient);
        setIsEditModalOpen(true);
    };

    const onPageChange = (page, size) => {
        setCurrentPage(page);
        setPageSize(size);
        document.querySelector('.main__content__admin').scrollTo(0, 0);
    };

    const paginatedCoefficients = filteredCoefficients.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return (
        <div className="all__content__admin">
            <div className="title__admin">Coefficients</div>
            <div className="add__btn__block">
                <button className="add__btn" onClick={() => setIsAddModalOpen(true)}>
                    + Add
                </button>
            </div>
            <Filter
                setFilteredItems={(filtered) => {
                    setFilteredCoefficients(filtered);
                    setNoResults(filtered.length === 0);
                }}
                refreshData={fetchCoefficients}
            />
            <div className="content__block__admin">
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {noResults && !loading && <p>No coefficients found.</p>}
                {!loading && !error && !noResults && (
                    <table className="coefficients__list">
                        <thead>
                            <tr>
                                <th className="list__title__admin">Sales ID</th>
                                <th className="list__title__admin">Percentage</th>
                                <th className="list__title__admin">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedCoefficients.map((coefficient) => (
                                <tr className="coefficient__item" key={coefficient.id}>
                                    <td>{coefficient.salesId}</td>
                                    <td>{coefficient.percentage}</td>
                                    <td className="coefficient__actions">
                                        <button
                                            className="edit__btn"
                                            onClick={() => editData(coefficient)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="delete__btn"
                                            onClick={() => deleteData(coefficient.id)}
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
                total={filteredCoefficients.length}
                onChange={onPageChange}
                showSizeChanger
                align="center"
                pageSizeOptions={['1', '10', '20', '50']}
            />

            {isAddModalOpen && (
                <AddModal
                    closeModal={() => setIsAddModalOpen(false)}
                    refreshItems={fetchCoefficients}
                />
            )}

            {isEditModalOpen && (
                <EditModal
                    item={selectedCoefficient}
                    closeModal={() => setIsEditModalOpen(false)}
                    refreshItems={fetchCoefficients}
                />
            )}
        </div>
    );
}
