function startWeb(photo1, photo2, photo3) {


    const mainImagesPart = document.querySelector('#main-image');
    const branchImageOne = document.querySelector('#branch-one-image');
    const branchImageTwo = document.querySelector('#branch-two-image');

    const resultOne = document.querySelectorAll('.results span')[0];
    const resultTwo = document.querySelectorAll('.results span')[1];
    const resultThree = document.querySelectorAll('.results span')[2];
    const resultFour = document.querySelectorAll('.results span')[3];

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    let images = [photo1, photo2, photo3];
    
    mainImagesPart.setAttribute("src", images[0]);
    branchImageOne.setAttribute("src", images[1]);
    branchImageTwo.setAttribute("src", images[2]);

    resultOne.innerHTML = "welcome in travel planner web";
    resultTwo.innerHTML = "you can check the status of your journey";
    resultThree.innerHTML = "";
    resultFour.innerHTML = "";
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    const formPart = document.querySelector('form');
    const addTripLi = document.querySelector('#add-trip');

    addTripLi.addEventListener('click', () => {
        // add show class to add trip
        formPart.classList.toggle('show');

        const cityName = document.querySelector('#city');
        const startDate = document.querySelector('#start-date');
        const endDate = document.querySelector('#end-date');
       // to get localStorage data
        cityName.value = localStorage.getItem('city');
        startDate.value = localStorage.getItem('startDate');
        endDate.value = localStorage.getItem('endDate');

    });
    
}

export {
    startWeb
}