import React, { useState } from 'react';
import '../styles/Navbar.css'

function Navbar({ onPlayMusic, playState }) {
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    return (
        <div className="navbar-container">
            <button onClick={onPlayMusic} className="playPauseButton">
                {playState ? "❚❚" : "▶"} 
            </button>
            
            <div className="admin-dropdown">
                <button onClick={() => setDropdownVisible(!isDropdownVisible)}>
                    Admin
                </button>

                {isDropdownVisible && (
                    <div className="admin-dropdown-content">
                        <a href="/admin/add">Add</a>
                        <a href="/admin/update">Edit</a>
                        <a href="/admin/delete">Delete</a>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;
