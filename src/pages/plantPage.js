import { APP_CONTAINER } from "../constants.js";
import { renderPlantPage } from "../components/plantPageRenderer.js";
import { populatePlantPage } from "../containers/mainFunctions.js";

export function initPlantPage() {
  APP_CONTAINER.innerHTML = "";

  const plantElement = renderPlantPage();
  APP_CONTAINER.appendChild(plantElement);

  populatePlantPage();
}
