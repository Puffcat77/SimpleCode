import React from 'react';
import { MySelect } from '../select/MySelect';

export const MyOrder = ({isLoading, setOrder, order, props}) => {
    const defaultValue = {value: '', displayLabel: '-', id:0}

    const propNames = [
        {value: 'Name', displayLabel: 'name', id:1},
        {value: 'Email', displayLabel: 'email', id:2}, 
        {value: 'Birthday', displayLabel: 'birthday', id:3}, 
        {value: 'Salary', displayLabel: 'salary', id:4}
    ];

    const orderOptions = [
        {value: 'asc', displayLabel: 'ascending', id:1},
        {value: 'desc', displayLabel: 'descending', id:2}
    ]


    return (
        <div style={{display: 'flex', justifyContent: 'flex-start'}}>
        Sort by 
        <MySelect 
        callback={(val) => {
            if (val === '')
                setOrder({
                    propName: '',
                    orderBy: ''
                })
            else
                setOrder({
                    ...order,
                    propName: val
                })
        }} 
        values={[defaultValue, ...propNames]}
        defaultValue={'-'}
        disabled={isLoading}
        value={order.propName}
        /> 
        in 
        <MySelect 
        callback={(val) => {
            console.log(order, val)
            setOrder({
                ...order,
                orderBy: val
            })
        }}
        values={[defaultValue, ...orderOptions]}
        defaultValue={'-'}
        disabled={order.propName == '' || isLoading }
        value={order.orderBy}/>
        order
        </div>
    )
}