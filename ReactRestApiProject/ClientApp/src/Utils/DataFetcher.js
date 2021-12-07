import { formDateString } from './DateTimeParser';

export class FetchComponent {
    static token = 'access_token';

    static requestHeaders = {
        'Accept':'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': 'Bearer ' + sessionStorage.getItem(this.token)
    }

    static hasToken() {
        let token = sessionStorage.getItem(this.token);
        return token !== 'undefined' && token !== undefined && token !== null
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
            alert('Something\'s wrong! Check console for details')
            console.log(error)
            setIsLoading(false);
        });
    }

    static logout(pathCallback) {
        sessionStorage.setItem(this.token, undefined);
        pathCallback();
    }

    static getEmployees (setEmployees,
            setIsLoading,
            setPages, 
            order, 
            limit = 10, 
            page = 1) {
        setIsLoading(true);
        let params = new URLSearchParams({
            limit: limit,
            page: page,
            orderProp: order.propName,
            order: order.orderBy
        });
        fetch(process.env.REACT_APP_EMPLOYEE_API + `?${params.toString()}`, {
            method: 'GET',
            headers: this.requestHeaders
        })
        .then(response => response.json())
        .then(data => {
            setEmployees(data.employees);
            setPages(data.pages);
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
        .catch(error => {
            alert('Something\'s wrong! Check console for details')
            console.log(error)
        });
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
        .catch(error => {
            alert('Something\'s wrong! Check console for details')
            console.log(error)
        });
    }

    static getEmployee(employeeId, employee, setEmployee, setIsLoading) {
        setIsLoading(true);
        fetch(process.env.REACT_APP_EMPLOYEE_API+`${employeeId}`, {
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
            })
            .catch(error => {
                alert('Something\'s wrong! Check console for details')
                console.log(error)
            });
    }

    static removeEmployee(employeeId, callback) {
        fetch(process.env.REACT_APP_EMPLOYEE_API+`${employeeId}`, {
            method: 'DELETE',
            headers: this.requestHeaders
          })
        .then(response => response)
        .then(data =>  { 
            callback(); 
        })
        .catch(error => {
            alert('Something\'s wrong! Check console for details')
            console.log(error);
        });
    }
}