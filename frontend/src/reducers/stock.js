import * as actionType from '../actions/types';

const stockReducer = (state = { stockData: null }, action) => {
    switch (action.type) {
        case actionType.ADD_STOCK:
            return { ...state, stockData: action.data, loading: false, errors: null };
        default:
            return state;
    }
};

export default stockReducer;
