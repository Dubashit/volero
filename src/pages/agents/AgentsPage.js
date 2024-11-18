import React, { useEffect, useState } from 'react';
import './index.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Filter from '../../components/filter/Filter';
import { getAgents } from '../../api';
import { Pagination } from 'antd';

export default function AgentsPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [filteredAgents, setFilteredAgents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAgents = async () => {
        try {
            const res = await getAgents();
            setFilteredAgents(res);
            setLoading(false);
        } catch (error) {
            setError('Failed to fetch agents!');
            setLoading(false);
        }
    };

    useEffect(() => {
        document.querySelector('.main__content__admin').scrollTo(0, 0);
        fetchAgents();
    }, [location]);

    const paginatedAgents = filteredAgents.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const onPageChange = (page, size) => {
        setCurrentPage(page);
        setPageSize(size);
        console.log(`Page: ${page}, PageSize: ${size}`);
    };

    const totalMoney = filteredAgents.reduce(
        (totals, agent) => {
            totals.usd += parseFloat(agent.usd || 0);
            totals.eur += parseFloat(agent.eur || 0);
            totals.gbp += parseFloat(agent.gbp || 0);
            return totals;
        },
        { usd: 0, eur: 0, gbp: 0 }
    );

    const exportToCSV = () => {
        const headers = ['Reseller', 'Sales ID', 'Username', 'Full name', 'Email', 'USD', 'EUR', 'GBP'];
        const rows = filteredAgents.map(agent => [
            agent.reseller,
            agent.salesId,
            agent.username,
            agent.fullName,
            agent.email,
            parseFloat(agent.usd).toFixed(2),
            parseFloat(agent.eur).toFixed(2),
            parseFloat(agent.gbp).toFixed(2)
        ]);

        let csvContent = 'data:text/csv;charset=utf-8,';
        csvContent += headers.join(',') + '\n';
        rows.forEach(row => {
            csvContent += row.join(',') + '\n';
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'agents.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="all__content__admin">
            <div className="title__admin">Agents</div>
            <Filter
                setFilteredItems={(filtered) => setFilteredAgents(filtered)}
                refreshData={fetchAgents}
                exportToCSV={exportToCSV}
            />
            <div className='total__money'>
                <p>Total: <div><span>USD:</span> {totalMoney.usd.toFixed(2)}</div> <div><span>EUR:</span> {totalMoney.eur.toFixed(2)}</div> <div><span>GBP:</span> {totalMoney.gbp.toFixed(2)}</div></p>
            </div>
            <div className="content__block__admin">
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {!loading && !error && (
                    <table className="agents__list">
                        <thead>
                            <tr>
                                <th className="list__title__admin">Reseller</th>
                                <th className="list__title__admin">Sales ID</th>
                                <th className="list__title__admin">Username</th>
                                <th className="list__title__admin">Full name</th>
                                <th className="list__title__admin">Email</th>
                                <th className="list__title__admin">USD</th>
                                <th className="list__title__admin">EUR</th>
                                <th className="list__title__admin">GBP</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedAgents.map((agent) => (
                                <tr
                                    className="agent__item"
                                    key={agent.id}
                                    onClick={() =>
                                        navigate(`/admin/agentsDetails/${agent.id}`, {
                                            state: { agent },
                                        })
                                    }
                                >
                                    <td>{agent.reseller}</td>
                                    <td>{agent.salesId}</td>
                                    <td>{agent.username}</td>
                                    <td>{agent.fullName}</td>
                                    <td>{agent.email}</td>
                                    <td>{parseFloat(agent.usd).toFixed(2)}</td>
                                    <td>{parseFloat(agent.eur).toFixed(2)}</td>
                                    <td>{parseFloat(agent.gbp).toFixed(2)}</td>
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
                total={filteredAgents.length}
                onChange={onPageChange}
                showSizeChanger
                align="center"
                pageSizeOptions={['1', '10', '20', '50']}
            />
        </div>
    );
}
