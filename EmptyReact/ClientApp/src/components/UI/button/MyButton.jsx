import React from "react";
import classes from './MyButton.module.css';


export const MyButton = (props) => {
    return (
        <button 
            className={ [classes.myBtn, classes.rounded, props.customClasses].join(' ') } 
            onClick = { props.onClick }
            disabled = { props.disabled } >
            {props.value}
        </button>
    );
}