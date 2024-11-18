import React, { useRef, useState } from 'react'
import './index.css'
import { useLocation } from 'react-router-dom';
import { getPicture } from '../../api';

export default function FileUpload({ onFileSelect, isEditPage, item }) {

    const filePicker = useRef();
    const location = useLocation();
    const [selectedFile, setSelectedFile] = useState('')

    const handleChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                setSelectedFile(e.target.result);
            };

            reader.readAsDataURL(file);
            onFileSelect(file);
        }
    }

    return (
        <div className='file__upload'>
            <input
                ref={filePicker}
                type='file'
                onChange={handleChange}
                accept='.jpeg, .png, .jpg, .gif, .webp'
                style={{ display: 'none' }}
                required
            />
            <button className='pick__btn' onClick={() => filePicker.current.click()}>Pick image</button>

            {selectedFile && (
                <div className='image__viewer'>
                    <img src={selectedFile} alt='image1' />
                    {isEditPage = false}
                </div>
            )}

            {isEditPage && location.pathname.includes('/admin/articles/edit') && (
                <div className='image__viewer'>
                    {getPicture(item.preview)}
                </div>
            )}

            {isEditPage && location.pathname.includes('/admin/testimonials/edit') && (
                <div className='image__viewer'>
                    {getPicture(item.image)}
                </div>
            )}
        </div>
    )
}