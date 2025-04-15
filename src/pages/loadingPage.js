import {APP_CONTAINER} from "../constants";
import {renderLoadingScreen} from "../components/loadingRenderer";

export function initLoadingPage() {
    APP_CONTAINER.innerHTML = '';

    const loadingElement = renderLoadingScreen();
    APP_CONTAINER.appendChild(renderLoadingScreen());
}