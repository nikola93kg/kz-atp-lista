import React from 'react';
import '../styles/Toast.css';

function Toast({ message, type }) {
    return (
        <div className={`toast ${type}`}>
            {message}
        </div>
    );
}

export default Toast;
