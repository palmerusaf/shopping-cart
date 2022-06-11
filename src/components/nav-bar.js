import '../styles/nav-bar.scss'
import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
    const inActiveClass='nav-bar__item'
    const activeClass=inActiveClass+'nav-bar__item--active'

    return (
        <nav>
            <ul>
                <li>
                <NavLink to='/shop'>shop</NavLink>
                </li>
            </ul>
        </nav>
    )
};
