import React, { useEffect, useState } from 'react';
import './index.css';
import { useLocation } from 'react-router-dom';
import Filter from '../../components/filter/Filter';
import AddModal from '../../components/addModal/AddModal';
import EditModal from '../../components/editModal/EditModal';
import { deleteStopList, getStopList } from '../../api';
import { notification, Pagination } from 'antd';

export default function StopListPage() {
    const location = useLocation();
    const [filteredStopList, setFilteredStopList] = useState([]);
    const [selectedStopList, setSelectedStopList] = useState(null);
    const [noResults, setNoResults] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        document.querySelector('.main__content__admin').scrollTo(0, 0);
        fetchStopList();
    }, [location]);

    const fetchStopList = async () => {
        try {
            await getStopList(setFilteredStopList);
            setLoading(false);
            setNoResults(false);
        } catch (error) {
            setError('Failed to fetch stop list');
            setLoading(false);
        }
    };

    const deleteData = async (id) => {
        try {
            const response = await deleteStopList(id);
            if (response.status === 200 || response.status === 204) {
                notification.success({
                    message: 'Successful',
                    description: 'Stop list has been deleted',
                    duration: 3,
                });
                fetchStopList();
            } else {
                console.error('Failed to delete stop list:', response);
                notification.error({
                    message: 'Error',
                    description: 'Failed to delete stop list',
                    duration: 3,
                });
            }
        } catch (error) {
            console.error('Error deleting stop list:', error);
            notification.error({
                message: 'Error',
                description: 'The server is not responding',
                duration: 3,
            });
        }
    };

    const editData = (stopList) => {
        setSelectedStopList(stopList);
        setIsEditModalOpen(true);
    };

    const onPageChange = (page, size) => {
        setCurrentPage(page);
        setPageSize(size);
    };

    const paginatedStopList = filteredStopList.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return (
        <div className="all__content__admin">
            <div className="title__admin">Stop list</div>
            <div className="add__btn__block">
                <button className="add__btn" onClick={() => setIsAddModalOpen(true)}>
                    + Add
                </button>
            </div>
            <Filter
                setFilteredItems={(filtered) => {
                    setFilteredStopList(filtered);
                    setNoResults(filtered.length === 0);
                }}
                refreshData={fetchStopList}
            />
            <div className="content__block__admin">
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {noResults && !loading && <p>No stop list found.</p>}
                {!loading && !error && !noResults && (
                    <table className="stopList__list">
                        <thead>
                            <tr>
                                <th className="list__title__admin">Sales ID</th>
                                <th className="list__title__admin">Username</th>
                                <th className="list__title__admin">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedStopList.map((stopList) => (
                                <tr className="stopList__item" key={stopList.id}>
                                    <td>{stopList.salesId}</td>
                                    <td>{stopList.username}</td>
                                    <td className="stopList__actions">
                                        <button
                                            className="edit__btn"
                                            onClick={() => editData(stopList)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="delete__btn"
                                            onClick={() => deleteData(stopList.id)}
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
                total={filteredStopList.length}
                onChange={onPageChange}
                showSizeChanger
                align="center"
                pageSizeOptions={['5', '10', '20', '50']}
            />

            {isAddModalOpen && (
                <AddModal
                    closeModal={() => setIsAddModalOpen(false)}
                    refreshItems={fetchStopList}
                />
            )}

            {isEditModalOpen && (
                <EditModal
                    item={selectedStopList}
                    closeModal={() => setIsEditModalOpen(false)}
                    refreshItems={fetchStopList}
                />
            )}
        </div>
    );
}
