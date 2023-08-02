import { useContext, useEffect, useState } from 'react';

import CartIcon from "../Cart/CartIcon";
import classes from './HeaderCartButton.module.css';
import CartContext from '../../store/cart-context';

const HeaderCartButton = props => {

    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

    const cartCtx = useContext(CartContext);

    const totalItems = cartCtx.items.reduce((currNum, item) => {
        return +item.amount + currNum;
    }, 0);
    
    const btnClasses = `${classes.button} ${btnIsHighlighted? classes.bump : ''}`

    useEffect(() => {
        if (cartCtx.items.length === 0) {
            return;
        }
        setBtnIsHighlighted(true);
        const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
        }, 300);
        return () => {
            clearTimeout(timer);
        };
    }, [cartCtx.items])

    return (
        <button className={btnClasses} onClick={props.onShowCart}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{totalItems}</span>
        </button>
    )
}

export default HeaderCartButton;