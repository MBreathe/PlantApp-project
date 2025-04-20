export function renderLoadingScreen() {
  const element = document.createElement("div");
  element.className = "loading-page display-flex";
  element.innerHTML = String.raw`
    <div id="loading-container">
        <div id="loading-text-container">
            <p>loading</p>
            <div>
              <span class="rotating-loading">*</span>
              <span class="rotating-loading">manuals</span>
              <span class="rotating-loading">resources</span>
              <span class="rotating-loading">API</span>
              <span class="rotating-loading">pages</span>
              <span class="rotating-loading">plants</span>
            </div>
        </div>
        <div class="container" id="loading-bar-container">
            <div id="loading-bar">
                <span id="percentage">0%</span>
            </div>
        </div>
    </div>
    <footer>
        <p>design and code by<br>makebreathe</p>
    </footer>
    `;
  return element;
}
