import {fetchData} from "../api/fetcher.js";
import {PERENUAL_KEY_CHAIN} from "../constants.js";


export async function renderSuggestions(plantName) {
    const suggestionList = document.querySelector('#search-suggestions');
    const url = `https://perenual.com/api/v2/species-list?key=${PERENUAL_KEY_CHAIN.apiKey + PERENUAL_KEY_CHAIN.options.search + plantName}`;
    const rawData = await fetchData(url);
    const plantNames = rawData.data.map(plant => plant.common_name)
    console.log(plantNames);
    suggestionList.innerHTML = '';
    plantNames.forEach(plantName => {
        const suggestionEl = document.createElement("li");
        suggestionEl.innerHTML = plantName.toLowerCase();
        suggestionList.appendChild(suggestionEl);
    })
}