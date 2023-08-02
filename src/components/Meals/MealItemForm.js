import { useRef, useState } from 'react';

import Input from '../UI/Input/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = props => {

    const [amountIsValid, setAmountIsValid] = useState(true);

    const amountInputRef = useRef();

    const submitHandler = event => {
        event.preventDefault();

        const enteredAmount = amountInputRef.current.value;

        if (enteredAmount.trim().length === 0 || +enteredAmount < 1 || +enteredAmount > 5) {
            setAmountIsValid(false);
            return;
        }

        props.onAddToCart(enteredAmount);
    }

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input
                input={{
                    id: props.id,
                    type: 'number',
                    min: '1',
                    max: '5',
                    defaultValue: '1'
                }}
                label='Amount'
                ref={amountInputRef}
            />
            <button>&#43; Add</button>
            {!amountIsValid && <p>Amount entered is not valid!</p>}
        </form>
    );

};

export default MealItemForm;