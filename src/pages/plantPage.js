import {APP_CONTAINER} from "../constants.js";
import {renderPlantPage} from "../components/plantPageRenderer.js";
import {fetchPlantData} from "../api/fetchers.js";

export function initPlantPage(plantName) {
    APP_CONTAINER.innerHTML = '';

    const plantData = async () => await fetchPlantData(plantName);

    const plantElement = renderPlantPage(plantData()[0]);
    APP_CONTAINER.appendChild(plantElement);
}