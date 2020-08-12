export function dateFormatter(date) {  

    let day = ("0" + date.getDate()).slice(-2);
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let year = date.getFullYear();
    let hours = ("0" + (date.getHours() + 1)).slice(-2);
    let minutes = ("0" + (date.getMinutes() + 1)).slice(-2);

    let newDate = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + "00";
    
    return newDate;
}