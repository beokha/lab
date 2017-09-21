import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Login from '../../logic/Login/Login.jsx';

class Content extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='app-content'>
                <hr />
                <Route exec path='/Login' component={Login} />

                <div className='container'>
                    Content!
                </div>
            </div>
        );
    }
}

export default Content;

