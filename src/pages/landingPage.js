import {APP_CONTAINER, STATUS} from "../constants.js";
import {renderLanding} from "../components/landingRenderer.js";
import {
    animateLoadingBall,
    mainLoadingAnimation,
    renderSuggestions
} from "../containers/mainFunctions.js";
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
            timeout = setTimeout (() => {
                animateLoadingBall();
                setTimeout(async () => {
                    await renderSuggestions(searchBarElement.value);
                    animateLoadingBall();
                }, 2000)
            }, 250)
        }
        if (e.key === 'Enter' && searchBarElement.value.length > 1) {
            animateLoadingBall();
            setTimeout(() => {
                animateLoadingBall();
                initPlantPage(searchBarElement.value);
            }, 3000);
        }
    });
    searchBarElement.addEventListener("change", (e) => {
        if (e.target.value.length === 0) {
            searchSuggestions.style.display = 'none';
        }
    });
    if (searchSuggestions) {
        searchSuggestions.addEventListener('click', (e) => {
            if (e.target.tagName === 'LI') {
                searchBarElement.value = e.target.textContent;
                searchSuggestions.style.display = 'none';
            }
        });
    }

}