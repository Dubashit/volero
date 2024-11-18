import React, { useEffect, useState } from 'react';
import './index.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Filter from '../../components/filter/Filter';
import { deleteTestimonials, getTestimonialsAdmin } from '../../api';
import { notification, Pagination } from 'antd';

export default function TestimonialsPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const [filteredTestimonials, setFilteredTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [noResults, setNoResults] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        document.querySelector('.main__content__admin').scrollTo(0, 0);
        fetchTestimonials();
    }, [location]);

    const fetchTestimonials = async () => {
        try {
            await getTestimonialsAdmin(setFilteredTestimonials);
            setLoading(false);
            setNoResults(false);
        } catch (error) {
            console.error('Error fetching testimonials:', error);
            setError('Failed to load testimonials');
            setLoading(false);
        }
    };

    const deleteData = async (id) => {
        try {
            const response = await deleteTestimonials(id);
            if (response.status === 200 || response.status === 204) {
                notification.success({
                    message: 'Successful',
                    description: 'Testimonial has been deleted',
                    duration: 3,
                });
                fetchTestimonials();
            } else {
                console.error('Failed to delete testimonial:', response);
                notification.error({
                    message: 'Error',
                    description: 'Failed to delete testimonial',
                    duration: 3,
                });
            }
        } catch (error) {
            console.error('Error deleting testimonial:', error);
            notification.error({
                message: 'Error',
                description: 'The server is not responding',
                duration: 3,
            });
        }
    };

    const onPageChange = (page, size) => {
        setCurrentPage(page);
        setPageSize(size);
    };

    const paginatedTestimonials = filteredTestimonials.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return (
        <div className="all__content__admin">
            <div className="title__admin">Testimonials</div>
            <div className="add__btn__block">
                <button className="add__btn" onClick={() => navigate('/admin/testimonials/add')}>
                    + Add
                </button>
            </div>
            <Filter
                setFilteredItems={(filtered) => {
                    setFilteredTestimonials(filtered);
                    setNoResults(filtered.length === 0);
                }}
                refreshData={fetchTestimonials}
            />
            <div className="content__block__admin">
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {noResults && <p>Testimonials not found</p>}
                {!loading && !error && !noResults && (
                    <table className="testimonials__list">
                        <thead>
                            <tr>
                                <th className="list__title__admin">Author</th>
                                <th className="list__title__admin">Position</th>
                                <th className="list__title__admin">Comment</th>
                                <th className="list__title__admin">Count of Stars</th>
                                <th className="list__title__admin">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedTestimonials.map((testimonial) => (
                                <tr key={testimonial.id}>
                                    <td>{testimonial.author}</td>
                                    <td>{testimonial.position}</td>
                                    <td>{testimonial.comment}</td>
                                    <td>{testimonial.countOfStars}</td>
                                    <td className="testimonials__actions">
                                        <button
                                            className="edit__btn"
                                            onClick={() =>
                                                navigate(`/admin/testimonials/edit/${testimonial.id}`, {
                                                    state: { testimonial },
                                                })
                                            }
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="delete__btn"
                                            onClick={() => deleteData(testimonial.id)}
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
                total={filteredTestimonials.length}
                onChange={onPageChange}
                showSizeChanger
                align='center'
                pageSizeOptions={['5', '10', '20', '50']}
            />
        </div>
    );
}
