"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArraysAi = void 0;
const DataInfo_1 = require("../datautils/DataInfo");
const OpenAiValidator_1 = require("../utils/OpenAiValidator");
const Constants_1 = require("../Constants");
const CodeExecutor_1 = require("./CodeExecutor");
class ArraysAi {
    constructor() {
        this._language_output = Constants_1.BuilInLanguage.JAVASCRIPT; // Default Value
        this._tokens = 250;
        this._temperature = 0;
        this._task_prompt = Constants_1.PromptType.TASK;
        this._response_instruction = Constants_1.PromptType.VERBOSE;
        this._language = Constants_1.Languages.ENGLISH;
    }
    Configure(OpenAiConfig, OutputLanguage) {
        this._configurator = new OpenAiValidator_1.OpenAiConfigurator(OpenAiConfig);
        this._openaiapi = this._configurator.GetConfiguredOpenAiApi();
        if (OutputLanguage != undefined || OutputLanguage != null)
            this._language_output = OutputLanguage;
    }
    SetLanguage(Language) {
        this._language = Language;
    }
    SetData(Data) {
        this._data = Data;
        this._columns = [];
        this._counts = [];
        for (let i = 0; i < this._data.length; i++) {
            const rowData = this._data[i];
            const dataInfo = new DataInfo_1.DataInfo();
            dataInfo.SetData(rowData);
            this._columns.push(dataInfo.GetColumnsInfo());
            this._counts.push(dataInfo.GetElementsCount());
        }
    }
    GetData() {
        if (this._data == undefined)
            throw new Error("There is not data.");
        return this._data;
    }
    GetColumns() {
        if (this._data == undefined)
            throw new Error("Please configure Data first.");
        if (this._columns == undefined)
            throw new Error("Somethings was wrong configuring the columns.");
        return this._columns;
    }
    SetTokenNumber(Tokens) {
        if (Tokens > 2048)
            throw new Error("The maximum number of tokens is 2048.");
        this._tokens = Tokens;
    }
    SetTemperature(Temperature) {
        this._temperature = Temperature;
    }
    Ask(Question, Verbose) {
        return __awaiter(this, void 0, void 0, function* () {
            if (Question == null || Question == undefined)
                throw new Error("Please provide a question...");
            const prompt_question = this.FormmatTaskQuestion(Question);
            // Send the prompt to the OpenAI API to generate the filter code
            const response = yield this.GetOpenAiResponse(prompt_question, this._temperature, this._tokens);
            const response_removed_tags = this.GetValidCode(response);
            if (response_removed_tags == null)
                throw new Error("The generated code does not contain the tags correctly.");
            let arrays = this.GetData();
            let executor = new CodeExecutor_1.CodeExecutor();
            executor.SetData(arrays);
            let result = executor.ExecuteCode(response_removed_tags);
            if (Verbose)
                return this.GetVerboseResponse(Question, JSON.stringify(result));
            return result;
        });
    }
    GetValidCode(CodeWithTags) {
        var start_index = CodeWithTags.indexOf(Constants_1.Tags.START_CODE_TAG);
        var end_index = CodeWithTags.indexOf(Constants_1.Tags.END_CODE_TAG, start_index + Constants_1.Tags.START_CODE_TAG.length);
        if (start_index !== -1 && end_index !== -1) {
            return CodeWithTags.substring(start_index + Constants_1.Tags.START_CODE_TAG.length, end_index);
        }
        else {
            return null; // Not found characters
        }
    }
    FormmatTaskQuestion(Question) {
        this._task_prompt = this._task_prompt.replace("{ARRAYS_NAME}", "arrays")
            .replace("{BUILD_LANGUAGE}", this._language_output)
            .replace("{COLUMNS}", JSON.stringify(this._columns))
            .replace("{START_CODE_TAG}", Constants_1.Tags.START_CODE_TAG)
            .replace("{END_CODE_TAG}", Constants_1.Tags.END_CODE_TAG)
            .replace("{QUESTION}", Question);
        return this._task_prompt;
    }
    GetVerboseResponse(Question, Answer) {
        return __awaiter(this, void 0, void 0, function* () {
            let formatted_prompt = this._response_instruction
                .replace("{QUESTION}", Question)
                .replace("{ANSWER}", Answer)
                .replace("{LANGUAGE}", this._language);
            // Send the prompt to the OpenAI API to generate the filter code
            const response = yield this.GetOpenAiResponse(formatted_prompt, this._temperature, 100);
            return response;
        });
    }
    GetOpenAiResponse(Prompt, Temperature, MaxTokens) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this._openaiapi.createCompletion({
                model: 'text-davinci-003',
                prompt: Prompt,
                temperature: Temperature,
                max_tokens: MaxTokens,
                n: 1,
            });
            // Get the generated text from the response
            const response_text = response.data.choices[0].text;
            // Check if the generated text is undefined and throw an error if it is
            if (response_text == undefined)
                throw new Error("There's no response for the prompt");
            // Trim the generated text and evaluate it as {BUILD_LANGUAGE} code to get the filtered array
            const trim_response = response_text.trim();
            return trim_response;
        });
    }
}
exports.ArraysAi = ArraysAi;
