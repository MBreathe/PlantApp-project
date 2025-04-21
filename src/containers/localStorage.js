import { STATUS } from "../constants.js";

export function storage() {
  function saveToLocalStorage() {
    localStorage.setItem("status", JSON.stringify(STATUS));
  }
  function loadLocalStorage() {
    if (localStorage.length === 0) return;
    const storedStatus = JSON.parse(localStorage.getItem("status"));
    if (storedStatus) {
      STATUS.plantName = storedStatus.plantName;
      STATUS.plantId = storedStatus.plantId;
      STATUS.mainAnimation = storedStatus.mainAnimation;
      STATUS.aboutPage = storedStatus.aboutPage;
    }
  }
  function clearLocalStorage() {
    localStorage.clear();
  }
  return { saveToLocalStorage, loadLocalStorage, clearLocalStorage };
}
