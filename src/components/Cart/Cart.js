import { useContext } from 'react';

import Modal from '../UI/Modal/Modal';
import CartItem from './CartItem';

import classes from './Cart.module.css';

import CartContext from '../../store/cart-context';

const Cart = props => {

    const cartCtx = useContext(CartContext);

    const totalAmount = cartCtx.totalAmount.toFixed(2);
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    };
    const cartItemAddHandler = item => {
        cartCtx.addItem({...item, amount: 1});
    };

    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map(item => <CartItem 
                                            key={item.id}
                                            name={item.name}
                                            amount={item.amount}
                                            price={item.price}
                                            onRemove={cartItemRemoveHandler.bind(null, item.id)}
                                            onAdd={cartItemAddHandler.bind(null, item)}
                                        />)}
        </ul>
    );

    return (
        <Modal onClose={props.onHideCart}>
            { cartItems }
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>&#36; {totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button-alt']} onClick={props.onHideCart}>
                    Close
                </button>
                {hasItems && <button className={classes.button}>Order</button>}
            </div> 
        </Modal>
    );
};


export default Cart;