import React from "react";
import classes from './MyButton.module.css';


export const MyButton = (props) => {
    return (
        <button className={ classes.myBtn } onClick={props.onClick} { ...props } >
            {props.value}
        </button>
    );
}