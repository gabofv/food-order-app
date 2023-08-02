import classes from './MealItem.module.css';

const MealItem = props => {

    return (
        <li className={classes.meal}>
            <div>
                <h3>{props.name}</h3>
                <p className={classes.description}>{props.desc}</p>
                <p className={classes.price}>{props.price}</p>
            </div>
            <div>

            </div>
        </li>
    )
}

export default MealItem;