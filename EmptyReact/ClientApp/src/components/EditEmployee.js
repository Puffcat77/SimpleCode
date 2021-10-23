import React, { useEffect, useState } from "react";
import { MyButton } from "./UI/button/MyButton";
import { Button, Form } from "react-bootstrap";
import { EmployeeForm } from './EmployeeForm';
import { useEmployeeStatus } from './hooks/useEmployeeStatus';
import { EmployeeContext } from "./hooks/EmployeeContext";
import classes from './UI/button/MyButton.module.css';

export const EditEmployee = (props) => {
    const [employee, setEmployee] = useState({id: props.match.params.id});
    const isFilled = useEmployeeStatus(employee);
    const [isLoading, setIsLoading] = useState(false);
    
    const formDateString = (date) => {
        let year = date.getFullYear();
        let month = date.getMonth() + 1 < 10 ?
                '0' + (date.getMonth() + 1)
                : date.getMonth() + 1;
        let day = date.getDate() < 10 ?
        '0' + (date.getDate())
        : date.getDate();
        return [year, month, day].join('-');
    }

    useEffect(() => {
        setIsLoading(true);
        fetch(process.env.REACT_APP_EMPLOYEE_API+`/${employee.id}`)
            .then(response => response.json())
            .then(data => {
                let birthday = new Date(data.birthday);
                setEmployee({
                    ...employee,
                    ...data,
                    birthday: formDateString(birthday),
                    salary: data.salary?.toString()
                });
                setIsLoading(false);
            });
    }, []);

    useEffect(() => console.log(employee));

    const handleSubmit = (e) => {
        e.preventDefault();
        let body = JSON.stringify( employee );
        fetch(process.env.REACT_APP_EMPLOYEE_API, {
            method: "PUT",
            headers:{
                'Content-Type':'application/json; charset=utf-8'
            },
            body: body
        })
        .then(resp =>  { 
            if (resp.ok)
                alert("Employee edited successfully!");
        })
        .catch( error =>
            console.error(error)
        );
        window.location.href = '/';
    };

    function cancelSubmit(e) {
        e.preventDefault();
        window.location.href = '/';
    };
    
    return (
        <EmployeeContext.Provider value={{employee, setEmployee, isLoading}}>
            { isLoading?
                <h3>Loading...</h3>
                :
                <Form>
                    <EmployeeForm id={props.match.params.id}/>
                    <div className={ [classes.group].join(' ') }>
                        <MyButton 
                            disabled={!isFilled} 
                            value="Save"
                            onClick={e => handleSubmit(e)}/>
                        <MyButton customClasses = { classes.red }
                            disabled={false} 
                            value="Cancel"
                            onClick={e => cancelSubmit(e)}/>
                    </div>
                </Form>
            }
        </EmployeeContext.Provider>
    );
};