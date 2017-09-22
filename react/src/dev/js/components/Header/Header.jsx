import React, { Component } from 'react';
import {
    /* Route, */
    Link,
} from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="app-header">
                <h2> React </h2>
                <ul className="nav">
                    <li className="nav__link">
                        <Link to='/'> Home </Link>
                    </li>
                    <li className='nav__link'>
                        <Link to='/Login'> Login </Link>
                    </li>
                    <li className="nav__link">
                        <Link to="/counter"> Show counter </Link>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Header;
