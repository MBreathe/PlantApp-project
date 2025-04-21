export const APP_CONTAINER = document.querySelector("#app");
export const STATUS = {
  loading: false,
  plantId: null,
  plantName: null,
  mainAnimation: true, // true = show/false = don't
  aboutPage: false,
};

export class KeyChain {
  constructor(apiName, apiKey, options = {}) {
    this._apiName = apiName;
    this._apiKey = apiKey;
    this._options = options;
  }

  get apiName() {
    return this._apiName;
  }
  get apiKey() {
    return this._apiKey;
  }
  get options() {
    return this._options;
  }
}

export const PERENUAL_KEY_CHAIN = new KeyChain(
  "perenual",
  "sk-D2uq67f3bd2d72baf9656",
  { search: "&q=", page: "&page=" },
);
