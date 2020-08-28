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

export function emailFormatter(input) {
    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            
    if (reg.test(input) === false) {  
        return false; 
    } else {
        return true;
    }
}

export function phoneNumberFormatter(input) {
    let reg = /^(^\+62\s?|^0)(\d{3,4}-?){2}\d{3,4}$/g;
            
    if (reg.test(input) === false) {  
        return false; 
    } else {
        return true;
    }
}

export function formatPassword(input) {
    let reg = /^(?=.*[0-9])([a-zA-Z0-9]{8,})$/;
            
    if (reg.test(input) === false) {  
        return false; 
    } else {
        return true;
    }
}