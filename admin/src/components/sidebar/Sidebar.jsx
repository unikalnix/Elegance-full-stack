import React from 'react'
import './Sidebar.css'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
    const location = useLocation();
    const currentPath = location.pathname;
    return (
        <div className='sidebar'>
            <h1 className='sidebar__title'>
                Elegance <span className='sidebar__title--highlight'>Admin</span>
            </h1>
            <ul className='sidebar__menu'>
                <li
                    className={`sidebar__menu-item ${currentPath === '/' && 'active'}`}>
                    <Link to='/' className='sidebar__menu-link'>Dashboard</Link>
                </li>
                <li
                    className={`sidebar__menu-item ${currentPath === '/products' && 'active'}`}>
                    <Link to='/products' className='sidebar__menu-link'>Products</Link>
                </li>
                <li
                    className={`sidebar__menu-item ${currentPath === '/orders' && 'active'}`}>
                    <Link to='/orders' className='sidebar__menu-link'>Orders</Link>
                </li>
                <li
                    className={`sidebar__menu-item ${currentPath === '/customers' && 'active'}`}>
                    <Link to='/customers' className='sidebar__menu-link'>Customers</Link>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar
