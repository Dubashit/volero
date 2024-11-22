import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './index.css'
import AddModal from '../../components/addModal/AddModal'
import { getAgent, getUserBookings, getUserRewards, updateAgentEmail } from '../../api'
import { notification, Pagination } from 'antd'

export default function AgentsDetailsPage() {

  const location = useLocation()

  const [isAddModalOpen, setIsAddModalOpen] = useState('')
  const [activeTab, setActiveTab] = useState('Bookings');
  const [noResults, setNoResults] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [filteredRewards, setFilteredRewards] = useState([]);
  const [agent, setAgent] = useState(location.state?.agent)
  const [email, setEmail] = useState(agent?.email)
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  const [currentBookingsPage, setCurrentBookingsPage] = useState(1);
  const [bookingsPageSize, setBookingsPageSize] = useState(20);

  const [currentRewardsPage, setCurrentRewardsPage] = useState(1);
  const [rewardsPageSize, setRewardsPageSize] = useState(20);

  useEffect(() => {
    fetchData();
  }, [location])

  const fetchData = async () => {
    try {
      await getUserBookings(setFilteredBookings, agent)
      refreshRewards()
      setLoading(false);
      setNoResults(false);
    } catch (error) {
      setError('Failed to fetch data!');
      setLoading(false);
    }
  }

  const refreshRewards = async () => {
    try {
      await getUserRewards(setFilteredRewards, agent)
      setAgent(await getAgent(agent))
      setLoading(false);
      setNoResults(false);
    } catch (error) {
      setError('Failed to fetch rewards!');
      setLoading(false);
    }
  }

  const enterEmailValue = () => {
    setIsEditingEmail(true);
  };

  const handleBookingsPageChange = (page, pageSize) => {
    setCurrentBookingsPage(page);
    setBookingsPageSize(pageSize);
  };

  const handleRewardsPageChange = (page, pageSize) => {
    setCurrentRewardsPage(page);
    setRewardsPageSize(pageSize);
  };

  const paginatedBookings = filteredBookings.slice(
    (currentBookingsPage - 1) * bookingsPageSize,
    currentBookingsPage * bookingsPageSize
  );

  const paginatedRewards = filteredRewards.slice(
    (currentRewardsPage - 1) * rewardsPageSize,
    currentRewardsPage * rewardsPageSize
  );

  const handleSave = async () => {
    try {
      const response = await updateAgentEmail(email, agent)
      if (response.status === 200) {
        notification.success({
          message: 'Successful',
          description: 'New email saved',
          duration: 3
        });
        setIsEditingEmail(false);
        window.location.reload()
      } else {
        notification.error({
          message: 'Error',
          description: 'Error to saving email',
          duration: 3
        });
      }
    } catch (error) {
      console.error(error);
      notification.error({
        message: 'Error',
        description: 'The server is not responding',
        duration: 3
      });
    }
  };

  const handleCancel = () => {
    setIsEditingEmail(false);
    setEmail(agent?.email || '');
  };

  return (
    <div className='all__content__admin'>
      <div className='title__admin'>{agent?.fullName}</div>
      <div className='content__block__admin'>
        <div className='agent__content'>
          <div className='agent__data'>
            <div className='resume__detail__item'>
              <div className='subtitle__admin request__title'>Reseller :</div>
              <div className='resume__field'>{agent?.reseller}</div>
            </div>
            <div className='resume__detail__item'>
              <div className='subtitle__admin request__title'>Sales ID :</div>
              <div className='resume__field'>{agent?.salesId}</div>
            </div>
            <div className='resume__detail__item'>
              <div className='subtitle__admin request__title'>Username :</div>
              <div className='resume__field'>{agent?.username}</div>
            </div>
            <div className="resume__detail__item">
              <div className="subtitle__admin request__title">Email :</div>
              {isEditingEmail ? (
                <div className="email-edit-modal">
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button onClick={handleSave}>✔</button>
                  <button onClick={handleCancel}>✖</button>
                </div>
              ) : (
                <>
                  {email !== '' && (
                    <div className="resume__field__email resume__field" onClick={enterEmailValue}>
                      {agent?.email}
                    </div>
                  )}
                  {email === '' && (
                    <div className="resume__field__email resume__field" onClick={enterEmailValue}>
                      Empty
                    </div>
                  )}
                </>
              )}
            </div>
            <div className='resume__detail__item'>
              <div className='subtitle__admin request__title'>Full name :</div>
              <div className='resume__field'>{agent?.fullName}</div>
            </div>
          </div>
          <div className='agent__money'>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {noResults && !loading && <p>No requests found.</p>}
            {!loading && !error && !noResults && (
              <table className='agent__table'>
                <thead>
                  <tr>
                    <th>Current points:</th>
                    <th>Lifetime points:</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>USD: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{parseFloat(agent?.usd).toFixed(2)}</td>
                    <td>USD: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{parseFloat(agent?.usd).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>EUR: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{parseFloat(agent?.eur).toFixed(2)}</td>
                    <td>EUR: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{parseFloat(agent?.eur).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>GBP: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{parseFloat(agent?.gbp).toFixed(2)}</td>
                    <td>GBP: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{parseFloat(agent?.gbp).toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
          <button className='agent__add__or__deduct__btn' onClick={() => setIsAddModalOpen(true)}>Add / Deduct</button>
        </div>
        <div className="agent__action">
          <div className="agent__tabs">
            <button
              className={`agent__tab ${activeTab === 'Bookings' ? 'active' : ''}`}
              onClick={() => setActiveTab('Bookings')}
            >
              Bookings
            </button>
            <button
              className={`agent__tab ${activeTab === 'Rewards' ? 'active' : ''}`}
              onClick={() => setActiveTab('Rewards')}
            >
              Rewards
            </button>
          </div>
          {activeTab === 'Bookings' && (
            <>
              <table className="agents__details__list">
                <thead>
                  <tr>
                    <th className="list__title__admin">Check-in</th>
                    <th className="list__title__admin">Selling price</th>
                    <th className="list__title__admin">Points collected</th>
                    <th className="list__title__admin">Currency</th>
                    <th className="list__title__admin">Expiry date</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedBookings.map((item) => (
                    <tr className="agents__details__item" key={item.id}>
                      <td>
                        {new Date(item.createdAt).toLocaleString('en-US', {
                          year: 'numeric',
                          month: 'numeric',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                          hour12: false,
                        })}
                      </td>
                      <td>{item.sellingPrice}</td>
                      <td>{item.pointsCollected}</td>
                      <td>{item.currency}</td>
                      <td>
                        {new Date(item.expireDate).toLocaleString('en-US', {
                          year: 'numeric',
                          month: 'numeric',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                          hour12: false,
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                current={currentBookingsPage}
                pageSize={bookingsPageSize}
                total={filteredBookings.length}
                onChange={handleBookingsPageChange}
                showSizeChanger
                align='center'
                pageSizeOptions={['5', '10', '20']}
              />
            </>
          )}
          {activeTab === 'Rewards' && (
            <>
              <table className="agents__details__list">
                <thead>
                  <tr>
                    <th className="list__title__admin">Date</th>
                    <th className="list__title__admin">Type</th>
                    <th className="list__title__admin">Points</th>
                    <th className="list__title__admin">Pool</th>
                    <th className="list__title__admin">Expiry date</th>
                    <th className="list__title__admin">Comment</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedRewards.map((item) => (
                    <tr className="agents__details__item" key={item.id}>
                      <td>
                        {new Date(item.createdAt).toLocaleString('en-US', {
                          year: 'numeric',
                          month: 'numeric',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                          hour12: false,
                        })}
                      </td>
                      <td>{item.type}</td>
                      <td>{parseFloat(item.amount).toFixed(2)}</td>
                      <td>{item.pool}</td>
                      <td>
                        {new Date(item.expireDate).toLocaleString('en-US', {
                          year: 'numeric',
                          month: 'numeric',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                          hour12: false,
                        })}
                      </td>
                      <td>{item.comment}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                current={currentRewardsPage}
                pageSize={rewardsPageSize}
                total={filteredRewards.length}
                onChange={handleRewardsPageChange}
                showSizeChanger
                align='center'
                pageSizeOptions={['1', '5', '10', '20']}
              />
            </>
          )}
        </div>
      </div >

      {isAddModalOpen && (
        <AddModal
          userId={agent?.id}
          closeModal={() => setIsAddModalOpen(false)}
          refreshItems={refreshRewards}
        />
      )
      }

    </div >
  )
}