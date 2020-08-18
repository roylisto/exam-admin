export function dateFormatter(oldDate) { 
    let newDate = "-"

    if(oldDate !== null && oldDate !== ""){
        let date = new Date(oldDate)
        
        let day = ("0" + date.getDate()).slice(-2);
        let month = ("0" + (date.getMonth() + 1)).slice(-2);
        let year = date.getFullYear();
        let hours = ("0" + (date.getHours())).slice(-2);
        let minutes = ("0" + (date.getMinutes())).slice(-2);
    
        newDate = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + "00";
    }
    
    return newDate;
}

export function numberFormatter(id,data) {
    let number = 0
    for(let i = 0; i< data.length; i++) {
        if(data[i].id === id) {
            number = i+1
        }
    }
    return number
}