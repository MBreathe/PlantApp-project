import { PERENUAL_KEY_CHAIN } from "../constants.js";

export function fetchers() {
  async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Unable to load data: ${response.status}. Please try again later.`,
      );
    }
    return response.json();
  }

  async function fetchPlantList(plantName) {
    try {
      const url = `https://perenual.com/api/v2/species-list?key=${PERENUAL_KEY_CHAIN.apiKey + PERENUAL_KEY_CHAIN.options.search + plantName}`;
      const dataObj = await fetchData(url);
      return dataObj.data;
    } catch (e) {
      console.error(`Failed to load plant list: ${e}`);
      throw e;
    }
  }

  async function fetchPlantDetails(plantId) {
    try {
      const url = `https://perenual.com/api/v2/species/details/${plantId}?key=${PERENUAL_KEY_CHAIN.apiKey}`;
      return await fetchData(url);
    } catch (e) {
      console.error(`Failed to fetch plant details: ${e}`);
      throw e;
    }
  }
  return { fetchPlantList, fetchPlantDetails };
}
