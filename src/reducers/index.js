import storeReducer from './storeReducer'
import userReducer from './userReducer'
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
	storeReducer,
	userReducer,
});