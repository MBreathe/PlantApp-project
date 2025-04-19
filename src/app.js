import {initLandingPage} from "./pages/landingPage.js";
import {STATUS} from "./constants.js";
import {initPlantPage} from "./pages/plantPage.js";
import {storage} from "./containers/localStorage.js";

const { loadLocalStorage } = storage();

function loadApp() {
    if (localStorage.length > 0) {
        loadLocalStorage();
        if (STATUS.plantId) {
            initPlantPage();
        }
        else {
            initLandingPage();
        }
    }
    else {
        initLandingPage();
    }
}

window.addEventListener('load', loadApp);