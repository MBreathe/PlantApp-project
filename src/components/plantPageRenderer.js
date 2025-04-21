export function renderPlantPage() {
  const element = document.createElement("div");
  element.className = "plant-page";
  element.innerHTML = String.raw`
    <div class="display-flex loading-plant" id="loading-and-error-screen">
        <div class="container loading-plant" id="loading-plant-page-container">
            <div class="loading-plant" id="loader-container">
                <div class="loading-plant" id="loading-plant-page-orange-ball"></div>
            </div>
            <p class="loading-plant" id="loading-plant-page-text">loading</p>
        </div>
    </div>
    <div id="top-container-plant-page">
        <img id="plant-image"/>
        <div id="side-container">
            <div id="text-container-header">
                <h1 id="common-plant-name"></h1>
                <p id="scientific-plant-name"></p>
            </div>
            <div class="tag-container" id="top-tag-container"></div>
            
        </div>
    </div>
    <p class="container tag" id="plant-description"></p>
    <div class="tag-container" id="bottom-tag-container"></div>
    <div class="container tag">
        <img id="hardiness-map" src="src/assets/plantPage/hardiness-map.png" alt="Hardiness map"/>
    </div>
    <div class="display-flex">
        <button id="return-to-search">return to search</button>
    </div>
    `;
  return element;
}
