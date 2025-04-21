import { APP_CONTAINER, STATUS } from "../constants.js";
import { renderLanding } from "../components/landingRenderer.js";
import {
  aboutPage,
  animateLoadingBall,
  feelingLucky,
  landingPageRenderError,
  mainLoadingAnimation,
  renderSuggestions,
} from "../containers/mainFunctions.js";
import { initPlantPage } from "./plantPage.js";
import { renderLoadingScreen } from "../components/loadingRenderer.js";
import { storage } from "../containers/localStorage.js";
import { fetchers } from "../api/fetchers.js";

const { fetchPlantList } = fetchers();
const { saveToLocalStorage } = storage();

export function initLandingPage() {
  APP_CONTAINER.innerHTML = "";

  // rendering animation
  const mainLoadingEl = renderLoadingScreen();
  APP_CONTAINER.appendChild(mainLoadingEl);
  mainLoadingAnimation();

  // rendering landing page and content
  const landingElement = renderLanding();
  APP_CONTAINER.appendChild(landingElement);

  let timeout;
  const searchBarElement = document.querySelector("#search-a-plant");
  const searchSuggestions = document.querySelector(
    "#search-suggestions-container",
  );

  searchBarElement.addEventListener("keyup", (e) => {
    clearTimeout(timeout);
    searchSuggestions.style.display = "block";

    // debouncing search suggestions (just like Stas showed)
    if (searchBarElement.value.length > 1 && e.key !== "Enter") {
      timeout = setTimeout(() => {
        const errorIndicator = document.querySelector("#error-handler");
        errorIndicator.style.display = "none";
        animateLoadingBall();
        setTimeout(async () => {
          await renderSuggestions(searchBarElement.value);
          animateLoadingBall();
        }, 1000);
      }, 400);
    }

    // on "Enter" key press logic
    if (e.key === "Enter" && searchBarElement.value.length > 1) {
      animateLoadingBall();
      setTimeout(async () => {
        try {
          animateLoadingBall();

          const plantData = await fetchPlantList(searchBarElement.value);

          STATUS.plantName = plantData[0].common_name;
          STATUS.plantId = plantData[0].id;
          saveToLocalStorage();

          initPlantPage();
        } catch (e) {
          console.error(e);
          landingPageRenderError(e);
        }
      }, 2000);
    }
  });

  // hide suggestion block if it's empty
  searchBarElement.addEventListener("change", (e) => {
    if (
      e.target.value.length === 0 ||
      searchSuggestions.children.length === 0
    ) {
      searchSuggestions.style.display = "none";
    }
  });

  // add clicked on suggestion into search bar
  if (searchSuggestions) {
    searchSuggestions.addEventListener("click", (e) => {
      if (e.target.tagName === "LI") {
        searchBarElement.value = e.target.textContent;
        STATUS.plantId = e.target.id;
        searchSuggestions.style.display = "none";
      }
    });
  }

  // feeling lucky button
  const feelingLuckyBtn = document.querySelector("#feeling-lucky-btn");
  feelingLuckyBtn.addEventListener("click", () => feelingLucky());

  // about button
  const aboutBtn = document.querySelector("#about-btn");
  aboutBtn.addEventListener("click", () => aboutPage());
}
