import {APP_CONTAINER, PERENUAL_KEY_CHAIN} from "../constants.js";
import {renderPlantPage} from "../components/plantPageRenderer.js";
import {fetchData, fetchPlantNames} from "../api/fetchers.js";

export function initPlantPage(plantName) {
    APP_CONTAINER.innerHTML = '';

    const url = `https://perenual.com/api/v2/species-list?key=${PERENUAL_KEY_CHAIN.apiKey + PERENUAL_KEY_CHAIN.options.search + plantName}`;
    const plantNames = async () => await fetchPlantNames(plantName);

    const plantElement = renderPlantPage(plantNames()[0]);
    APP_CONTAINER.appendChild(plantElement);
}