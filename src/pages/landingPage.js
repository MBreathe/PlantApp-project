import {APP_CONTAINER} from "../constants.js";
import {renderLanding} from "../components/landingRenderer.js";
import {landingPageRenderError, mainLoadingAnimation, renderSuggestions} from "../containers/mainFunctions.js";
import {initPlantPage} from "./plantPage.js";
import {renderLoadingScreen} from "../components/loadingRenderer.js";

export function initLandingPage() {
    APP_CONTAINER.innerHTML = '';

    const mainLoadingEl = renderLoadingScreen();
    APP_CONTAINER.appendChild(mainLoadingEl);
    mainLoadingAnimation();

    const landingElement = renderLanding();
    APP_CONTAINER.appendChild(landingElement);

    let timeout;
    const searchBarElement = document.querySelector('#search-a-plant');
    const searchSuggestions = document.querySelector('#search-suggestions-container');
    searchBarElement.addEventListener("keyup", (e) => {

        clearTimeout(timeout);
        searchSuggestions.style.display = 'block';

        if (searchBarElement.value.length > 1 && e.key !== 'Enter') {
            timeout = setTimeout(async () => {
                try {
                    //await renderSuggestions(searchBarElement.value);
                } catch (e) {
                    landingPageRenderError(`Ran into an error: ${e}, try again later`);
                }
            }, 250)
        }
        if (e.key === 'Enter' && searchBarElement.value.length > 1) {
            initPlantPage(searchBarElement.value);
        }
    })
    searchBarElement.addEventListener("change", (e) => {
        if (e.target.value.length === 0) {
            searchSuggestions.style.display = 'none';
        }
    })
}