import * as actions from './actions';
import def from './default';

const rootReducer = (state = def, action) => {
    switch (action.type) {
    case actions.INCREMENT:
        return {
            value: state.value + 1,
        };
    case actions.DECREMENT:
        return {
            value: state.value - 1,
        };
    default:
        return state;
    }
};

export default rootReducer;
