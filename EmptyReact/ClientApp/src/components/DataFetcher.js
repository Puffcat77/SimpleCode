import { formDateString } from '../Utils/DateTimeParser'

export class FetchComponent {
    static getEmployees (setEmployees, setIsLoading) {
        setIsLoading(true);
        fetch(process.env.REACT_APP_EMPLOYEE_API)
        .then(response => response.json())
        .then(data => {
            setEmployees(data);
            setIsLoading(false);
        });
    };

    static addEmployee(employee, successCallback) {
        fetch(process.env.REACT_APP_EMPLOYEE_API, {
            method: "POST",
            headers: {
                'Accept':'application/json',
                'Content-Type': 'application/json;charset=utf-8'
            },
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
        let body = JSON.stringify( employee );
        fetch(process.env.REACT_APP_EMPLOYEE_API, {
            method: "PUT",
            headers:{
                'Content-Type':'application/json; charset=utf-8'
            },
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
        fetch(process.env.REACT_APP_EMPLOYEE_API+`/${employeeId}`)
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
            method: 'DELETE'
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