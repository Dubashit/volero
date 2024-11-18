import React, { useEffect, useState } from 'react';
import './index.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Filter from '../../components/filter/Filter';
import { deleteArticle, getArticles, getPicture } from '../../api';
import { notification, Pagination } from 'antd';

export default function ArticlesPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const [filteredArticles, setFilteredArticles] = useState([]);
    const [noResults, setNoResults] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Пагинация
    const [currentPage, setCurrentPage] = useState(1); // Текущая страница
    const [pageSize, setPageSize] = useState(10); // Количество элементов на странице

    useEffect(() => {
        document.querySelector('.main__content__admin').scrollTo(0, 0);
        fetchArticles();
    }, [location]);

    const fetchArticles = async () => {
        try {
            await getArticles(setFilteredArticles);
            setLoading(false);
            setNoResults(false);
        } catch (error) {
            setError('Failed to fetch articles!');
            setLoading(false);
        }
    };

    const deleteData = async (id) => {
        try {
            const response = await deleteArticle(id);
            if (response.status === 200 || response.status === 204) {
                notification.success({
                    message: 'Successful',
                    description: 'Article has been deleted',
                    duration: 3,
                });
                fetchArticles();
            } else {
                console.error('Failed to delete article:', response);
                notification.error({
                    message: 'Error',
                    description: 'Failed to delete article',
                    duration: 3,
                });
            }
        } catch (error) {
            console.error('Error:', error);
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
    const paginatedArticles = filteredArticles.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return (
        <div className="all__content__admin">
            <div className="title__admin">Articles</div>
            <div className="add__btn__block">
                <button className="add__btn" onClick={() => navigate('/admin/articles/add')}>
                    + Add
                </button>
            </div>
            <Filter
                setFilteredItems={(filtered) => {
                    setFilteredArticles(filtered);
                    setNoResults(filtered.length === 0);
                }}
                refreshData={fetchArticles}
            />
            <div className="content__block__admin">
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {noResults && !loading && <p>No articles found.</p>}
                {!loading && !error && !noResults && (
                    <table className="articles__list">
                        <thead>
                            <tr>
                                <th className="list__title__admin">Preview</th>
                                <th className="list__title__admin">Title</th>
                                <th className="list__title__admin">Status</th>
                                <th className="list__title__admin">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedArticles.map((article) => (
                                <tr className="article__item" key={article.id}>
                                    <td>
                                        {getPicture(article.preview)}
                                    </td>
                                    <td>{article.title}</td>
                                    <td>{article.status}</td>
                                    <td className="article__actions">
                                        <button
                                            className="edit__btn"
                                            onClick={() =>
                                                navigate(`/admin/articles/edit/${article.id}`, {
                                                    state: { article },
                                                })
                                            }
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="delete__btn"
                                            onClick={() => deleteData(article.id)}
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
                total={filteredArticles.length}
                onChange={onPageChange}
                showSizeChanger
                align='center'
                pageSizeOptions={['5', '10', '20', '50']}
            />
        </div>
    );
}
