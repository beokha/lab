import React, { Component } from 'react';
import PropTypes from 'prop-types';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="app">Hello, {this.props.name}, I'm your react application!</div>
        );
    }
}


App.propTypes = {
    name: PropTypes.string.isRequired
}

export default App;