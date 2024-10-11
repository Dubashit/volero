import React from 'react';
import './index.css'

export default function ContentComponent({ serverContent }) {
    return (
        <div>
            <div className="content-container" dangerouslySetInnerHTML={{ __html: serverContent }} />
        </div>
    );
}