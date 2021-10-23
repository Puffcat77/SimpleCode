import { formDateString } from '../Utils/DateTimeParser'

export const FetchComponent = (props) => {
    const getEmployees = (setEmployees, setIsLoading) => {
        setIsLoading(false);
        fetch(process.env.REACT_APP_EMPLOYEE_API)
        .then(response => response.json())
        .then(data => {
            setEmployees(data);
            setIsLoading(true);
        });
    };

    const addEmployee = (employee, setIsAdding) => {
        setIsAdding(true);
        fetch(process.env.REACT_APP_EMPLOYEE_API, {
            method: "POST",
            headers: {
                'Accept':'application/json',
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: employee
        })
        .then(resp =>  { 
            if (resp.ok) {
                setIsAdding(false);
                alert("Employee added successfully!");
            }
        })
        .catch( error =>
            console.error(error)
        );
    }

    const editEmployee = (employee) => {
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
    }

    const getEmployee = (employeeId, employee, setEmployee, setIsLoading) => {
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

    const removeEmployee = (employeeId, isLoading) => {
        isLoading(true);
        fetch(process.env.REACT_APP_EMPLOYEE_API+`/${employeeId}`, {
            method: 'DELETE'
          })
        .then(response => response)
        .then(data => isLoading(false))
        .catch(error => {
            isLoading(false);
            console.log(error);
        });
    }
}