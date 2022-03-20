
function fromSubmission() {

// HTML Elements:
    const mainImagesPart = document.querySelector('#main-image');
    const branchImageOne = document.querySelector('#branch-one-image');
    const branchImageTwo = document.querySelector('#branch-two-image');

    const resultOne = document.querySelectorAll('.results span')[0];
    const resultTwo = document.querySelectorAll('.results span')[1];
    const resultThree = document.querySelectorAll('.results span')[2];
    const resultFour = document.querySelectorAll('.results span')[3];

    const cityName = document.querySelector('#city').value;
    const startDate = document.querySelector('#start-date').value;
    const endDate = document.querySelector('#end-date').value;

    const saveTrip = document.querySelector('#save-trip');
// asyncronus functions :    
// GET API 
const getAPI = async (url) => {
    const request = await fetch(url);
    // console.log(response);
    try {
        const apiObject = await request.json();
        // console.log(apiObject);
        return apiObject;
    } catch (error) {
        console.log("ERROR : " + error);
    }
}
// Main Function :
    function getAllApis() {

        fetch('http://localhost:3000/Keys', {
            method: 'POST',
        })
            .then(response => response.json())
            .then((res) => { // res is akey 
                // console.log(res);
                const key1 = res.GeoKey; // first API Key
                // console.log(key1);
                const key2 = res.WitherKey; // Second API Key
                // console.log(key2);
                const key3 = res.PixaPay;
                // console.log(key3);

                // to save the journy data in localStorage :
                saveTrip.onclick =  ()=> {
                    alert('the trip is saved in local storage');
                    localStorage.setItem('city', cityName);
                    localStorage.setItem('startDate', startDate);
                    localStorage.setItem('endDate', endDate);
                }
                
                // take every date new Date function to can calculte desired values  
                const journeyDate = new Date(startDate);
                const endJourneyDate = new Date(endDate);

                const today = new Date();
                // calculate the (timeDiffernce ) and (journyLong):
                const timeDiffernce = journeyDate.getTime() - today.getTime(); // to know the date in the past or future        
                const journeyLong = (endJourneyDate.getTime() - journeyDate.getTime()) / 86400000; // to calculate the journy long in days
                
                // Now we can get first api (GeoNames) depend on (placename_startsWith and contry) parameter
                const GeoURL = "http://api.geonames.org/searchJSON?name_startsWith=" + cityName + "&maxRows=10&username=" + key1;
                getAPI(GeoURL).then(function (GeoData) {
                    // console.log(GeoData);
                    // console.log(GeoData.geonames[0]);
                    
                    if (GeoData.totalResultsCount == 0) { // the city name is not correct

                        alert('please Enter correct city name');

                    } else {

                        // get contryName , latitude, and longitude form GeoData object
                        let contry = GeoData.geonames[0].countryName;
                        let latitude = GeoData.geonames[0].lat;
                        let longitude = GeoData.geonames[0].lng;

                        // if the startDate in the past
                        if (timeDiffernce < -86400000) { // before 1 day in millsecond
                            alert('Your Start Date in the past, please Insert future date durning 15 days from today');
                            // remove the startDate in the input filed using (cleanStartDate) function
                            Client.cleanStartDate();
                        }
                        else {
                            // this calculation to take the desird date from witherbit forecast object
                            // dayIndex == object which come with weatherbit api from (0 - 15) 
                            let dayIndex = Math.ceil((journeyDate.getTime() - today.getTime()) / 86400000); 
                            // console.log(journyDayNumber);
                            // console.log(today.getTime());
                            // console.log(dayIndex);

                            const forecastWitherURL = "https://api.weatherbit.io/v2.0/forecast/daily?lat=" + latitude + "&lon=" + longitude + "&key=" + key2;
                            getAPI(forecastWitherURL).then(function (forecastWither) {
                                // console.log(forecastWither);
                                console.log(forecastWither.data[0]); // current wither
                                console.log(forecastWither.data[dayIndex]); // forecast wither 

                                if (dayIndex === 0) { // journey in today
                                    // alert('Your journey in today');
                                    resultOne.innerHTML = cityName + " / " + contry;

                                    if (!endDate) { // if user dont input endDate
                                        resultTwo.innerHTML = "journey duration : ---";
                                    } else if (journeyLong === 0) { // the trip start and end in same day
                                        resultTwo.innerHTML = "journey duration : 1 day";
                                    } else if (journeyLong < 0) {
                                        alert('End date must be come after start date !')
                                        resultTwo.innerHTML = "journey duration : ---";
                                    } else {
                                        resultTwo.innerHTML = "journey duration : " + journeyLong + " days";
                                    }
                            
                                    resultThree.innerHTML = "today weather : " + forecastWither.data[0].weather.description + "<br>" +
                                        "Max Temp: " + forecastWither.data[0].max_temp + " C" + ",  Min Temp: " + forecastWither.data[0].min_temp + " C";
                                    
                                    resultFour.innerHTML = "";
                                    // resultfour 
                                } else if (dayIndex > 0 & dayIndex <= 15) { // if the journey day within 15 days
    
                                    // alert('Your Date in futuer');
                                    resultOne.innerHTML = cityName + " / " + contry;

                                    if (!endDate) { // if user dont input endDate
                                        resultTwo.innerHTML = "journey duration : ---";
                                    } else if (journeyLong === 0) { // the trip start and end in same day
                                        resultTwo.innerHTML = "journey duration : 1 day";
                                    } else if (journeyLong < 0) {
                                        alert('End date must be come after start date !')
                                        resultTwo.innerHTML = "journey duration : ---";
                                    } else {
                                        resultTwo.innerHTML = "journey duration : " + journeyLong + " days";
                                    }

                                    resultThree.innerHTML = "today weather : " + forecastWither.data[0].weather.description + "<br>" +
                                        "Max Temp: " + forecastWither.data[0].max_temp +" C"+ ",  Min Temp: " + forecastWither.data[0].min_temp + " C";
                                    
                                    resultFour.innerHTML = "weather in the journey date : " + forecastWither.data[dayIndex].weather.description + "<br>" +
                                        "Max Temp: " + forecastWither.data[dayIndex].max_temp +" C"+ ",  Min Temp: " + forecastWither.data[dayIndex].min_temp + " C";
                                } else {
                                    alert('sorry Your date after 16 days from today');
                                }
                            
                            })
                            // now get the photo from PixaPay api :
                            // PixaPay API ::
                            const PixaPayURL = "https://pixabay.com/api/?key=" + key3 + "&q=" + cityName + "+" + contry + "&image_type=photo";
                            getAPI(PixaPayURL).then(function (PixaPay) {
                                console.log(PixaPay);

                                if (PixaPay.total === 0) { // No photo 
                                    alert('Please check for city name, you must insert correct city name to can see the city photos');
                                } else {

                                    let placePhotoURL1 = PixaPay.hits[0].webformatURL;
                                    let placePhotoURL2 = PixaPay.hits[1].webformatURL;
                                    let placePhotoURL3 = PixaPay.hits[2].webformatURL;
                                    // console.log(placePhotoURL);
                                    // clearInterval(intervalOne);
                                    // imagesPart.setAttribute("src", placePhotoURL);
                                    
                                    // make an array of these photo :
                                    let images = [placePhotoURL1, placePhotoURL2, placePhotoURL3];

                                    mainImagesPart.setAttribute("src", images[0]);
                                    branchImageOne.setAttribute("src", images[1]);
                                    branchImageTwo.setAttribute("src", images[2]);
                                }
                            });
                        }
                    }
                })
            })   
    }
// main excution :
    return getAllApis();
}

export {
    fromSubmission
}
