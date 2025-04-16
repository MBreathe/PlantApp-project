import {fetchPlantData} from "../api/fetchers.js";
import {STATUS} from "../constants.js";



export async function renderSuggestions(plantName) {
    const suggestionList = document.querySelector('#search-suggestions');
    const plantData = await fetchPlantData(plantName);
    suggestionList.innerHTML = '';
    plantData.forEach(plant => {
        const suggestionEl = document.createElement("li");
        const plantName = plant.common_name
        suggestionEl.innerHTML = plantName.toLowerCase();
        suggestionList.appendChild(suggestionEl);
    })
}

export function loadingDots() {
    const loadingEls = document.querySelectorAll('.loading');
    if (!STATUS.loading) {
        STATUS.loading = true;
        loadingEls.forEach(elem => elem.style.display = 'block');
    }
    STATUS.loading = false;
    loadingEls.forEach(elem => elem.style.display = 'none');
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
                loadingPageEl.style.display = 'none';
            }, 500)
        }
    }, 100);
}