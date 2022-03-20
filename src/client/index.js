// import sass files
import './styles/general.scss'
import './styles/header.scss'
import './styles/main.scss'
import './styles/mediaQuery.scss'

// import all images from media folder
import photo1 from './media/photo1.png'
import photo2 from './media/photo2.png'
import photo3 from './media/photo3.png'
// ::::::::::::::::::::::::::::::::::::

// import js files
import { startWeb } from './js/start'
import { fromSubmission } from './js/formSubmit'
import { removeTrip } from './js/remove'
import { printPage } from './js/print'
import { cleanStartDate} from './js/formClean'


// excute functions :
// firstly excute startWeb function
startWeb(photo1, photo2, photo3);
// ::::::::::::::::::::::::::::::::::::::::::::::
const formPart = document.querySelector('form');
formPart.addEventListener('submit', (event) => {
    event.preventDefault();
    fromSubmission();
});
// ::::::::::::::::::::::::::::::::::::::::::::::::
removeTrip(photo1, photo2, photo3);
//:::::::::::::::::::::::::::::::::::::::::::::::::
const printPart = document.querySelector('#print-trip');
printPart.addEventListener('click', () => {
    printPage();
})

export {
    cleanStartDate // use it in (fromSubmission) function to remove startDate when it was in past 
}
