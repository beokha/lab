import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../../core/actions';
import Counter from '../../components/Content/Counter/Counter.jsx';

class CounterContainer extends PureComponent {
    render() {
        return <Counter {...this.props} />;
    }
}

CounterContainer.propTypes = {
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
    value: PropTypes.number.isRequired,
};

export default connect(
    state => ({ value: state.value }),
    dispatch => bindActionCreators(actions, dispatch),
)(CounterContainer);
