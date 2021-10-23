import React, { useEffect, useState } from "react";
import classes from './MyInput.module.css';

export const MyInput = ({type, validationRegex, setValue, ...props}) => {
    const [isValid, setIsValid] = useState(false);

    useEffect(() => validateInput(props.value), [])

    const validateInput = val => {
        if (val === undefined)
            return;
        if (!val.match(validationRegex)) {
            setIsValid(false);
        }
        else {
            setIsValid(true);
        }
        setValue(val);
    }

    return (
        <div>
            <input 
                type = { type } 
                className = { classes.myInput }
                onChange = { e => validateInput(e.target.value) }
                value = {props.value}
                max = {props.max}
                />
            <div className={ classes.validation } >
            {!isValid ?
                <p className = { classes.inputRules }> { props.validRules } </p>
                :<div className= { classes.correctMark }></div>
            }
            </div>
        </div>
    );
}