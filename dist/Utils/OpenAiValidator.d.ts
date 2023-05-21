import { Configuration, OpenAIApi } from 'openai';
declare class OpenAiConfigurator implements IOpenAiConfiguration {
    private configuration;
    private _openaiApi;
    constructor(configuration: Configuration);
    GetConfiguredOpenAiApi(): OpenAIApi;
}
interface IOpenAiConfiguration {
    GetConfiguredOpenAiApi(): OpenAIApi;
}
export { OpenAiConfigurator, IOpenAiConfiguration };
