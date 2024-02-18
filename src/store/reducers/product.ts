import { Product } from "../../types";
import { FETCH_PRODUCTS_FAILURE, FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_SUCCESS } from "../actions/actions";

interface ProductsState {
    products: Product[];
    loading: boolean;
    error: string | null;
}

const initialProductsState: ProductsState = {
    products: [],
    loading: false,
    error: null,
};

export const productsReducer = (state = initialProductsState, action: any): ProductsState => {
    switch (action.type) {
        case FETCH_PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload,
            };
        case FETCH_PRODUCTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};