
export function renderLanding() {
    const element = document.createElement('div');
    element.className = 'landing-page';
    element.innerHTML = String.raw `
    <input id="search-a-plant" type="search" placeholder="search a plant">
    <div id="search-suggestions-container">
        <ul id="search-suggestions"></ul>    
    </div>
    <button id="feeling-lucky-btn">feeling lucky?</button>
    `;
    return element;
}