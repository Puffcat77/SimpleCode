import React from 'react';
import classes from './MySelect.module.css'

export const MySelect = ({onChange, propName, value, props}) => {
    const options = [ 
        {label: '-', value: '', id: 0}, 
        {label: '↑', value: 'ascending', id: 1},
        {label: '↓', value: 'descending', id: 2}
    ];

    return (
        <select 
            value = { value }
            defaultValue={options[0]} 
            className={ classes.mySelect } 
            onChange={
                event => onChange({
                    propName: propName,
                    orderBy: event.target.value
                })
            }>
            {options.map(opt => 
                <option value={opt.value} label={opt.label} key={opt.id}/>)}
        </select>
    )
}