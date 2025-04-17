
export function renderLoadingScreen() {
    const element = document.createElement('div');
    element.className = 'loading-page display-flex';
    element.innerHTML = String.raw `
    <div id="loading-container">
        <div id="loading-text-container">
            <span>loading</span><span id="resources">resources</span><span id="api">API</span><span id="pages">pages</span><span id="plants">plants</span>
        </div>
        <div class="container" id="loading-bar-container">
            <div id="loading-bar">
                <span id="percentage">0%</span>
            </div>
        </div>
    </div>
    <footer>
        <p>design and code by<br>makebreathe</p>
    </footer>
    `;
    return element;
}