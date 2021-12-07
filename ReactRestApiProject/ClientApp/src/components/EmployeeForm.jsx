import React, { useContext, useEffect, useMemo, useState } from "react";
import { AppConfig } from "./AppConfig";
import { EmployeeContext } from "./hooks/EmployeeContext";
import { MyInput } from "./UI/input/MyInput";
import { todayDate } from "../Utils/DateTimeParser";


export const EmployeeForm = (props) => {
    const {employee, setEmployee} = useContext(EmployeeContext);
    const [name, setName] = useState(employee.name);
    const [email, setEmail] = useState(employee.email);
    const [birthday, setBirthday] = useState(employee.birthday);
    const [salary, setSalary] = useState(employee.salary);

    const maxBirthday = () => {
        return todayDate();
    };

    const emp = useMemo(() => {
        return {
            id: props.id,
            name: name, 
            email: email,
            birthday: birthday,
            salary: salary 
        };
    }, [name, email, birthday, salary]);

    useEffect(() => setEmployee(emp), [emp]);

    return ( 
        <table>
            <tbody>
                <tr>
                    <td>Name:</td>
                    <td><MyInput 
                            type="text"
                            name = "name"
                            placeholder="Name"
                            validationRegex = { AppConfig.nameValidationRegex }
                            validRules = "Name should not be empty" 
                            setValue = { setName }
                            value={ name }
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
                            validationRegex = { AppConfig.emailValidationRegex }
                            validRules = "Enter email"
                            setValue={ setEmail }
                            value={ email }
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
                            placeholder = { Date() }
                            setValue={ setBirthday } 
                            value={ birthday }
                            max={ maxBirthday() }
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
                            validationRegex = { AppConfig.salaryValidationRegex }
                            validRules = "Enter without spaces and commas"
                            setValue={ setSalary }
                            value={ salary }
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    )
}