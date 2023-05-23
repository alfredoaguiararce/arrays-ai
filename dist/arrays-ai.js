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
const DataInfo_1 = require("./datautils/DataInfo");
const OpenAiValidator_1 = require("./Utils/OpenAiValidator");
const Constants_1 = require("./Constants");
class ArraysAi {
    constructor() {
        this._language_output = Constants_1.BuilInLanguage.JAVASCRIPT; // Default Value
        this._tokens = 250;
        this._task_prompt = `You are provided with and array of 'n' arrays named '{ARRAYS_NAME}' where a element can be refered like 'row' or 'element':
    for each array have the columns {COLUMNS} each row represents the columns of each array respectively by their index
    
    When asked about the data, your response should include a {BUILD_LANGUAGE} code that describes the arrays.
    It is preferred that you use strongly typed values based on the columns and Please make sure to keep your response concise and to the point;
    If you need to perfom math operations use Math library.
    Using the provided arrays, return the {BUILD_LANGUAGE} code and make sure to prefix the requested {BUILD_LANGUAGE} code;
    with {START_CODE_TAG} exactly and suffix the code with {END_CODE_TAG} exactly to get the answer to the following question: 
    {QUESTION}
    use 'return' instead 'console.log()'
    `;
        this._response_instruction = `
    Question: {QUESTION}
    Answer: {ANSWER}

    Rewrite the answer to the question in a conversational way.
    `;
    }
    Configure(OpenAiConfig, OutputLanguage) {
        this._configurator = new OpenAiValidator_1.OpenAiConfigurator(OpenAiConfig);
        this._openaiapi = this._configurator.GetConfiguredOpenAiApi();
        if (OutputLanguage != undefined || OutputLanguage != null)
            this._language_output = OutputLanguage;
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
    SetTokenNumber(Token) {
        this._tokens = Token;
    }
    Ask(Question, Verbose) {
        return __awaiter(this, void 0, void 0, function* () {
            if (Question == null || Question == undefined)
                throw new Error("Please provide a question...");
            const PromptQuestion = this.FormmatPropmt(Question);
            // Send the prompt to the OpenAI API to generate the filter code
            const response = yield this._openaiapi.createCompletion({
                model: 'text-davinci-003',
                prompt: PromptQuestion,
                temperature: 0,
                max_tokens: this._tokens,
                n: 1,
            });
            // Get the generated text from the response
            const GeneratedText = response.data.choices[0].text;
            // Check if the generated text is undefined and throw an error if it is
            if (GeneratedText == undefined)
                throw new Error("There's no response for the prompt");
            // Trim the generated text and evaluate it as {BUILD_LANGUAGE} code to get the filtered array
            const query = GeneratedText.trim();
            const QueryWithoutBrackets = query.replace(Constants_1.Tags.START_CODE_TAG, "")
                .replace(Constants_1.Tags.END_CODE_TAG, "");
            console.log("🚀 ~ file: arrays-ai.ts:102 ~ QueryWithoutBrackets:", QueryWithoutBrackets);
            let arrays = this.GetData();
            let fn = new Function("arrays", QueryWithoutBrackets);
            let result = fn(arrays);
            if (Verbose)
                return this.GetVerboseResponse(Question, JSON.stringify(result));
            return result;
        });
    }
    FormmatPropmt(Question) {
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
            const response = yield this._openaiapi.createCompletion({
                model: 'text-davinci-003',
                prompt: this._response_instruction.replace("{QUESTION}", Question).replace("{ANSWER}", Answer),
                temperature: 0,
                max_tokens: this._tokens,
                n: 1,
            });
            // Get the generated text from the response
            const GeneratedText = response.data.choices[0].text;
            // Check if the generated text is undefined and throw an error if it is
            if (GeneratedText == undefined)
                throw new Error("There's no response for the prompt");
            // Trim the generated text and evaluate it as {BUILD_LANGUAGE} code to get the filtered array
            const verbose_answer = GeneratedText.trim();
            return verbose_answer;
        });
    }
}
exports.ArraysAi = ArraysAi;
