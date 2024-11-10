import React, { useEffect, useState } from 'react'
import './index.css'
import { useLocation, useNavigate } from 'react-router-dom'
import Filter from '../../components/filter/Filter'
import { deleteResume, getResume } from '../../api'

export default function ResumePage() {

    const location = useLocation()
    const navigate = useNavigate()
    const [filteredResume, setFilteredResume] = useState([]);
    const [noResults, setNoResults] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        document.querySelector('.main__content__admin').scrollTo(0, 0);
        fetchResume();
    }, [location]);

    const fetchResume = async () => {
        try {
            await getResume(setFilteredResume)
            setLoading(false);
            setNoResults(false);
        } catch (error) {
            setError('Failed to fetch vacancies');
            setLoading(false);
        }
    };

    const deleteData = async (id) => {
        try {
            const response = await deleteResume(id)
            if (response.status === 200 || response.status === 204) {
                fetchResume();
            } else {
                console.error('Failed to delete resume:', response);
            }
        } catch (error) {
            console.error('Error deleting resume:', error);
        }
    };

    return (
        <div className='all__content__admin'>
            <div className='title__admin'>Resumes</div>
            <Filter
                setFilteredItems={(filtered) => {
                    setFilteredResume(filtered);
                    setNoResults(filtered.length === 0);
                }}
                refreshData={fetchResume}
            />
            <div className='content__block__admin'>
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {noResults && !loading && <p>No resume found.</p>}
                {!loading && !error && !noResults && (
                    <table className='resume__list'>
                        <thead>
                            <tr>
                                <th className='list__title__admin'>Name</th>
                                <th className='list__title__admin'>Created at</th>
                                <th className='list__title__admin'>Vacancy</th>
                                <th className='list__title__admin'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredResume.map(resume => (
                                <tr className='resume__item' key={resume.id}>
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
                                    <td className='resume__actions'>
                                        <button className='edit__btn' onClick={() => navigate(`/resume/details/${resume.id}`, { state: {resume} })}>Show</button>
                                        <button className='delete__btn' onClick={() => deleteData(resume.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}
