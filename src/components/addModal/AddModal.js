import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './index.css'
import { postCoefficient, postLanguage, postReward, postStopList, postTag } from '../../api';

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

    const handleSave = async () => {
        try {
            if (location.pathname === '/coefficients') {
                if (salesIdCoef === '') { return alert('Sales ID is null') }
                if (percentage === '') { return alert('Percentage is null') }
                await postCoefficient(salesIdCoef, percentage)
                refreshItems();
                closeModal();
            } else if (location.pathname === '/tags') {
                if (titleTag === '') { return alert('Title is null') }
                await postTag(titleTag)
                refreshItems();
                closeModal();
            } else if (location.pathname === '/languages') {
                if (code === '') { return alert('Code is null') }
                if (titleLanguage === '') { return alert('Title is null') }
                await postLanguage(code, titleLanguage)
                refreshItems();
                closeModal();
            } else if (location.pathname === '/stopList') {
                if (salesIdStopList === '') { return alert('Sales ID is null') }
                if (usernameStopList === '') { return alert('Username is null') }
                await postStopList(salesIdStopList, usernameStopList)
                refreshItems();
                closeModal();
            } else if (location.pathname.includes('/agentsDetails')) {
                if (amount === '') { return alert('Amount is null') }
                await postReward(userId, type, pool, amount, comment)
                refreshItems();
                closeModal();
            }
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    const renderForm = () => {
        if (location.pathname === '/coefficients') {
            return (
                <div className="modal__content">
                    <span className="close" onClick={closeModal}>&times;</span>
                    <div className='title__admin'>Add</div>
                    <form onSubmit={handleSave}>
                        <div className="form__group">
                            <label>Sales ID</label>
                            <input
                                type="text"
                                onChange={(e) => setSalesIdCoef(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form__group">
                            <label>Percentage</label>
                            <input
                                type="number"
                                onChange={(e) => setPersentage(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="save__button">Save</button>
                    </form>
                </div>
            );
        } else if (location.pathname === '/tags') {
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
        } else if (location.pathname === '/languages') {
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
        else if (location.pathname === '/stopList') {
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
                        <div className="form__group">
                            <label>Username</label>
                            <input
                                type="text"
                                onChange={(e) => setUsernameStopList(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="save__button">Save</button>
                    </form>
                </div>
            );
        } else if (location.pathname.includes('/agentsDetails')) {
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