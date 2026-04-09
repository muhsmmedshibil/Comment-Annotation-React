import React, { useState } from 'react';
import { Sun, Bell,MessageCircle , ChevronDown } from 'lucide-react';
import './navbar.css';



export function Navbar({ currentUser, setCurrentUser, USERS_DATA, comments }) {
    const [isOpen, setIsOpen] = useState(false);


    // Filter out the current user from the list
    const otherUsers = USERS_DATA.filter(user => user.id !== currentUser.id);

    const handleUserChange = (user) => {
        setCurrentUser(user);
        setIsOpen(false);
    };

    return (
        <header className="header">
            <div className="header-left">
                <div className="logo-container">
                    <div className="logo-icon">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                            <path d="M12 7v6" strokeOpacity="0.5" />
                            <path d="M9 10h6" strokeOpacity="0.5" />
                        </svg>
                    </div>
                    <div className="logo-text">
                        <span className="text-primary">Comment</span>
                        <span className="text-secondary">Annotation</span>
                    </div>
                </div>
            </div>

            <div className="header-right">
                <div className="utility-actions">
                    <button className="icon-btn" title="Dark Mode"><Sun size={20} /></button>
                    <button className="icon-btn" title="Notifications">
                        <span className="notification-dot">{comments.length}</span>
                        <MessageCircle  size={20} />
                    </button>
                </div>

                <div className="v-divider"></div>

                {/* User Tab with Dropdown Logic */}
                <div className="user-dropdown-container">
                    <div className={`user-tab ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
                        <div className="avatar-wrapper">
                            <img
                                src={currentUser.imageUrl || `https://ui-avatars.com/api/?name=${currentUser.name}&background=${currentUser.color}&color=fff`}
                                alt="User Profile"
                                className="avatar-img"
                            />
                            <div className="status-badge"></div>
                        </div>
                        <div className="user-meta">
                            <span className="user-name">{currentUser.name}</span>
                            <span className="user-label">{currentUser.label}</span>
                        </div>
                        <ChevronDown size={14} className={`dropdown-arrow ${isOpen ? 'rotate' : ''}`} />
                    </div>

                    {/* The Dropdown List */}
                    {isOpen && (
                        <div className="dropdown-menu">
                            <p className="dropdown-title">Switch Account</p>
                            {otherUsers.map(user => (
                                <div key={user.id} className="dropdown-item" onClick={() => handleUserChange(user)}>
                                    <img
                                        src={user.imageUrl || `https://ui-avatars.com/api/?name=${user.name}&background=${user.color}&color=fff`}
                                        alt={user.name}
                                        className="avatar-img-sm"
                                    />
                                    <div className="user-meta">
                                        <span className="user-name">{user.name}</span>
                                        <span className="user-label">{user.label}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}