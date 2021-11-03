import React from "react";
import classes from './Loader.module.css';

export const Loader = (isInline, props) => {

    return (
        <div 
            className={ isInline? 
                [classes.loader, classes.inlineLoader].join(' ')
                : classes.Loader }>
        </div>
    );
}