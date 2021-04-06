import { ADD_STOCK } from './types';
import * as api from '../api/index.js';

export const getstocks = () => async (dispatch) => {
    try {
        const { data } = await api.getStocks();
        console.log('only 1 times');
        dispatch({ type: ADD_STOCK, data });

    } catch (error) {
        console.log(error);
        alert("Invalid Credentials...");
    }
};
