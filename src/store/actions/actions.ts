import { Product } from "../../types";

// Product
export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

export const fetchProductsRequest = () => ({
    type: FETCH_PRODUCTS_REQUEST,
});

export const fetchProductsSuccess = (products: Product[]) => ({
    type: FETCH_PRODUCTS_SUCCESS,
    payload: products,
});

export const fetchProductsFailure = (error: string) => ({
    type: FETCH_PRODUCTS_FAILURE,
    payload: error,
});

// Cart
export const ADD_TO_CART = 'ADD_TO_CART';
export const CLEAR_CART = 'CLEAR_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export const addToCart = (productId: number) => ({
    type: ADD_TO_CART,
    payload: productId,
});

export const clearCart = () => ({
    type: CLEAR_CART
});

export const removeFromCart = (productId: number) => ({
    type: REMOVE_FROM_CART,
    payload: productId,
});
