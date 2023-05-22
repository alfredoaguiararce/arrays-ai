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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArraysAi = void 0;
var DataInfo_1 = require("./datautils/DataInfo");
var OpenAiValidator_1 = require("./Utils/OpenAiValidator");
var Constants_1 = require("./Constants");
var ArraysAi = /** @class */ (function () {
    function ArraysAi() {
        this._language_output = Constants_1.BuilInLanguage.JAVASCRIPT; // Default Value
        this._arrays_name = "collections";
        // If the question does not specify a particular array indexes, you need to concatenate or merge all the arrays into a single array before performing any operations or calculations;
        this._task_prompt = "You are provided with and array of 'n' arrays named '{ARRAYS_NAME}' where a element can be refered like 'row' or 'element':\n    for each array have the columns {COLUMNS} each row represents the columns of each array respectively by their index\n    \n    When asked about the data, your response should include a {BUILD_LANGUAGE} code that describes the arrays.\n    It is preferred that you use strongly typed values based on the columns and Please make sure to keep your response concise and to the point;\n    If you need to perfom math operations use Math library.\n    Using the provided arrays, return the {BUILD_LANGUAGE} code and make sure to prefix the requested {BUILD_LANGUAGE} code;\n    with {START_CODE_TAG} exactly and suffix the code with {END_CODE_TAG} exactly to get the answer to the following question: \n    {QUESTION}\n    use 'return' instead 'console.log()'\n    ";
    }
    ArraysAi.prototype.Ask = function (Question, Completion) {
        return __awaiter(this, void 0, void 0, function () {
            var PromptQuestion, response, GeneratedText, query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (Question == null || Question == undefined)
                            throw new Error("Please provide a question...");
                        PromptQuestion = this.FormmatPropmt(Question);
                        if (!(Completion != undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._openaiapi.createCompletion(Completion)];
                    case 1:
                        response = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this._openaiapi.createCompletion({
                            model: 'text-davinci-003',
                            prompt: PromptQuestion,
                            temperature: 0,
                            max_tokens: 250,
                            n: 1,
                        })];
                    case 3:
                        response = _a.sent();
                        _a.label = 4;
                    case 4:
                        GeneratedText = response.data.choices[0].text;
                        // Check if the generated text is undefined and throw an error if it is
                        if (GeneratedText == undefined)
                            throw new Error("There's no response for the prompt");
                        query = GeneratedText.trim();
                        return [2 /*return*/, query];
                }
            });
        });
    };
    ArraysAi.prototype.Configure = function (OpenAiConfig, OutputLanguage) {
        this._configurator = new OpenAiValidator_1.OpenAiConfigurator(OpenAiConfig);
        this._openaiapi = this._configurator.GetConfiguredOpenAiApi();
        if (OutputLanguage != undefined || OutputLanguage != null)
            this._language_output = OutputLanguage;
    };
    ArraysAi.prototype.SetArraysName = function (Name) {
        this._arrays_name = Name;
    };
    ArraysAi.prototype.SetData = function (Data) {
        this._data = Data;
        this._columns = [];
        this._counts = [];
        for (var i = 0; i < this._data.length; i++) {
            var rowData = this._data[i];
            var dataInfo = new DataInfo_1.DataInfo();
            dataInfo.SetData(rowData);
            this._columns.push(dataInfo.GetColumnsInfo());
            this._counts.push(dataInfo.GetElementsCount());
        }
    };
    ArraysAi.prototype.GetData = function () {
        if (this._data == undefined)
            throw new Error("There is not data.");
        return this._data;
    };
    ArraysAi.prototype.GetColumns = function () {
        if (this._data == undefined)
            throw new Error("Please configure Data first.");
        if (this._columns == undefined)
            throw new Error("Somethings was wrong configuring the columns.");
        return this._columns;
    };
    ArraysAi.prototype.FormmatPropmt = function (Question) {
        this._task_prompt = this._task_prompt
            .replace("{ARRAYS_NAME}", this._arrays_name)
            .replace("{BUILD_LANGUAGE}", this._language_output)
            .replace("{COLUMNS}", JSON.stringify(this._columns))
            .replace("{START_CODE_TAG}", Constants_1.Tags.START_CODE_TAG)
            .replace("{END_CODE_TAG}", Constants_1.Tags.END_CODE_TAG)
            .replace("{QUESTION}", Question);
        return this._task_prompt;
    };
    return ArraysAi;
}());
exports.ArraysAi = ArraysAi;
