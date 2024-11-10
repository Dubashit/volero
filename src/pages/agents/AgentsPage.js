import React, { useEffect, useState } from 'react'
import './index.css'
import { useLocation, useNavigate } from 'react-router-dom'
import Filter from '../../components/filter/Filter';
import { getAgents } from '../../api';

export default function AgentsPage() {

    const location = useLocation()
    const navigate = useNavigate()
    const [filteredAgents, setFilteredAgents] = useState([]);
    const [noResults, setNoResults] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAgents = async () => {
        try {
            const res = await getAgents()
            setFilteredAgents(res)
            setLoading(false);
            setNoResults(false);
        } catch (error) {
            setError('Failed to fetch articles!');
            setLoading(false);
        }
    };

    useEffect(() => {
        document.querySelector('.main__content__admin').scrollTo(0, 0);
        fetchAgents()
    }, [location])

    const totalMoney = filteredAgents.reduce(
        (totals, agent) => {
            totals.usd += parseFloat(agent.usd || 0);
            totals.eur += parseFloat(agent.eur || 0);
            totals.gbp += parseFloat(agent.gbp || 0);
            return totals;
        },
        { usd: 0, eur: 0, gbp: 0 }
    );

    // const getSomeone = async () => {
    //     const response = await axios.get('http://localhost:4444/api/users/some')
    //     console.log(response.data);
    // }

    return (
        <div className='all__content__admin'>
            <div className='title__admin'>Agents</div>
            <Filter
                setFilteredItems={(filtered) => {
                    setFilteredAgents(filtered);
                    setNoResults(filtered.length === 0);
                }}
                refreshData={fetchAgents}
            />
            <div className='total__money'>
                <p>Total: <div><span>USD:</span> {totalMoney.usd.toFixed(2)}</div> <div><span>EUR:</span> {totalMoney.eur.toFixed(2)}</div> <div><span>GBP:</span> {totalMoney.gbp.toFixed(2)}</div></p>
            </div>
            {/* <button onClick={getSomeone}>Click</button> */}
            <div className='content__block__admin'>
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {noResults && !loading && <p>No agents found.</p>}
                {!loading && !error && !noResults && (
                    <table className='agents__list'>
                        <thead>
                            <tr>
                                <th className='list__title__admin'>Reseller</th>
                                <th className='list__title__admin'>Sales ID</th>
                                <th className='list__title__admin'>Username</th>
                                <th className='list__title__admin'>Full name</th>
                                <th className='list__title__admin'>Email</th>
                                <th className='list__title__admin'>USD</th>
                                <th className='list__title__admin'>EUR</th>
                                <th className='list__title__admin'>GBP</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAgents.map(agent => (
                                <tr className='agent__item' key={agent.id} onClick={() => navigate(`/agentsDetails/${agent.id}`, { state: { agent } })}>
                                    <td>{agent.reseller}</td>
                                    <td>{agent.salesId}</td>
                                    <td>{agent.username}</td>
                                    <td>{agent.fullName}</td>
                                    <td>{agent.email}</td>
                                    <td>{agent.usd}</td>
                                    <td>{agent.eur}</td>
                                    <td>{agent.gbp}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}