
export function renderPlantPage(plantName) {
    const element = document.createElement('div');
    element.className = 'plant-page';
    element.innerHTML = String.raw `
    <h1>${plantName}</h1>
    `;
    return element;
}