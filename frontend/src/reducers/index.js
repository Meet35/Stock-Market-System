import { combineReducers } from 'redux';

import auth from './auth';
import stock from './stock';

export const reducers = combineReducers({ auth, stock });
