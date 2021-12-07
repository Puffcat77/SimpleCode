import React from 'react';
import selectClasses from '../select/MySelect.module.css';
import { MySelect } from '../select/MySelect';

export const MyLimit = ({setLimit, limit, isLoading, props}) => {
    return (
        <div style={{marginTop: '5px'}}>
        Show by
        <MySelect 
            defaultClasses={[ selectClasses.mySelectContainer ]}
            values={[
                {value:10, displayLabel:10, id:0}, 
                {value:15, displayLabel:15, id:1}, 
                {value:20, displayLabel:20, id:2}
            ]}
            value={ limit }
            defaultValue={10}
            callback={ val => setLimit(val) }
            disabled={ isLoading }
        />  
      </div>
    );
}