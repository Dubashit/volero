import React, { useEffect, useState } from 'react';
import './index.css';
import { useLocation } from 'react-router-dom';
import Filter from '../../components/filter/Filter';
import AddModal from '../../components/addModal/AddModal';
import EditModal from '../../components/editModal/EditModal';
import { deleteLanguage, getLanguages } from '../../api';
import { notification, Pagination } from 'antd';

export default function LanguagePage() {
    const location = useLocation();

    const [filteredLanguages, setFilteredLanguages] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const [noResults, setNoResults] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        document.querySelector('.main__content__admin').scrollTo(0, 0);
        fetchLanguages();
    }, [location]);

    const fetchLanguages = async () => {
        try {
            await getLanguages(setFilteredLanguages);
            setLoading(false);
            setNoResults(false);
        } catch (error) {
            console.error('Error fetching languages:', error);
            setError('Failed to fetch languages');
            setLoading(false);
        }
    };

    const deleteData = async (id) => {
        try {
            const response = await deleteLanguage(id);
            if (response.status === 200 || response.status === 204) {
                notification.success({
                    message: 'Successful',
                    description: 'Language has been deleted',
                    duration: 3,
                });
                fetchLanguages();
            } else {
                console.error('Failed to delete language:', response);
                notification.error({
                    message: 'Error',
                    description: 'Failed to delete language',
                    duration: 3,
                });
            }
        } catch (error) {
            console.error('Error deleting language:', error);
            notification.error({
                message: 'Error',
                description: 'The server is not responding',
                duration: 3,
            });
        }
    };

    const editData = (language) => {
        setSelectedLanguage(language);
        setIsEditModalOpen(true);
    };

    const onPageChange = (page, size) => {
        setCurrentPage(page);
        setPageSize(size);
    };

    const paginatedLanguages = filteredLanguages.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return (
        <div className="all__content__admin">
            <div className="title__admin">Preferable languages</div>
            <div className="add__btn__block">
                <button className="add__btn" onClick={() => setIsAddModalOpen(true)}>
                    + Add
                </button>
            </div>
            <Filter
                setFilteredItems={(filtered) => {
                    setFilteredLanguages(filtered);
                    setNoResults(filtered.length === 0);
                }}
                refreshData={fetchLanguages}
            />
            <div className="content__block__admin">
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {noResults && !loading && <p>No languages found.</p>}
                {!loading && !error && !noResults && (
                    <table className="languages__list">
                        <thead>
                            <tr>
                                <th className="list__title__admin">Code</th>
                                <th className="list__title__admin">Title</th>
                                <th className="list__title__admin">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedLanguages.map((language) => (
                                <tr className="language__item" key={language.id}>
                                    <td>{language.code}</td>
                                    <td>{language.title}</td>
                                    <td className="language__actions">
                                        <button
                                            className="edit__btn"
                                            onClick={() => editData(language)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="delete__btn"
                                            onClick={() => deleteData(language.id)}
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
                total={filteredLanguages.length}
                onChange={onPageChange}
                showSizeChanger
                align="center"
                pageSizeOptions={['5', '10', '20', '50']}
            />

            {isAddModalOpen && (
                <AddModal
                    closeModal={() => setIsAddModalOpen(false)}
                    refreshItems={fetchLanguages}
                />
            )}

            {isEditModalOpen && (
                <EditModal
                    item={selectedLanguage}
                    closeModal={() => setIsEditModalOpen(false)}
                    refreshItems={fetchLanguages}
                />
            )}
        </div>
    );
}
