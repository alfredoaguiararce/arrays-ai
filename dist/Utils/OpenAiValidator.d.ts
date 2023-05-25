import { Configuration, OpenAIApi } from 'openai';
declare class OpenAiConfigurator {
    private configuration;
    private _openaiApi;
    constructor(configuration: Configuration);
    GetConfiguredOpenAiApi(): OpenAIApi;
}
export { OpenAiConfigurator };
