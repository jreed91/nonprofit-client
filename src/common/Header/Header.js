import React from 'react';
import './Header.css';
import { Container } from 'semantic-ui-react'

const Header = () => {
    return (
        <div className="nav-header">
            <nav className="navbar">
                    <a className="navbar-brand" href="/">Name</a>
                    <div className="collapse-nav">
                        <ul className="navbar-nav">
                            <li className="nav-item"><a className="nav-link" href="/">Home</a></li>
                            <li className="nav-item"><a className="nav-link" href="/projects">Projects</a></li>
                            <li className="nav-item"><a className="nav-link" href="/volunteers">Volunteers</a></li>
                        </ul>
                    </div>
            </nav>
        </div>
    )
}

export default Header;