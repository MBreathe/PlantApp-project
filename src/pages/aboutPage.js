import { APP_CONTAINER, STATUS } from "../constants.js";
import { renderAboutPage } from "../components/aboutPageRenderer.js";
import { initLandingPage } from "./landingPage.js";
import { storage } from "../containers/localStorage.js";

export function initAboutPage() {
  APP_CONTAINER.innerHTML = "";

  const plantElement = renderAboutPage();
  APP_CONTAINER.appendChild(plantElement);

  const gitHubBtn = document.querySelector("#github-btn");
  gitHubBtn.addEventListener("click", () =>
    window.open("https://github.com/MBreathe", "_blank"),
  );
  const instagramBtn = document.querySelector("#instagram-btn");
  instagramBtn.addEventListener("click", () =>
    window.open("https://instagram.com/makebreathe", "_blank"),
  );
  const hyfBtn = document.querySelector("#hyf-btn");
  hyfBtn.addEventListener("click", () =>
    window.open("https://www.hackyourfuture.net/", "_blank"),
  );
  const apiBtn = document.querySelector("#api-btn");
  apiBtn.addEventListener("click", () =>
    window.open("https://perenual.com/", "_blank"),
  );

  const { saveToLocalStorage } = storage();
  const returnBtnEl = document.querySelector("#return-to-search");
  returnBtnEl.addEventListener(
    "click",
    () => {
      STATUS.aboutPage = false;
      saveToLocalStorage();
      initLandingPage();
    },
    { once: true },
  );
}
