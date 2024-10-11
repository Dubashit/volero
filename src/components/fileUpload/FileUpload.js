import React, { useState } from 'react';
import './index.css';

export default function FileUpload({ onFileSelect }) {
    const [dragActive, setDragActive] = useState(false);
    const [file, setFile] = useState(null);

    const allowedFileTypes = 'application/pdf';

    const handleFileChange = (e) => {
        const uploadedFile = e.target.files[0];
        if (uploadedFile) {
            console.log(uploadedFile);
            validateAndSetFile(uploadedFile);
        }
    };

    const validateAndSetFile = (uploadedFile) => {
        if (uploadedFile.size > 5 * 1024 * 1024) {
            alert('File size exceeds 5 MB');
            return;
        }

        if (!allowedFileTypes.includes(uploadedFile.type)) {
            alert('Invalid file type. Only PDF files are allowed.');
            return;
        }

        setFile(uploadedFile);
        onFileSelect(uploadedFile);
    };

    const handleFileDelete = (e) => {
        e.preventDefault();
        setFile(null);
        onFileSelect(null);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragActive(true);
    };

    const handleDragLeave = () => {
        setDragActive(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragActive(false);

        const droppedFile = e.dataTransfer.files[0];
        console.log(droppedFile);

        if (droppedFile) {
            validateAndSetFile(droppedFile);
        }
    };

    return (
        <div className="file-upload">
            <div className='group__title'>Upload CV</div>
            {file ? (
                <div className="file-preview">
                    <div className="file-info">
                        <img src='/pdf.png' alt="File icon" className="file-icon" />
                        <div className="file-details">
                            <div className="file-name">{file.name}</div>
                            <div className="file-size">
                                {(file.size / 1024 / 1024).toFixed(2)} MB. {new Date().toLocaleDateString()}
                            </div>
                        </div>
                        <button className="delete-btn" type="button" onClick={handleFileDelete}>
                            Delete
                        </button>
                    </div>
                </div>
            ) : (
                <div
                    className={`file-drop-zone ${dragActive ? 'drag-active' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <input
                        type="file"
                        id="file-upload"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        accept=".pdf"
                    />
                    <label htmlFor="file-upload" className="file-upload-label">
                        <span>Click to upload</span> or drag and drop
                    </label>
                    <p>Maximum file size 5 MB</p>
                </div>
            )}
        </div>
    );
}
