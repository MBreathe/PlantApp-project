import {PERENUAL_KEY_CHAIN} from "../constants.js";

export async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Fetching error:', response.status);
    }
    return response.json();
}

export async function fetchPlantData(plantName) {
    const url = `https://perenual.com/api/v2/species-list?key=${PERENUAL_KEY_CHAIN.apiKey + PERENUAL_KEY_CHAIN.options.search + plantName}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log('fetched data from plant api', data);
    return data.data;
}
