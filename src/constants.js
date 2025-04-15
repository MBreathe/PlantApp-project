export const APP_CONTAINER = document.querySelector('#app');

export class KeyChain {
    constructor(apiName, apiKey) {
        this._apiName = apiName;
        this._apiKey = apiKey;
    }

    get apiName() {
        return this._apiName;
    }
    get apiKey() {
        return this._apiKey;
    }
}

export const PERENUAL_KEY_CHAIN = new KeyChain('perenual', 'sk-D2uq67f3bd2d72baf9656');