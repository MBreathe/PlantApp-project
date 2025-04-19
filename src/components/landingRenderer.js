
export function renderLanding() {
    const element = document.createElement('div');
    element.className = 'landing-page display-flex';
    element.innerHTML = String.raw `
    <div class="search-bar-container">
        <input class="container" id="search-a-plant" type="text" placeholder="search a plant">
    <div class="container" id="loading-bar-search">
        <div id="loading-search-orange-ball"></div>
    </div>
    </div>
    <p id="error-handler"></p>
    <div id="search-suggestions-container">
        <ul id="search-suggestions"></ul>    
    </div>
    <button id="feeling-lucky-btn">feeling lucky?</button>
    `;
    return element;
}