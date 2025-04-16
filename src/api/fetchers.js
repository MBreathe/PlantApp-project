import {PERENUAL_KEY_CHAIN} from "../constants.js";

export async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Fetching error:', response.status);
    }
    return response.json();
}

export async function fetchPlantNames(plantName) {
    const url = `https://perenual.com/api/v2/species-list?key=${PERENUAL_KEY_CHAIN.apiKey + PERENUAL_KEY_CHAIN.options.search + plantName}`;
    const rawData = await fetchData(url);
    return rawData.data.map(plant => plant.common_name)
}
