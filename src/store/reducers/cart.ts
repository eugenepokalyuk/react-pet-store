import { ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART } from "../actions/actions";

interface CartState {
    items: { [productId: number]: number };
}

const initialState: CartState = {
    items: {},
};

const cartReducer = (state = initialState, action: { type: string; payload: number }) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addItemCount = state.items[action.payload] || 0;
            return {
                ...state,
                items: { ...state.items, [action.payload]: addItemCount + 1 },
            };
        case REMOVE_FROM_CART:
            const removeItemCount = state.items[action.payload];
            if (removeItemCount > 1) {
                return {
                    ...state,
                    items: { ...state.items, [action.payload]: removeItemCount - 1 },
                };
            } else {
                const newItems = { ...state.items };
                delete newItems[action.payload];
                return {
                    ...state,
                    items: newItems,
                };
            }
        case CLEAR_CART:
            return {
                ...state,
                items: {},
            };
        default:
            return state;
    }
};

export default cartReducer;