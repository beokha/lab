import React, { Component } from 'react';
/* import PropTypes from 'prop-types'; */
import { BrowserRouter as Router } from 'react-router-dom';


import Header from './Header/Header.jsx';
import Content from './Content/Content.jsx';
import Footer from './Footer/Footer.jsx';

/* import Content from './Content/Content';
import Footer from './Footer/Footer'; */

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router className="App">
                <div>
                    <Header />
                    <Content />
                    <Footer />
                </div>
            </Router>
        );
    }
}

export default App;
