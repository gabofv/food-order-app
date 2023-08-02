import { useReducer } from 'react';
import CartContext from "./cart-context";

const initialCartState = {
    items: [],
    totalAmount: 0
};

const cartReducer = (state, action) => {
    console.log('reducer in action');
    if (action.type === 'ADD_ITEM') {
        // concat instead of push bec we want a new array
        
        // What if an item already exists, then only update amount
        //const updatedItems = state.items.concat(action.newItem);
        
        const updatedTotalAmount = +state.totalAmount + +action.newItem.price * +action.newItem.amount;
        const existingCartItemIndex = state.items.findIndex(
            item => item.id === action.newItem.id
        );
        const existingCartItem = state.items[existingCartItemIndex];
        
        let updatedItems;
        
        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: +existingCartItem.amount + +action.newItem.amount
            }
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        else {
            updatedItems = state.items.concat(action.newItem);
        }

        return {
            items: updatedItems,
            // Does not heck if an item already exists!
            totalAmount: updatedTotalAmount
        };
    }
    if (action.type === 'REMOVE_ITEM') {
        const existingCartItemIndex = state.items.findIndex(
            item => item.id === action.id
        );
        const existingCartItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingCartItem.price;
        let updatedItems;
        
        if (+existingCartItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id);
        }
        else {
            const updatedItem = { ...existingCartItem, amount: existingCartItem.amount - 1};
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        return {
            items: updatedItems,
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