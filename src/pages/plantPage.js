import {APP_CONTAINER} from "../constants.js";
import {renderPlantPage} from "../components/plantPageRenderer";

export function initLandingPage() {
    APP_CONTAINER.innerHTML = '';

    const plantElement = renderPlantPage();
    APP_CONTAINER.appendChild(plantElement);
}