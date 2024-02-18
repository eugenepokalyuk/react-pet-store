import { combineReducers } from 'redux';
import cartReducer from './cart';
import { productsReducer } from './product';

const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer
});

export default rootReducer;