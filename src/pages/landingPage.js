import {APP_CONTAINER} from "../constants.js";
import {renderLanding} from "../components/landingRenderer.js";
import {getPlantName} from "../containers/mainFunctions.js";

export function initLandingPage() {
    APP_CONTAINER.innerHTML = '';

    const landingElement = renderLanding();
    APP_CONTAINER.appendChild(landingElement);

    const searchBarElement = document.querySelector('#search-a-plant');
    searchBarElement.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            console.log('enter')
        }

    })
}