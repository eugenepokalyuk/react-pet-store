interface CartState {
    items: number[];
}

const initialState: CartState = {
    items: [],
};

const cartReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return {
                ...state,
                items: [...state.items, action.payload],
            };
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                items: state.items.filter(id => id !== action.payload),
            };
        default:
            return state;
    }
};

export default cartReducer;