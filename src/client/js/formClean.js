function cleanStartDate() {
    // this function to remove the startdate when the user insert past date 
    const startDate = document.querySelector('#start-date');

    startDate.value = "";
    
}

export {
    cleanStartDate 
}
