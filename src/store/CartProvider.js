import { useReducer } from 'react';
import CartContext from "./cart-context";

const initialCartState = {
    items: [],
    totalAmount: 0
};

const cartReducer = (state, action) => {
    if (action.type === 'ADD_ITEM') {
        // concat instead of push bec we want a new array
        const updatedItems = state.items.concat(action.newItem);
        const updatedTotalAmount = +state.totalAmount + +action.newItem.price * +action.newItem.amount;
        return {
            items: updatedItems,
            // Does not heck if an item already exists!
            totalAmount: updatedTotalAmount
        };
    } 
    return initialCartState; 
};

const CartProvider = props => {

    const [cartState, dispatchCartState] = useReducer(cartReducer, initialCartState);

    const addItemToCartHandler = item => {
        dispatchCartState({type: 'ADD_ITEM', newItem: item});
    };

    const removeItemFromCartHandler = id => {
        dispatchCartState({type: 'REMOVE_ITEM', id: id});
    };

    // To update real context, passed to children
    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>

    )
}

export default CartProvider;