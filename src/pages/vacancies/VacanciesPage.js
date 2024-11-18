import React, { useEffect, useState } from 'react';
import './index.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Filter from '../../components/filter/Filter';
import { deleteVacancy, getVacanciesAdmin } from '../../api';
import { notification, Pagination } from 'antd';

export default function VacanciesPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const [filteredVacancies, setFilteredVacancies] = useState([]);
    const [noResults, setNoResults] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Пагинация
    const [currentPage, setCurrentPage] = useState(1); // Текущая страница
    const [pageSize, setPageSize] = useState(10); // Количество записей на странице

    useEffect(() => {
        document.querySelector('.main__content__admin').scrollTo(0, 0);
        fetchVacancies();
    }, [location]);

    const fetchVacancies = async () => {
        try {
            await getVacanciesAdmin(setFilteredVacancies);
            setLoading(false);
            setNoResults(false);
        } catch (error) {
            setError('Failed to fetch vacancies');
            setLoading(false);
        }
    };

    const deleteData = async (id) => {
        try {
            const response = await deleteVacancy(id);
            if (response.status === 200 || response.status === 204) {
                notification.success({
                    message: 'Successful',
                    description: 'Vacancy has been deleted',
                    duration: 3,
                });
                fetchVacancies();
            } else {
                console.error('Failed to delete vacancy:', response);
                notification.error({
                    message: 'Error',
                    description: 'Failed to delete vacancy',
                    duration: 3,
                });
            }
        } catch (error) {
            console.error('Error deleting vacancy:', error);
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
    const paginatedVacancies = filteredVacancies.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return (
        <div className="all__content__admin">
            <div className="title__admin">Vacancies</div>
            <div className="add__btn__block">
                <button className="add__btn" onClick={() => navigate('/admin/vacancies/add')}>
                    + Add
                </button>
            </div>
            <Filter
                setFilteredItems={(filtered) => {
                    setFilteredVacancies(filtered);
                    setNoResults(filtered.length === 0);
                }}
                refreshData={fetchVacancies}
            />
            <div className="content__block__admin">
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {noResults && !loading && <p>No vacancies found.</p>}
                {!loading && !error && !noResults && (
                    <table className="vacancies__list">
                        <thead>
                            <tr>
                                <th className="list__title__admin">Title</th>
                                <th className="list__title__admin">Status</th>
                                <th className="list__title__admin">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedVacancies.map((vacancy) => (
                                <tr className="vacancy__item" key={vacancy.id}>
                                    <td>{vacancy.title}</td>
                                    <td>{vacancy.status}</td>
                                    <td className="vacancy__actions">
                                        <button
                                            className="edit__btn"
                                            onClick={() =>
                                                navigate(`/admin/vacancies/edit/${vacancy.id}`, {
                                                    state: { vacancy },
                                                })
                                            }
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="delete__btn"
                                            onClick={() => deleteData(vacancy.id)}
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
                total={filteredVacancies.length}
                onChange={onPageChange}
                showSizeChanger
                align='center'
                pageSizeOptions={['5', '10', '20', '50']}
            />
        </div>
    );
}
