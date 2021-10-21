import React, { useEffect, useState } from "react";
import { AppConfig } from "./AppConfig";
import { MyButton } from "./UI/button/MyButton";
import { MyInput } from "./UI/input/MyInput";
import { FetchComponent } from "./FetchComponent";
import { Form } from "react-bootstrap";

export const AddEmployee = ({props}) =>  {    
    const [name, setName] = useState('asd');
    const [email, setEmail] = useState('asd@asd.asd');
    const [birthday, setBirthday] = useState(new Date());
    const [salary, setSalary] = useState(0.00);

    const handleSubmit = (e) => {
        e.preventDefault();
        const employee = {
            "name": name, 
            "email": email, 
            "birthday": birthday, 
            "salary": salary
        };
        
        let body = JSON.stringify( employee );
        console.log(body)
        fetch(process.env.REACT_APP_EMPLOYEE_API, {
            method: "POST",
            headers:{
                'Content-Type':'application/json; charset=utf-8'
            },
            body: body
        })
        .then(resp =>  { 
            if (resp.ok)
                alert("Employee added successfully!");
            console.log(resp.text());
        })
        .catch( error =>
            console.error(error)
        );;
    }

    return (
        <Form onSubmit={handleSubmit}>
            <table>
                <tbody>
                    <tr>
                        <td>Name:</td>
                        <td><MyInput 
                                type="text"
                                name = "name"
                                placeholder="Name"
                                validationRegex = {AppConfig.nameValidationRegex}
                                validRules = "Name should not be empty" 
                                setValue = {setName}
                                value = { name }
                            />
                        </td>
                    </tr>
                    
                    <tr>
                        <td>Email:</td>
                        <td>
                            <MyInput 
                                type="email" 
                                name = "email"
                                placeholder="example@email.com"
                                validationRegex = {AppConfig.emailValidationRegex}
                                validRules = "Enter email"
                                setValue={setEmail}  
                                value = { email }  
                            />
                        </td>
                    </tr>
                    
                    <tr>
                        <td>Birthday:</td>
                        <td>
                            <MyInput 
                                type="date"
                                name = "birthday"
                                validRules = "Enter birthday"
                                setValue={ setBirthday } 
                            />
                        </td>
                    </tr>
                    
                    <tr>
                        <td>Salary:</td>
                        <td>
                            <MyInput 
                                type="number" 
                                name = "salary"
                                placeholder="500.00" 
                                validationRegex = {AppConfig.salaryValidationRegex}
                                validRules = "Enter without spaces and commas"
                                setValue={setSalary}
                                value = { salary }
                            />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            <MyButton value="Add new employee" type="submit"/>
                        </td>
                    </tr>
                </tbody>
            </table>
            <br/>
        </Form>
    )
}