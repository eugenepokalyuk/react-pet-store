import { ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART } from "../actions/actions";

interface CartState {
    items: { [productId: number]: number }; // Ключ - ID товара, значение - количество
}

const initialState: CartState = {
    items: {},
};

// const cartReducer = (state = initialState, action: { type: any, payload: number }) => {
//     switch (action.type) {
//         case ADD_TO_CART:
//             return {
//                 ...state,
//                 items: [...state.items, action.payload],
//             };
//         case REMOVE_FROM_CART:
//             const index: number = state.items.indexOf(action.payload);
//             if (index !== -1) {
//                 const newItems: number[] = [...state.items];
//                 newItems.splice(index, 1);
//                 return {
//                     ...state,
//                     items: newItems,
//                 };
//             }
//             return state;
//         case CLEAR_CART:
//             return {
//                 ...state,
//                 items: [],
//             };
//         default:
//             return state;
//     }
// };
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