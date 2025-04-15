
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