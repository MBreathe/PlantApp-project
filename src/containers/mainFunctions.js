import {fetchData} from "../api/fetcher.js";
import {PERENUAL_KEY_CHAIN} from "../constants.js";


export async function getPlantName(plantName) {
    const url = `https://perenual.com/api/v2/species-list?key=${PERENUAL_KEY_CHAIN.apiKey}&q=${plantName}`;
    const data = await fetchData(url);
    console.log(data);
}
