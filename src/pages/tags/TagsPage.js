import React, { useEffect, useState } from 'react';
import './index.css';
import { useLocation } from 'react-router-dom';
import Filter from '../../components/filter/Filter';
import EditModal from '../../components/editModal/EditModal';
import AddModal from '../../components/addModal/AddModal';
import { deleteTags, getTagsAdmin } from '../../api';
import { notification, Pagination } from 'antd';

export default function TagsPage() {
    const location = useLocation();

    const [filteredTags, setFilteredTags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedTag, setSelectedTag] = useState(null);
    const [noResults, setNoResults] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // Пагинация
    const [currentPage, setCurrentPage] = useState(1); // Текущая страница
    const [pageSize, setPageSize] = useState(10); // Количество элементов на странице

    useEffect(() => {
        document.querySelector('.main__content__admin').scrollTo(0, 0);
        fetchTags();
    }, [location]);

    const fetchTags = async () => {
        try {
            await getTagsAdmin(setFilteredTags);
            setLoading(false);
            setNoResults(false);
        } catch (error) {
            console.error('Error fetching tags:', error);
            setError('Failed to load tags');
            setLoading(false);
        }
    };

    const deleteData = async (id) => {
        try {
            const response = await deleteTags(id);
            if (response.status === 200 || response.status === 204) {
                notification.success({
                    message: 'Successful',
                    description: 'Tag has been deleted',
                    duration: 3,
                });
                fetchTags();
            } else {
                console.error('Failed to delete tag:', response);
                notification.error({
                    message: 'Error',
                    description: 'Failed to delete tag',
                    duration: 3,
                });
            }
        } catch (error) {
            console.error('Error deleting tag:', error);
            notification.error({
                message: 'Error',
                description: 'The server is not responding',
                duration: 3,
            });
        }
    };

    const editData = (tag) => {
        setSelectedTag(tag);
        setIsEditModalOpen(true);
    };

    // Обработчик изменения страницы
    const onPageChange = (page, size) => {
        setCurrentPage(page);
        setPageSize(size);
        window.scrollTo(0, 0); // Прокрутка к началу страницы
    };

    // Данные для текущей страницы
    const paginatedTags = filteredTags.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return (
        <div className="all__content__admin">
            <div className="title__admin">Tags</div>
            <div className="add__btn__block">
                <button className="add__btn" onClick={() => setIsAddModalOpen(true)}>
                    + Add
                </button>
            </div>
            <Filter
                setFilteredItems={(filtered) => {
                    setFilteredTags(filtered);
                    setNoResults(filtered.length === 0);
                }}
                refreshData={fetchTags}
            />
            <div className="content__block__admin">
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {noResults && <p>Tags not found</p>}
                {!loading && !error && !noResults && (
                    <table className="tags__list">
                        <thead>
                            <tr>
                                <th className="list__title__admin">Title</th>
                                <th className="list__title__admin">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedTags.map((tag) => (
                                <tr key={tag.id}>
                                    <td>{tag.title}</td>
                                    <td className="tag__actions">
                                        <button
                                            className="edit__btn"
                                            onClick={() => editData(tag)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="delete__btn"
                                            onClick={() => deleteData(tag.id)}
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
                total={filteredTags.length}
                onChange={onPageChange}
                showSizeChanger
                align='center'
                pageSizeOptions={['5', '10', '20', '50']}
            />

            {isAddModalOpen && (
                <AddModal
                    closeModal={() => setIsAddModalOpen(false)}
                    refreshItems={fetchTags}
                />
            )}

            {isEditModalOpen && (
                <EditModal
                    item={selectedTag}
                    closeModal={() => setIsEditModalOpen(false)}
                    refreshItems={fetchTags}
                />
            )}
        </div>
    );
}
