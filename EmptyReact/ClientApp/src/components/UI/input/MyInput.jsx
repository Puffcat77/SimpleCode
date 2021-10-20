import React, { useState } from "react";
import classes from './MyInput.module.css';

export const MyInput = ({type, validationRegex, setValue, ...props}) => {
    const [isValid, setIsValid] = useState(false)

    const validateInput = e => {
        let val = e.target.value;
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
                onChange = { e => validateInput(e) }
                value = {props.value}
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