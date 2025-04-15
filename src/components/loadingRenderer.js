
export function renderLoadingScreen() {
    const element = document.createElement('div');
    element.className = 'loading';
    element.innerHTML = String.raw `
    <span>loading</span><span>resources</span>
    <div id="loading-bar-container">
        <div id="loading-bar">
        <p></p>
        </div>
    </div>
    <p>design and code by<br>makebreathe</p>
    `;
    return element;
}