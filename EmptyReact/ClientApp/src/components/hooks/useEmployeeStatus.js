import { useState, useEffect } from 'react';
import { AppConfig } from '../AppConfig';

export const useEmployeeStatus = (employee) => {
    const [isFilled, setIsFilled] = useState(false);

    useEffect(() => {
        setIsFilled((
            employee.name !== undefined 
            && employee.name !== '' 
            && employee.email !== undefined 
            && employee.email !== ''
            && employee.email.match(AppConfig.emailValidationRegex)
            && employee.birthday !== undefined 
            && employee.birthday !== ''
            && employee.salary !== undefined 
            && employee.salary !== ''
        ));
    }, [employee]);

    return isFilled;
}