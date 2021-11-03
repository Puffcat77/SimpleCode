import React from 'react';
import classes from './MySelect.module.css'

export const MySelect = ({callback,
        value, 
        values, 
        defaultValue,
        disabled,
        defaultClasses,
        props}) => {

    return (
        <select 
        value = { value }
        defaultValue={ defaultValue } 
        className={ [classes.mySelect, defaultClasses].join(' ') } 
        onChange={
            event => {
                callback(event.target.value)
            }
        }
        disabled={disabled}>
        {values.map(opt => 
            <option 
                value={opt.value} 
                label={opt.displayLabel} 
                key={opt.id}/>)}
        </select>
    )
}