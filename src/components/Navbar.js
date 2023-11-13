import React, { useState } from 'react';
import '../styles/Navbar.css'

function Navbar({ onPlayMusic, playState }) {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    
    const toggleDropdown = () => setDropdownVisible(!isDropdownVisible);

    return (
        <div className="navbar-container">
            <button onClick={onPlayMusic} className="playPauseButton">
                {playState ? "❚❚" : "▶"} 
            </button>
            <div className="menu-container">
                <a href="/" className="home-link">Home</a>
                <div className="admin-dropdown">
                    <button onClick={toggleDropdown}>
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
        </div>
    );
}

export default Navbar;
