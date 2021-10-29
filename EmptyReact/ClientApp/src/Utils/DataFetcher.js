import React from 'react';
import { formDateString } from './DateTimeParser';

export class FetchComponent {
    static token = 'access_token';

    static requestHeaders = {
        'Accept':'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': 'Bearer ' + sessionStorage.getItem(this.token)
    }

    static hasToken() {
        return sessionStorage.getItem(this.token) != 'undefined'
    }

    static login(userData, setIsLoading, callback) {
        setIsLoading(true);
        fetch(process.env.REACT_APP_SERVER_API+'login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => response.json())
        .then(data =>  {
            sessionStorage.setItem(this.token, data.access_token);
            setIsLoading(false);
            callback();
        })
        .catch(error =>  {
            console.log(error)
            setIsLoading(false);
        });
    }

    static logout(pathCallback) {
        sessionStorage.setItem(this.token, undefined);
        pathCallback();
    }

    static getEmployees (setEmployees, setIsLoading) {
        setIsLoading(true);
        fetch(process.env.REACT_APP_EMPLOYEE_API, {
            method: 'GET',
            headers: this.requestHeaders
        })
        .then(response => response.json())
        .then(data => {
            setEmployees(data);
            setIsLoading(false);
        });
    };

    static addEmployee(employee, successCallback) {
        employee.lastModifiedDate = new Date();
        fetch(process.env.REACT_APP_EMPLOYEE_API, {
            method: "POST",
            headers: this.requestHeaders,
            body: JSON.stringify(employee)
        })
        .then(resp =>  { 
            if (resp.ok) {
                alert("Employee added successfully!");
                successCallback();
            }
        })
        .catch( error =>
            console.error(error)
        );
    }

    static editEmployee(employee, successCallback) {
        employee.lastModifiedDate = new Date();
        let body = JSON.stringify( employee );
        fetch(process.env.REACT_APP_EMPLOYEE_API, {
            method: "PUT",
            headers: this.requestHeaders,
            body: body
        })
        .then(resp =>  { 
            if (resp.ok) {
                alert("Employee edited successfully!");
                successCallback();
            }
        })
        .catch( error =>
            console.error(error)
        );
    }

    static getEmployee (employeeId, employee, setEmployee, setIsLoading) {
        setIsLoading(true);
        fetch(process.env.REACT_APP_EMPLOYEE_API+`/${employeeId}`, {
            method: 'GET',
            headers: this.requestHeaders
        })
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
    }

    static removeEmployee (employeeId, callback) {
        fetch(process.env.REACT_APP_EMPLOYEE_API+`/${employeeId}`, {
            method: 'DELETE',
            headers: this.requestHeaders
          })
        .then(response => response)
        .then(data =>  { 
            callback(); 
        })
        .catch(error => {
            console.log(error);
        });
    }
}