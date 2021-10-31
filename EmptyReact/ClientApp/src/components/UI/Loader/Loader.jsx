import React from "react";
import classes from './Loader.module.css';

export const Loader = (isInline, props) => {
    console.log(isInline)

    return (
        <div 
            className={ isInline? 
                [classes.loader, classes.inlineLoader].join(' ')
                : classes.Loader }>

        </div>
    );
}