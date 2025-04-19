import {APP_CONTAINER, STATUS} from "../constants.js";
import {renderPlantPage} from "../components/plantPageRenderer.js";
import {fetchers} from "../api/fetchers.js";
import {hideLoadingScreen, plantPageRenderError, renderDescriptionAndTags} from "../containers/mainFunctions.js";
import {initLandingPage} from "./landingPage.js";
import {storage} from "../containers/localStorage.js";

const { saveToLocalStorage } = storage();

export function initPlantPage() {
    APP_CONTAINER.innerHTML = '';

    const plantElement = renderPlantPage();
    APP_CONTAINER.appendChild(plantElement);

    const { fetchPlantDetails } = fetchers();

    async function populatePlantPage() {
        try {
            const plantInfo = await fetchPlantDetails(STATUS.plantId);

            const plantName = plantInfo.common_name;
            const commonNameEl = document.querySelector("#common-plant-name");
            commonNameEl.textContent = plantName.toUpperCase();

            const scientificNameEl = document.querySelector("#scientific-plant-name");
            scientificNameEl.textContent = `(${plantInfo.scientific_name[0].toLowerCase()})`;

            const plantImg = document.querySelector("#plant-image");
            plantImg.src = plantInfo.default_image.original_url;
            plantImg.alt = `Image of a ${plantName}`;

            renderDescriptionAndTags(plantInfo);

            const returnBtnEl = document.querySelector("#return-to-search");
            returnBtnEl.addEventListener("click", () => {
                STATUS.plantId = null;
                saveToLocalStorage();
                initLandingPage();
            });
            if (document.querySelector('.loading-plant')) {
                setTimeout(() => hideLoadingScreen(), 1000);
            }
        } catch (e) {
            plantPageRenderError(e);
            console.error(e);
        }
    }
    populatePlantPage();
}