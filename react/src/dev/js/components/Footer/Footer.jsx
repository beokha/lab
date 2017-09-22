import React from 'react';
import { Route } from 'react-router-dom';
import CounterContainer from '../../containers/Counter/Counter.jsx';

const Footer = () => (
    <div className="app-footer">
        <hr />

        Footer

        <hr />

        <Route path="/counter" component={CounterContainer} />
    </div>
);

export default Footer;
