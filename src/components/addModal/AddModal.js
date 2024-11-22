import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './index.css'
import { postCoefficient, postLanguage, postReward, postStopList, postTag } from '../../api';
import { notification } from 'antd';

export default function AddModal({ userId, closeModal, refreshItems }) {
    const location = useLocation();
    const [titleTag, setTitleTag] = useState('');
    const [code, setCode] = useState('')
    const [titleLanguage, setTitleLanguage] = useState('')
    const [salesIdCoef, setSalesIdCoef] = useState('')
    const [percentage, setPersentage] = useState('')
    const [salesIdStopList, setSalesIdStopList] = useState('')
    const [usernameStopList, setUsernameStopList] = useState('')
    const [type, setType] = useState('+')
    const [pool, setPool] = useState('USD')
    const [amount, setAmount] = useState('')
    const [comment, setComment] = useState('')

    const handleSave = async (e) => {
        e.preventDefault()
        if (location.pathname === '/admin/coefficients') {
            try {
                const res = await postCoefficient(salesIdCoef, percentage)
                if (res.status === 200) {
                    notification.success({
                        message: 'Successful',
                        description: 'Creation of coefficient successfully',
                        duration: 3
                    });
                    refreshItems();
                    closeModal();
                }
            } catch (error) {
                if (error.status === 500) {
                    notification.error({
                        message: 'Error',
                        description: 'The server is not responding',
                        duration: 3
                    });
                } else if (error.status === 400) {
                    return notification.error({
                        message: 'Error creating coefficient',
                        description: 'The field "Sales ID" must be unique',
                        duration: 3
                    });
                }
            }
        } else if (location.pathname === '/admin/tags') {
            try {
                const res = await postTag(titleTag);
                if (res.status === 200) {
                    notification.success({
                        message: 'Successful',
                        description: 'Creation of tag successfully',
                        duration: 3
                    });
                    refreshItems();
                    closeModal();
                }
            } catch (error) {
                if (error.status === 500) {
                    notification.error({
                        message: 'Error',
                        description: 'The server is not responding',
                        duration: 3
                    });
                } else if (error.status === 400) {
                    notification.error({
                        message: 'Error creating tag',
                        description: 'The field "Tag name" must be unique',
                        duration: 3
                    });
                }
            }
        } else if (location.pathname === '/admin/languages') {
            try {
                const res = await postLanguage(code, titleLanguage);
                if (res.status === 200) {
                    notification.success({
                        message: 'Successful',
                        description: 'Creation of language successfully',
                        duration: 3
                    });
                    refreshItems();
                    closeModal();
                }
            } catch (error) {
                if (error.status === 500) {
                    notification.error({
                        message: 'Error',
                        description: 'The server is not responding',
                        duration: 3
                    });
                } else if (error.status === 400) {
                    notification.error({
                        message: 'Error creating language',
                        description: 'The field "Code" must be unique',
                        duration: 3
                    });
                }
            }
        } else if (location.pathname === '/admin/stopList') {
            try {
                const res = await postStopList(salesIdStopList, usernameStopList)
                if (res.status === 200) {
                    notification.success({
                        message: 'Successful',
                        description: 'Creation of stop list successfully',
                        duration: 3
                    });
                    refreshItems();
                    closeModal();
                }
            } catch (error) {
                if (error.status === 500) {
                    notification.error({
                        message: 'Error',
                        description: 'The server is not responding',
                        duration: 3
                    });
                } else if (error.status === 400) {
                    notification.error({
                        message: 'Error creating stop list',
                        description: 'The field "Username" must be unique',
                        duration: 3
                    });
                }
            }
        } else if (location.pathname.includes('/admin/agentsDetails')) {
            try {
                const res = await postReward(userId, type, pool, amount, comment)
                if (res.status === 200) {
                    notification.success({
                        message: 'Successful',
                        description: 'Creation of reward successfully',
                        duration: 3
                    });
                    refreshItems();
                    closeModal();
                }
            } catch (error) {
                if (error.status === 500) {
                    notification.error({
                        message: 'Error',
                        description: 'The server is not responding',
                        duration: 3
                    });
                } else {
                    notification.error({
                        message: 'Error',
                        description: 'Error creating reward',
                        duration: 3
                    });
                }
            }
        }
    };

    const renderForm = () => {
        if (location.pathname === '/admin/coefficients') {
            return (
                <div className="modal__content">
                    <span className="close" onClick={closeModal}>&times;</span>
                    <div className='title__admin'>Add</div>
                    <form onSubmit={handleSave}>
                        <div className="form__group">
                            <label>Sales ID</label>
                            <input
                                type="text"
                                value={salesIdCoef}
                                onChange={(e) => setSalesIdCoef(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form__group">
                            <label>Percentage</label>
                            <input
                                type="number"
                                value={percentage}
                                onChange={(e) => setPersentage(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="save__button">Save</button>
                    </form>
                </div>
            );
        } else if (location.pathname === '/admin/tags') {
            return (
                <div className="modal__content">
                    <span className="close" onClick={closeModal}>&times;</span>
                    <div className='title__admin'>Add</div>
                    <form onSubmit={handleSave}>
                        <div className="form__group">
                            <label>Tag Name</label>
                            <input
                                type="text"
                                value={titleTag}
                                onChange={(e) => setTitleTag(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="save__button">Save</button>
                    </form>
                </div>
            );
        } else if (location.pathname === '/admin/languages') {
            return (
                <div className="modal__content">
                    <span className="close" onClick={closeModal}>&times;</span>
                    <div className='title__admin'>Add</div>
                    <form onSubmit={handleSave}>
                        <div className="form__group">
                            <label>Code</label>
                            <input
                                type="text"
                                onChange={(e) => setCode(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form__group">
                            <label>Title</label>
                            <input
                                type="text"
                                onChange={(e) => setTitleLanguage(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="save__button">Save</button>
                    </form>
                </div>
            );
        }
        else if (location.pathname === '/admin/stopList') {
            return (
                <div className="modal__content">
                    <span className="close" onClick={closeModal}>&times;</span>
                    <div className='title__admin'>Add</div>
                    <form onSubmit={handleSave}>
                        <div className="form__group">
                            <label>Sales ID</label>
                            <input
                                type="text"
                                onChange={(e) => setSalesIdStopList(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form__group form__group__optional">
                            <label>Username</label>
                            <input
                                type="text"
                                onChange={(e) => setUsernameStopList(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="save__button">Save</button>
                    </form>
                </div>
            );
        } else if (location.pathname.includes('/admin/agentsDetails')) {
            return (
                <div className="modal__content">
                    <span className="close" onClick={closeModal}>&times;</span>
                    <div className='title__admin'>Reward</div>
                    <form onSubmit={handleSave}>
                        <div className='form__group'>
                            <label>Add / Deduct</label>
                            <select
                                type='text'
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                required
                            >
                                <option value={'+'}>+</option>
                                <option value={'-'}>-</option>
                            </select>
                        </div>
                        <div className='form__group'>
                            <label>Pool</label>
                            <select
                                type='text'
                                value={pool}
                                onChange={(e) => setPool(e.target.value)}
                                required
                            >
                                <option value={'USD'}>USD</option>
                                <option value={'EUR'}>EUR</option>
                                <option value={'GBP'}>GBP</option>
                            </select>
                        </div>
                        <div className="form__group">
                            <label>Amount</label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form__group">
                            <label>Comment</label>
                            <textarea
                                type="text"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="save__button">Save</button>
                    </form>
                </div>
            );
        } else {
            return <p>No form available for this page</p>;
        }
    };

    return (
        <div className="modal">
            {renderForm()}
        </div>
    );
}