import React from 'react';
import classes from './MySelect.module.css'

export const MySelect = ({callback,
        value, 
        values, 
        defaultValue,
        disabled, 
        props}) => {

    return (
        <div className={ classes.mySelectContainer }>
            <select 
            value = { value }
            defaultValue={ defaultValue } 
            className={ classes.mySelect } 
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
        </div>
    )
}