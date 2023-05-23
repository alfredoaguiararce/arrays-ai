import { Configuration, OpenAIApi } from 'openai';

class OpenAiConfigurator implements IOpenAiConfiguration {
  private _openaiApi: OpenAIApi | undefined;

  constructor(private configuration: Configuration) {}

  GetConfiguredOpenAiApi(): OpenAIApi {
    if (!this._openaiApi) {
      this._openaiApi = new OpenAIApi(this.configuration);
    }
    return this._openaiApi;
  }
}

interface IOpenAiConfiguration {
  GetConfiguredOpenAiApi(): OpenAIApi;
}

export { OpenAiConfigurator, IOpenAiConfiguration };
