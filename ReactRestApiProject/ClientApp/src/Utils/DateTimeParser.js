export const formDateString = (date) => {
    let year = date.getFullYear();
    let month = date.getMonth() + 1 < 10 ?
            '0' + (date.getMonth() + 1)
            : date.getMonth() + 1;
    let day = date.getDate() < 10 ?
    '0' + (date.getDate())
    : date.getDate();
    return [year, month, day].join('-');
}

export const todayDate = () => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }
    
    return [yyyy, mm, dd].join('-');
};