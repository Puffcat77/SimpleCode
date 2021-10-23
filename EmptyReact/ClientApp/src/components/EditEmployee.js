import React, { useEffect, useState } from "react";
import { MyButton } from "./UI/button/MyButton";
import { Button, Form } from "react-bootstrap";
import { EmployeeForm } from './EmployeeForm';
import { useEmployeeStatus } from './hooks/useEmployeeStatus';
import { EmployeeContext } from "./hooks/EmployeeContext";
import classes from './UI/buttonGroups/ButtonGroups.module.css';

export const EditEmployee = (props) => {
    const [employee, setEmployee] = useState({id: props.match.params.id});
    const isFilled = useEmployeeStatus(employee);
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        setIsLoading(true);
        fetch(process.env.REACT_APP_EMPLOYEE_API+`/${employee.id}`)
            .then(response => response.json())
            .then(data => {
                let birthday = new Date(data.birthday);
                let year = birthday.getFullYear();
                let month = birthday.getMonth() + 1 < 10 ?
                     '0' + (birthday.getMonth() + 1)
                     : birthday.getMonth() + 1;
                let day = birthday.getDate() < 10 ?
                '0' + (birthday.getDate())
                : birthday.getDate();
                setEmployee({
                    ...employee,
                    ...data,
                    birthday: [year, month, day].join('-'),
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
                    <div className={ [classes.buttons].join(' ') }>
                        <MyButton 
                            disabled={!isFilled} 
                            value="Save"
                            onClick={e => handleSubmit(e)}/>
                        <MyButton customClasses = { classes.cancel }
                            disabled={false} 
                            value="Cancel"
                            onClick={e => cancelSubmit(e)}/>
                    </div>
                </Form>
            }
        </EmployeeContext.Provider>
    );
};