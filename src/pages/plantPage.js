import {APP_CONTAINER} from "../constants.js";
import {renderPlantPage} from "../components/plantPageRenderer.js";
import {fetchers} from "../api/fetchers.js";

export async function initPlantPage(plantName) {
    APP_CONTAINER.innerHTML = '';

    const plantElement = renderPlantPage();
    APP_CONTAINER.appendChild(plantElement);

    const { fetchPlantDetails, fetchPlantList } = fetchers();

    async function populatePlantPage() {
        try {
            const plantData = await fetchPlantList(plantName);
            const plantId = plantData[0].id;
            const plantImg = document.querySelector("#plant-image");
            plantImg.src = plantData[0].default_image.medium_url;
            plantImg.alt = `Image of a ${plantName}`;

            const commonNameEl = document.querySelector("#common-plant-name");
            commonNameEl.textContent = plantName.toUpperCase();

            const scientificNameEl = document.querySelector("#scientific-plant-name");
            scientificNameEl.textContent = plantData[0].scientific_name[0].toLowerCase();

            const topTagContainerEl = document.querySelector("#top-tag-container");
            const plantInfo = await fetchPlantDetails(plantId);

            const topTagsArr = [
                { name: 'cycle', className: 'container tag', textContent: plantInfo.cycle.toLowerCase() },
                { name: 'indoor', className: 'container tag', textContent: !plantInfo.indoor ? 'outdoor' : 'indoor' },
                { name: 'rare', className: 'container tag', textContent: !plantInfo.rare ? '' : 'rare' },
                { name: 'invasive', className: 'container tag', textContent: !plantInfo.invasive ? '' : 'invasive' },
                { name: 'poisonousToPets', className: 'container tag', textContent: !plantInfo.poisonous_to_pets ? 'safe for pets' : 'poisonous to pets' },
                { name: 'growthRate', className: 'container tag', textContent: `${plantInfo.growth_rate.toLowerCase()} growth rate` },
                { name: 'maintenance', className: 'container tag', textContent: `${plantInfo.maintenance.toLowerCase()} maintenance` },
                { name: 'watering', className: 'container tag', textContent: `${plantInfo.watering.toLowerCase()} watering` },
                { name: 'sunlight', className: 'container tag', textContent: plantInfo.sunlight[0].toLowerCase() }];
            topTagsArr.forEach(tag => {
                if (tag.textContent.length > 1) {
                    const tagEl = document.createElement("p");
                    for (const key in tag) {
                        tagEl[key] = tag[key];
                    }
                    topTagContainerEl.appendChild(tagEl);
                }
            });

            const descriptionEl = document.querySelector('#plant-description');
            descriptionEl.textContent = plantInfo.description;

            const bottomTagContainerEl = document.querySelector('#bottom-tag-container');
            const bottomTagsArr = [
                [
                    { name: 'pruning', className: 'tag', textContent: `pruning month(s): ${plantInfo.pruning_month.length > 1 ? plantInfo.pruning_month.join(', ') : plantInfo.pruning_month[0]}` },
                    { name: 'flowering', className: 'tag', textContent: `flowering season: ${plantInfo.flowering_season}` },
                    { name: 'propagation', className: 'tag', textContent: `propagation: ${plantInfo.propagation.length > 1 ? plantInfo.propagation.join(', ') : plantInfo.propagation[0]}` }
                ],
                [
                    { name: 'attracts', className: 'tag', textContent: `attracts: ${plantInfo.attracts.length > 1 ? plantInfo.attracts.join(', ') : plantInfo.attracts[0]}` },
                    { name: 'hardiness', className: 'tag', textContent: `hardiness: ${plantInfo.hardiness.min}-${plantInfo.hardiness.max}` },
                ]
            ]
            bottomTagsArr.forEach(tagArr => {
                const tagEl = document.createElement("div");
                tagEl.className = 'container';
                tagArr.forEach(tag => {
                    const tagTextEl = document.createElement("p");
                    for (const key in tag) {
                        tagTextEl[key] = tag[key];
                    }
                    tagEl.appendChild(tagTextEl);
                })
                bottomTagContainerEl.appendChild(tagEl);
            })
        } catch (e) {
            console.error(e);
        }
    }
    await populatePlantPage();
}