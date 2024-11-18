import React, { useState } from 'react';
import './index.css';
import { useLocation } from 'react-router-dom';
import { putCoefficient, putLanguage, putStopList, putTag } from '../../api';
import { notification } from 'antd';

export default function EditModal({ item, closeModal, refreshItems }) {

    const location = useLocation()

    const [titleTag, setTitleTag] = useState(item.title);
    const [salesIdCoef, setSalesIdCoef] = useState(item.salesId)
    const [percentage, setPercentage] = useState(item.percentage)
    const [code, setCode] = useState(item.code)
    const [titleLanguage, setTitleLanguage] = useState(item.title)
    const [salesIdStopList, setSalesIdStopList] = useState(item.salesId)
    const [usernameStopList, setUsernameStopList] = useState(item.username)

    const handleSave = async (e) => {
        e.preventDefault()
        if (location.pathname === '/admin/coefficients') {
            try {
                const res = await putCoefficient(item, salesIdCoef, percentage)
                if (res.status === 200) {
                    notification.success({
                        message: 'Successful',
                        description: 'Updating of coefficient successfully',
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
                }
            }
        } else if (location.pathname === '/admin/tags') {
            try {
                const res = await putTag(item, titleTag);
                if (res.status === 200) {
                    notification.success({
                        message: 'Successful',
                        description: 'Updating of tag successfully',
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
                }
            }
        } else if (location.pathname === '/admin/languages') {
            try {
                const res = await putLanguage(item, code, titleLanguage);
                if (res.status === 200) {
                    notification.success({
                        message: 'Successful',
                        description: 'Updating of language successfully',
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
                }
            }
        } else if (location.pathname === '/admin/stopList') {
            try {
                const res = await putStopList(item, salesIdStopList, usernameStopList)
                if (res.status === 200) {
                    notification.success({
                        message: 'Successful',
                        description: 'Updating of stop list successfully',
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
                }
            }
        }
    };

    const renderForm = () => {
        if (location.pathname === '/admin/coefficients') {
            return (
                <div className="modal__content">
                    <span className="close" onClick={closeModal}>&times;</span>
                    <div className='title__admin'>Edit coefficient</div>
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
                                onChange={(e) => setPercentage(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="save__button">Save</button>
                    </form>
                </div>
            )
        } else if (location.pathname === '/admin/tags') {
            return (
                <div className="modal__content">
                    <span className="close" onClick={closeModal}>&times;</span>
                    <div className='title__admin'>Edit tag</div>
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
            )
        } else if (location.pathname === '/admin/languages') {
            return (
                <div className="modal__content">
                    <span className="close" onClick={closeModal}>&times;</span>
                    <div className='title__admin'>Edit language</div>
                    <form onSubmit={handleSave}>
                        <div className="form__group">
                            <label>Code</label>
                            <input
                                type="text"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form__group">
                            <label>Title</label>
                            <input
                                type="text"
                                value={titleLanguage}
                                onChange={(e) => setTitleLanguage(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="save__button">Save</button>
                    </form>
                </div>
            )
        } else if (location.pathname === '/admin/stopList') {
            return (
                <div className="modal__content">
                    <span className="close" onClick={closeModal}>&times;</span>
                    <div className='title__admin'>Edit stop list</div>
                    <form onSubmit={handleSave}>
                        <div className="form__group">
                            <label>Sales ID</label>
                            <input
                                type="text"
                                value={salesIdStopList}
                                onChange={(e) => setSalesIdStopList(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form__group">
                            <label>Username</label>
                            <input
                                type="text"
                                value={usernameStopList}
                                onChange={(e) => setUsernameStopList(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="save__button">Save</button>
                    </form>
                </div>
            )
        }
    }

    return (
        <div className="modal">
            {renderForm()}
        </div>
    );
}
