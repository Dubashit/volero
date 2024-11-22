import React, { useEffect, useState } from 'react'
import './index.css'
import { useLocation } from 'react-router-dom'
import { notification } from 'antd'
import { getGlobalSetting, postGlobalSetting } from '../../api'

export default function GlobalSettingPage() {

    const location = useLocation()

    const [globalPercent, setGlobalPercent] = useState('')
    const [globalDays, setGlobalDays] = useState('')

    useEffect(() => {
        fetchGlobalSetting()
        document.querySelector('.main__content__admin').scrollTo(0, 0)
    }, [location])

    const fetchGlobalSetting = async () => {
        const global = await getGlobalSetting()
        
        if(global){
            // notification.success({
            //     message: 'Successful',
            //     description: 'Global settings loaded',
            //     duration: 3,
            // });
            setGlobalPercent(global.percentage)
            setGlobalDays(global.days)
        }
    }

    const sendFormData = async (e) => {
        e.preventDefault()
        if (globalPercent !== null && globalDays !== null) {
            const global = await postGlobalSetting(globalPercent, globalDays)
            if(global){
                notification.success({
                    message: 'Successful',
                    description: 'Global settings has been saved',
                    duration: 3,
                });
                setGlobalPercent(global.percentage)
                setGlobalDays(global.days)
            } else {
                notification.error({
                    message: 'Error',
                    description: 'Server is not responding',
                    duration: 3,
                });
            }
        } else {
            notification.error({
                message: 'Error',
                description: 'Please enter all fields',
                duration: 3,
            });
        }
    }

    return (
        <div className='all__content__admin'>
            <div className='title__admin'>Global setting</div>
            <div className='content__block__admin'>
                <div className="form__container">
                    <form onSubmit={sendFormData}>
                        <div className="form__group">
                            <label>Default %</label>
                            <input
                                type="number"
                                value={globalPercent}
                                onChange={(e) => setGlobalPercent(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form__group">
                            <label>Points validity (days)</label>
                            <input
                                type="number"
                                value={globalDays}
                                onChange={(e) => setGlobalDays(e.target.value)}
                                required
                            />
                        </div>

                        <button className="submit__btn" type='submit'>Save</button>
                    </form>
                </div>
            </div>
        </div>
    )
}