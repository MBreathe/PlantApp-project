import {PERENUAL_KEY_CHAIN} from "../constants.js";


export function fetchers() {
    async function fetchData(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Unable to load data: ${response.status}`);
        }
        return response.json();
    }

    async function fetchPlantList(plantName) {
        const url = `//https://perenual.com/api/v2/species-list?key=${PERENUAL_KEY_CHAIN.apiKey + PERENUAL_KEY_CHAIN.options.search + plantName}`;
        const data =  await fetchData(url);
        console.log('fetched data from plant api:', data);
        return data.data;
    }

    async function fetchPlantDetails(plantId) {
        const url = `https://perenual.com/api/v2/species/details/${plantId}?key=${PERENUAL_KEY_CHAIN.apiKey}`;
        return await fetchData(url);
    }
    return {fetchPlantList, fetchPlantDetails};
}