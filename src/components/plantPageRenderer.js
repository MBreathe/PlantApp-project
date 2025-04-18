
export function renderPlantPage() {
    const element = document.createElement('div');
    element.className = 'plant-page';
    element.innerHTML = String.raw `
    <div class="display-flex" id="loading-and-error-screen"></div>
    <div id="top-container-plant-page">
        <img id="plant-image"/>
        <div>
            <div id="text-container-header">
                <h1 id="common-plant-name"></h1>
                <p id="scientific-plant-name"></p>
            </div>
            <div class="tag-container" id="top-tag-container"></div>
        </div>
    </div>
    <p class="container" id="plant-description"></p>
    <div class="tag-container" id="bottom-tag-container"></div>
    <div class="container">
        <img src="../../src/assets/plantPage/hardiness-map.png" alt="Hardiness map"/>
    </div>
    `;
    return element;
}