import {fetchers} from "../api/fetchers.js";
import {STATUS} from "../constants.js";


export async function renderSuggestions(plantName) {
    const suggestionList = document.querySelector('#search-suggestions');
    try {
        const { fetchPlantList } = fetchers();
        const data = await fetchPlantList(plantName);
        const plantData = [...new Set(data)];
        suggestionList.style.border = '0.1rem solid #2F2C27'
        console.log(plantData);
        if (plantData.length > 5) {
            plantData.length = 5;
        }
        suggestionList.innerHTML = '';
        plantData.forEach(plant => {
            const suggestionEl = document.createElement("li");
            suggestionEl.className = 'suggestion';
            const displayName = plant.common_name;
            suggestionEl.innerHTML = displayName.toLowerCase();
            suggestionList.appendChild(suggestionEl);
        })
    } catch (e) {
        landingPageRenderError(e);
        console.error(e);
    }
}

export function mainLoadingAnimation() {
    const loadingBar = document.querySelector('#loading-bar');
    const loadingNum = document.querySelector('#percentage');

    let percentage = 0;
    let width = 0;

    const intervalId = setInterval(() => {
        width += Math.floor(Math.random() * 4);
        percentage = (width / 60) * 100;
        loadingBar.style.width = `${width}vw`;
        loadingNum.innerHTML = `${percentage.toFixed(0)}%`;

        // TODO: add animation to text in spans (at 20% increments)

        if (percentage >= 100) {
            clearInterval(intervalId);
            loadingBar.style.width = `60vw`;
            loadingBar.style.borderRadius = '0.3rem';
            loadingNum.innerHTML = `100%`;
            setTimeout(() => {
                const loadingPageEl = document.querySelector('.loading-page');
                const orangeBall = document.querySelector('#loading-search-orange-ball');
                orangeBall.style.display = 'block';
                loadingPageEl.style.display = 'none';
            }, 500)
        }
    }, 100);
}

export function landingPageRenderError(error) {
    const errorHandlerEl = document.querySelector('#error-handler');
    errorHandlerEl.innerHTML = `Encountered an error (${error}), please try again later.`;
    errorHandlerEl.style.display = 'block';
}

export function animateLoadingBall() {
    const orangeBall = document.querySelector('#loading-search-orange-ball');
    if (!STATUS.loading) {
        STATUS.loading = true;
        orangeBall.style.animation = 'LoadingBall 1.2s linear infinite'
        return;
    }
    if (STATUS.loading) {
        STATUS.loading = false;
        orangeBall.style.animation = 'none'
    }
}

export function elementCreator(tag, parent, options = {}, text) {
    const createdEl = document.createElement(tag);
    if (options) {
        for (const key in options) {
            createdEl.setAttribute(key, options[key]);
        }
    }
    if (text) {
        createdEl.textContent = text;
    }
    parent.appendChild(createdEl);
}