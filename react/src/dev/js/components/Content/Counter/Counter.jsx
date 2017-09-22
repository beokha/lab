import React from 'react';
import PropTypes from 'prop-types';

const Counter = ({ increment, decrement, value }) => (
    <div>
        Counter values now is {value}

        <button onClick={increment}>
            +
        </button>
        <button onClick={decrement}>
            -
        </button>
    </div>
);

Counter.propTypes = {
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
    value: PropTypes.number.isRequired,
};

export default Counter;
