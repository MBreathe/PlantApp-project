import {APP_CONTAINER} from "../constants.js";
import {renderLanding} from "../components/landingRenderer.js";

export function initLandingPage() {
    APP_CONTAINER.innerHTML = '';

    const landingElement = renderLanding();
    APP_CONTAINER.appendChild(landingElement);
}