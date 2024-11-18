import React, { useEffect, useState } from 'react';
import './index.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Filter from '../../components/filter/Filter';
import { deleteResume, getResume } from '../../api';
import { notification, Pagination } from 'antd';

export default function ResumePage() {
    const location = useLocation();
    const navigate = useNavigate();

    const [filteredResume, setFilteredResume] = useState([]);
    const [noResults, setNoResults] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Пагинация
    const [currentPage, setCurrentPage] = useState(1); // Текущая страница
    const [pageSize, setPageSize] = useState(10); // Количество записей на странице

    useEffect(() => {
        document.querySelector('.main__content__admin').scrollTo(0, 0);
        fetchResume();
    }, [location]);

    const fetchResume = async () => {
        try {
            await getResume(setFilteredResume);
            setLoading(false);
            setNoResults(false);
        } catch (error) {
            setError('Failed to fetch resumes');
            setLoading(false);
        }
    };

    const deleteData = async (id) => {
        try {
            const response = await deleteResume(id);
            if (response.status === 200 || response.status === 204) {
                notification.success({
                    message: 'Successful',
                    description: 'Resume has been deleted',
                    duration: 3,
                });
                fetchResume();
            } else {
                console.error('Failed to delete resume:', response);
                notification.error({
                    message: 'Error',
                    description: 'Failed to delete resume',
                    duration: 3,
                });
            }
        } catch (error) {
            console.error('Error deleting resume:', error);
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
    const paginatedResumes = filteredResume.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return (
        <div className="all__content__admin">
            <div className="title__admin">Resumes</div>
            <Filter
                setFilteredItems={(filtered) => {
                    setFilteredResume(filtered);
                    setNoResults(filtered.length === 0);
                }}
                refreshData={fetchResume}
            />
            <div className="content__block__admin">
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {noResults && !loading && <p>No resumes found.</p>}
                {!loading && !error && !noResults && (
                    <table className="resume__list">
                        <thead>
                            <tr>
                                <th className="list__title__admin">Name</th>
                                <th className="list__title__admin">Created at</th>
                                <th className="list__title__admin">Vacancy</th>
                                <th className="list__title__admin">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedResumes.map((resume) => (
                                <tr className="resume__item" key={resume.id}>
                                    <td>{resume.name}</td>
                                    <td>
                                        {new Date(resume.createdAt).toLocaleString('en-US', {
                                            year: 'numeric',
                                            month: 'numeric',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            second: '2-digit',
                                            hour12: false,
                                        })}
                                    </td>
                                    <td>{resume.vacancy}</td>
                                    <td className="resume__actions">
                                        <button
                                            className="edit__btn"
                                            onClick={() =>
                                                navigate(`/admin/resume/details/${resume.id}`, {
                                                    state: { resume },
                                                })
                                            }
                                        >
                                            Show
                                        </button>
                                        <button
                                            className="delete__btn"
                                            onClick={() => deleteData(resume.id)}
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
                total={filteredResume.length}
                onChange={onPageChange}
                showSizeChanger
                align='center'
                pageSizeOptions={['5', '10', '20', '50']}
            />
        </div>
    );
}
