import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { putRequestForPoints } from '../../api'
import './index.css'
import { notification } from 'antd'

export default function RequestForPointsDetails() {

    const location = useLocation()
    const navigate = useNavigate()

    const requestForPoints = location?.state.requestForPoints
    const isCompletedTab = location?.state.isCompletedTab;

    useEffect(() => {
        document.querySelector('.main__content__admin').scrollTo(0, 0);
    }, [location]);

    const setCompleted = async () => {
        try {
            await putRequestForPoints(requestForPoints.id, { isDone: 'Completed' });
            notification.success({
                message: 'Successful',
                description: 'Request marked as completed',
                duration: 3
            });
            
            navigate('/admin/requestForPoints', { state: { refresh: true } }); 
        } catch (error) {
            console.error('Error updating request:', error);
            notification.error({
                message: 'Error',
                description: 'Failed to updating request',
                duration: 3
            });
        }
    };

    return (
        <div className='all__content__admin'>
            <div className='title__admin'>Request for points</div>
            <div className='content__block__admin'>
                <div className='resume__detail__item'>
                    <div className='subtitle__admin request__title'>Username :</div>
                    <div className='resume__field'>{requestForPoints.username}</div>
                </div>
                <div className='resume__detail__item'>
                    <div className='subtitle__admin request__title'>Email :</div>
                    <div className='resume__field'>{requestForPoints.email}</div>
                </div>
                <div className='resume__detail__item'>
                    <div className='subtitle__admin request__title'>Phone :</div>
                    <div className='resume__field'>Country code : +{requestForPoints.countryCode}<br />National Number : {requestForPoints.phone}</div>
                </div>
                <div className='resume__detail__item'>
                    <div className='subtitle__admin request__title'>Message :</div>
                    <div className='resume__field'>{requestForPoints.message}</div>
                </div>
                {!isCompletedTab && (
                    <button className='btn__set__completed' onClick={setCompleted}>Completed</button>
                )}
            </div>
        </div>
    )
}