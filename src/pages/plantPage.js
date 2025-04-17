import {APP_CONTAINER} from "../constants.js";
import {renderPlantPage} from "../components/plantPageRenderer.js";
import {fetchers} from "../api/fetchers.js";
import {elementCreator} from "../containers/mainFunctions.js";

export function initPlantPage(plantName) {
    APP_CONTAINER.innerHTML = '';

    const plantElement = renderPlantPage();
    APP_CONTAINER.appendChild(plantElement);

    fetchers();
    const plantData = async () => {
        try {
            return await fetchers.fetchPlantList(plantName);
        } catch (e) {
            console.error(e);
        }
    }
    const plantId = plantData.id;

    const plantImg = document.querySelector("#plant-image");
    plantImg.src = plantData.default_image.original_url;
    plantImg.alt = `Image of a ${plantName}`;

    const commonNameEl = document.querySelector("#common-plant-name");
    commonNameEl.textContent = plantName.toUpperCase();

    const scientificNameEl = document.querySelector("#scientific-plant-name");
    scientificNameEl.textContent = plantData.scientific_name[0].toLowerCase();

    const plantInfo = async () => {
        try {
            return await fetchers.fetchPlantDetails(plantId);
        } catch (e) {
            console.error(e);
        }
    }

    const topTagContainerEl = document.querySelector("#top-tag-container");
    elementCreator('', topTagContainerEl, { class: 'container' }, '');
}