import { fetchers } from "../api/fetchers.js";
import { STATUS } from "../constants.js";
import { initLandingPage } from "../pages/landingPage.js";
import { storage } from "./localStorage.js";
import { initPlantPage } from "../pages/plantPage.js";

const { saveToLocalStorage, loadLocalStorage } = storage();
const { fetchPlantList, fetchPlantDetails } = fetchers();

//main loader
export function initApp() {
  if (localStorage.length > 0) {
    loadLocalStorage();
    if (STATUS.plantId) {
      initPlantPage();
    } else {
      initLandingPage();
    }
  } else {
    initLandingPage();
  }
}

//loading screen
export function mainLoadingAnimation() {
  loadLocalStorage();
  if (!STATUS.mainAnimation) {
    const loadingPageEl = document.querySelector(".loading-page");
    loadingPageEl.style.display = "none";
    return;
  }

  const loadingBar = document.querySelector("#loading-bar");
  const loadingNum = document.querySelector("#percentage");

  let percentage = 0;
  let width = 0;

  const intervalId = setInterval(() => {
    width += Math.floor(Math.random() * 4);
    percentage = (width / 60) * 100;
    loadingBar.style.width = `${width}vw`;
    loadingNum.innerHTML = `${percentage.toFixed(0)}%`;

    if (percentage >= 100) {
      clearInterval(intervalId);
      loadingBar.style.width = `60vw`;
      loadingBar.style.borderRadius = "0.3rem";
      loadingNum.innerHTML = `100%`;
      setTimeout(() => {
        const loadingPageEl = document.querySelector(".loading-page");
        const orangeBall = document.querySelector(
          "#loading-search-orange-ball",
        );
        orangeBall.style.display = "block";
        loadingPageEl.style.display = "none";
        STATUS.mainAnimation = false;
        saveToLocalStorage();
      }, 500);
    }
  }, 100);
}

//landing page
export function landingPageRenderError(error) {
  const errorHandlerEl = document.querySelector("#error-handler");
  errorHandlerEl.innerHTML = error;
  errorHandlerEl.style.display = "block";
}

export async function renderSuggestions(plantName) {
  const suggestionList = document.querySelector("#search-suggestions");
  try {
    const data = await fetchPlantList(plantName);
    const plantData = [...new Set(data)]; // only works for primitive values (doesn't work well with objects)
    if (plantData.length === 0) {
      landingPageRenderError("Could not find any plants, please try again.");
      return;
    }
    if (plantData.length > 5) {
      plantData.length = 5;
    }
    suggestionList.innerHTML = "";
    plantData.forEach((plant) => {
      const suggestionEl = document.createElement("li");
      suggestionEl.className = "suggestion";
      suggestionEl.id = plant.id;
      const displayName = plant.common_name;
      suggestionEl.innerHTML = displayName.toLowerCase();
      suggestionList.appendChild(suggestionEl);
    });
    suggestionList.style.border = "0.1rem solid #2F2C27";
  } catch (e) {
    landingPageRenderError(e);
    console.error(e);
  }
}

export function animateLoadingBall() {
  const orangeBall = document.querySelector("#loading-search-orange-ball");
  if (!STATUS.loading) {
    STATUS.loading = true;
    orangeBall.style.animation = "LoadingBall 1s linear infinite";
    return;
  }
  if (STATUS.loading) {
    STATUS.loading = false;
    orangeBall.style.animation = "none";
  }
}

export function feelingLucky() {
  STATUS.plantId = Math.floor(Math.random() * 9999 + 1);
  saveToLocalStorage();
  initPlantPage();
}

//about page


//plant page
export function renderDescriptionAndTags(plantInfo) {
  const topTagContainerEl = document.querySelector("#top-tag-container");
  if (topTagContainerEl) topTagContainerEl.innerHTML = "";

  let cycle = !plantInfo.cycle ? "" : plantInfo.cycle.toLowerCase();
  let indoor = !plantInfo.indoor ? "outdoor" : "indoor";
  let rare = !plantInfo.rare ? "" : "rare";
  let invasive = !plantInfo.invasive ? "" : "invasive";
  let poisonousToPets = !plantInfo.poisonous_to_pets
    ? "safe for pets"
    : "poisonous to pets";
  let growthRate = `${!plantInfo.growth_rate ? "" : plantInfo.growth_rate.toLowerCase()} growth rate`;
  let maintenance = `${!plantInfo.maintenance ? "" : plantInfo.maintenance.toLowerCase()} maintenance`;
  let watering = `${!plantInfo.watering ? "" : plantInfo.watering.toLowerCase()} watering`;
  let sunlight = !plantInfo.sunlight ? "" : plantInfo.sunlight[0].toLowerCase();

  const topTagsArr = [
    { name: "cycle", textContent: cycle },
    { name: "indoor", textContent: indoor },
    { name: "rare", className: "tag-good", textContent: rare },
    { name: "invasive", className: "tag-bad", textContent: invasive },
    {
      name: "poisonousToPets",
      className:
        poisonousToPets === "poisonous to pets" ? "tag-bad" : "tag-good",
      textContent: poisonousToPets,
    },
    { name: "growthRate", textContent: growthRate },
    {
      name: "maintenance",
      textContent: maintenance,
    },
    { name: "watering", textContent: watering },
    { name: "sunlight", textContent: sunlight },
  ];
  topTagsArr.forEach((tag) => {
    if (tag.textContent.length > 1) {
      const tagEl = document.createElement("p");
      tagEl.textContent = tag.textContent;
      tagEl.className = "container tag tag-hover";
      if (tag.className) tagEl.classList.add(tag.className);
      topTagContainerEl.appendChild(tagEl);
    }
  });

  const descriptionEl = document.querySelector("#plant-description");
  descriptionEl.textContent = plantInfo.description
    ? plantInfo.description
    : (descriptionEl.style.display = "none");

  const bottomTagContainerEl = document.querySelector("#bottom-tag-container");
  if (bottomTagContainerEl) bottomTagContainerEl.innerHTML = "";

  let pruning;
  let flowering;
  let propagation;
  let attracts;
  let hardiness;

  if (plantInfo.pruning_month) {
    pruning = `pruning month(s): ${plantInfo.pruning_month.length > 1 ? plantInfo.pruning_month.join(", ") : plantInfo.pruning_month[0]}`;
  } else {
    pruning = "";
  }

  flowering = `flowering season: ${!plantInfo.flowering_season ? "not applicable" : plantInfo.flowering_season}`;

  if (plantInfo.propagation) {
    propagation = `propagation: ${plantInfo.propagation.length > 1 ? plantInfo.propagation.join(", ") : "not applicable"}`;
  }

  if (plantInfo.attracts.length > 0) {
    attracts = `attracts: ${plantInfo.attracts.length > 1 ? plantInfo.attracts.join(", ") : plantInfo.attracts[0]}`;
  } else {
    attracts = "";
  }

  if (plantInfo.hardiness) {
    hardiness = `hardiness: ${plantInfo.hardiness.min}-${plantInfo.hardiness.max}`;
  }

  const bottomTagsArr = [
    [
      { name: "pruning", textContent: pruning },
      { name: "flowering", textContent: flowering },
      { name: "propagation", textContent: propagation },
    ],
    [
      { name: "attracts", textContent: attracts },
      { name: "hardiness", textContent: hardiness },
    ],
  ];
  bottomTagsArr.forEach((tagArr) => {
    const tagEl = document.createElement("div");
    tagEl.className = "container tag";
    tagArr.forEach((tag) => {
      const tagTextEl = document.createElement("p");
      tagTextEl.textContent = tag.textContent;
      tagEl.appendChild(tagTextEl);
    });
    bottomTagContainerEl.appendChild(tagEl);
  });
}

export function plantPageRenderError(error) {
  const errorContainerEl = document.querySelector(
    "#loading-plant-page-container",
  );
  document.querySelector("#loader-container").style.display = "none";
  document.querySelector("#loading-plant-page-orange-ball").style.display =
    "none";
  errorContainerEl.classList.add("error-container");
  document.querySelector("#loading-plant-page-text").innerHTML = error;
  const btn = document.createElement("button");
  btn.style.marginTop = "1rem";
  btn.innerText = "return to search";
  btn.addEventListener(
    "click",
    () => {
      STATUS.plantName = null;
      STATUS.plantId = null;
      saveToLocalStorage();
      initLandingPage();
    },
    { once: true },
  );
  errorContainerEl.appendChild(btn);
}

export function hideLoadingScreen() {
  const loadingEls = document.querySelectorAll(".loading-plant");
  loadingEls.forEach((loadingEl) => (loadingEl.style.display = "none"));
}

export async function populatePlantPage() {
  try {
    const plantInfo = await fetchPlantDetails(STATUS.plantId);

    const plantName = plantInfo.common_name;
    const commonNameEl = document.querySelector("#common-plant-name");
    commonNameEl.textContent = plantName.toUpperCase();

    const scientificNameEl = document.querySelector("#scientific-plant-name");
    scientificNameEl.textContent = `(${plantInfo.scientific_name[0].toLowerCase()})`;

    const plantImg = document.querySelector("#plant-image");
    plantInfo.default_image?.original_url ? plantImg.src = plantInfo.default_image.original_url : plantImg.src = 'src/assets/plantPage/placeholder-plant.png';
    plantImg.alt = `Image of a ${plantName}`;

    renderDescriptionAndTags(plantInfo);

    const returnBtnEl = document.querySelector("#return-to-search");
    returnBtnEl.addEventListener(
      "click",
      () => {
        STATUS.plantId = null;
        saveToLocalStorage();
        initLandingPage();
      },
      { once: true },
    );
    if (document.querySelector(".loading-plant")) {
      setTimeout(() => hideLoadingScreen(), 1000);
    }
  } catch (e) {
    plantPageRenderError(e);
    console.error(e);
  }
}
