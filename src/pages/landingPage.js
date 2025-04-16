import {APP_CONTAINER} from "../constants.js";
import {renderLanding} from "../components/landingRenderer.js";
import {mainLoadingAnimation, renderSuggestions} from "../containers/mainFunctions.js";
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

        if (searchBarElement.value.length > 1) {
            //timeout = setTimeout(async () => await renderSuggestions(searchBarElement.value), 250)
        }
        if (e.key === 'Enter' && searchBarElement.value.length > 1) {
            initPlantPage(searchBarElement.value);
        }
    })
    searchBarElement.addEventListener("blur", () => searchSuggestions.style.display = 'none')
    searchSuggestions.addEventListener('click', (e) => {
        if (e.target.tagName === 'li') {
            searchBarElement.value = e.target.textContent;
        }
    })

}