export class FetchComponent {
    static getEmployees = async (callback) => {
        let response = fetch(process.env.REACT_APP_EMPLOYEE_API);
        if (response.ok)
            callback(response.json().data);
        else
            callback([]);
    }

    static addEmployee(employee) {
        fetch(process.env.REACT_APP_EMPLOYEE_API, {
            method: "POST",
            headers: {
                'Accept':'application/json',
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: employee
        })
        .then(resp =>  { 
            if (resp.ok)
                alert("Employee added successfully!");
        })
        .catch( error =>
            console.error(error)
        );
    }
}