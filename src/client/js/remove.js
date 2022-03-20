
function removeTrip(photo1, photo2, photo3) {

    const removeTripLi = document.querySelector('#remove-trip');
    
    removeTripLi.addEventListener('click', () => {
        // console.log('omar');
    alert('the trip will remove from local storage');

    const cityName = document.querySelector('#city');
    const startDate = document.querySelector('#start-date');
    const endDate = document.querySelector('#end-date');

    localStorage.clear(); // to clear localStorage
            
    cityName.value = ""; 
    startDate.value = ""; 
    endDate.value = ""; 

    const mainImagesPart = document.querySelector('#main-image');
    const branchImageOne = document.querySelector('#branch-one-image');
    const branchImageTwo = document.querySelector('#branch-two-image');

    const resultOne = document.querySelectorAll('.results span')[0];
    const resultTwo = document.querySelectorAll('.results span')[1];
    const resultThree = document.querySelectorAll('.results span')[2];
    const resultFour = document.querySelectorAll('.results span')[3];

    let images = [photo1, photo2, photo3];
    
    mainImagesPart.setAttribute("src", images[0]);
    branchImageOne.setAttribute("src", images[1]);
    branchImageTwo.setAttribute("src", images[2]);

    resultOne.innerHTML = "welcome in travel planner web";
    resultTwo.innerHTML = "you can check the status of your journey";
    resultThree.innerHTML = "";
    resultFour.innerHTML = "";
    })
}
export {
    removeTrip
}