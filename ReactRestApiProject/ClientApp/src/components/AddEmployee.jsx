import React, { useEffect, useState } from "react";
import { MyButton } from "./UI/button/MyButton";
import { Form } from "react-bootstrap";
import { EmployeeForm } from './EmployeeForm';
import { useEmployeeStatus } from './hooks/useEmployeeStatus';
import { EmployeeContext } from "./hooks/EmployeeContext";
import classes from './UI/button/MyButton.module.css';
import { FetchComponent } from "../Utils/DataFetcher";

export const AddEmployee = ({props}) =>  {
    const [employee, setEmployee] = useState({});
    const isFilled = useEmployeeStatus(employee);

    useEffect(() => console.log(employee));

    const handleSubmit = (e) => {
        e.preventDefault();
        FetchComponent.addEmployee(employee, () => { window.location.href = '/employees' });
    }

    const cancelSubmit = (e) => {
        e.preventDefault();
        window.location.href = '/employees';
    };

    return (
        <EmployeeContext.Provider value={{employee, setEmployee}}>
            <Form>
                    <EmployeeForm id={0}/>
                    <MyButton 
                        customClasses = { classes.group }
                        disabled={!isFilled} 
                        value="Add new employee" 
                        onClick={e => handleSubmit(e)}/>
                    <MyButton customClasses = { classes.red }
                        disabled={false} 
                        value="Cancel"
                        onClick={e => cancelSubmit(e)}/>
            </Form>
        </EmployeeContext.Provider>
    )
}