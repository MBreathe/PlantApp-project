import {APP_CONTAINER} from "../constants.js";


export function renderLoadingDots() {
    const loadingBackground = document.createElement("div")
    loadingBackground.id = 'loading-background';
    loadingBackground.className = 'loading';
    const loadingBox = document.createElement("div");
    loadingBox.id = 'loading-box';
    loadingBox.className = 'loading';
    loadingBackground.appendChild(loadingBox);
    APP_CONTAINER.appendChild(loadingBackground);
    for (let i = 0; i < 3; i++) {
        const loadingDot = document.createElement("div");
        loadingDot.id = `loading-dot-${i}`;
        loadingDot.className = 'loading';
        loadingBox.appendChild(loadingDot);
    }
}