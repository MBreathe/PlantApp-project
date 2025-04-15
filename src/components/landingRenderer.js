
export function renderLanding() {
    const element = document.createElement('div');
    element.className = 'landing';
    element.innerHTML = String.raw `
    <div class="landing">
        <input id="search-a-plant" type="search" placeholder="search a plant">
        <div id="search-suggestions"></div>
        <button id="feeling-lucky-btn">feeling lucky?</button>
    </div>`;
    return element;
}