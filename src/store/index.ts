import { composeWithDevTools } from '@redux-devtools/extension';
import { applyMiddleware, createStore } from 'redux';
import { thunk } from "redux-thunk";
import rootReducer from './reducers/index';

export const store: any = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);