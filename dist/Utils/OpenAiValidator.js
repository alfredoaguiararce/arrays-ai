"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAiConfigurator = void 0;
const openai_1 = require("openai");
class OpenAiConfigurator {
    constructor(configuration) {
        this.configuration = configuration;
    }
    GetConfiguredOpenAiApi() {
        if (!this._openaiApi) {
            this._openaiApi = new openai_1.OpenAIApi(this.configuration);
        }
        return this._openaiApi;
    }
}
exports.OpenAiConfigurator = OpenAiConfigurator;
