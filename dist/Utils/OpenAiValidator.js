"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAiConfigurator = void 0;
var openai_1 = require("openai");
var OpenAiConfigurator = /** @class */ (function () {
    function OpenAiConfigurator(configuration) {
        this.configuration = configuration;
    }
    OpenAiConfigurator.prototype.GetConfiguredOpenAiApi = function () {
        if (!this._openaiApi) {
            this._openaiApi = new openai_1.OpenAIApi(this.configuration);
        }
        return this._openaiApi;
    };
    return OpenAiConfigurator;
}());
exports.OpenAiConfigurator = OpenAiConfigurator;
