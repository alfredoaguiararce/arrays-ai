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
exports.ConfigureKey = exports.GetQuery = void 0;
const PropsReader_1 = require("./PropsReader");
const OpenAiValidator_1 = require("./OpenAiValidator");
const openai_1 = require("openai");
/* These lines of code are initializing two variables, `Configurator` and `openai`, which are used to
configure and access the OpenAI API. */
let Configurator;
let openai;
/**
 * The function configures an OpenAI API key.
 * @param {string} OpenAIApiKey - OpenAIApiKey is a string parameter that represents the API key for
 * the OpenAI API. This key is used to authenticate and authorize access to the OpenAI API services.
 */
function ConfigureKey(OpenAIApiKey) {
    const configuration = new openai_1.Configuration({
        apiKey: OpenAIApiKey,
    });
    Configurator = new OpenAiValidator_1.OpenAiConfigurator(configuration);
    openai = Configurator.GetConfiguredOpenAiApi();
}
exports.ConfigureKey = ConfigureKey;
/**
 * This function generates a TypeScript filter for an array of objects, based on a given prompt.
 * It first calls the `getArrayProps` function to get the properties of the objects in the array,
 * which are used in the prompt. The prompt is then sent to the OpenAI API to generate the
 * TypeScript filter code. The resulting code is returned as a string.
 * @param array - The array of objects to filter.
 * @param Prompt - The prompt for the OpenAI API to generate the filter code.
 * @returns The TypeScript filter code generated by the OpenAI API.
 */
function GetQuery(array, Prompt) {
    return __awaiter(this, void 0, void 0, function* () {
        // Check if the OpenAI API object is undefined and throw an error if it is
        if (openai == undefined)
            throw new Error('Please configure key first by calling ConfigureKey()');
        // Get the properties of the objects in the array
        const props = (0, PropsReader_1.GetArrayProps)(array);
        // Create a prompt for the OpenAI API to generate the filter code
        const PromtConcat = `Generate a TypeScript filter for an array named array of objects with the structure ${JSON.stringify(props)}, to based on the following criteria or respond to the question: ---${Prompt}---. should only return the return statetment without the return word.`;
        // Send the prompt to the OpenAI API to generate the filter code
        const response = yield openai.createCompletion({
            model: 'text-davinci-003',
            prompt: PromtConcat,
            temperature: 0,
            max_tokens: 100,
            n: 1,
        });
        // Get the generated text from the response
        const GeneratedText = response.data.choices[0].text;
        // Check if the generated text is undefined and throw an error if it is
        if (GeneratedText == undefined)
            throw new Error("There's no response for the prompt");
        // Trim the generated text and evaluate it as JavaScript code to get the filtered array
        const query = GeneratedText.trim();
        eval('array = ' + query);
        // Return the filtered array
        return array;
    });
}
exports.GetQuery = GetQuery;
