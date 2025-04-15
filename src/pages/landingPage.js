import {APP_CONTAINER} from "../constants.js";
import {renderLanding} from "../components/landingRenderer.js";
import {renderSuggestions} from "../containers/mainFunctions.js";

export function initLandingPage() {
    APP_CONTAINER.innerHTML = '';

    const landingElement = renderLanding();
    APP_CONTAINER.appendChild(landingElement);

    let timeout;
    const searchBarElement = document.querySelector('#search-a-plant');
    const searchSuggestions = document.querySelector('#search-suggestions-container');
    searchBarElement.addEventListener("keyup", () => {

        clearTimeout(timeout);
        searchSuggestions.style.display = 'block';

        if (searchBarElement.value.length > 1) {
            timeout = setTimeout(async () => await renderSuggestions(searchBarElement.value), 250)
        }
    })
    searchBarElement.addEventListener("blur", () => searchSuggestions.style.display = 'none')
}