"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArraysAi = void 0;
var DataInfo_1 = require("./datautils/DataInfo");
var OpenAiValidator_1 = require("./Utils/OpenAiValidator");
var ArraysAi = /** @class */ (function () {
    function ArraysAi() {
        this.task_prompt = "You are provided with and array of 'n' arrays named '{ARRAYS_NAME}' where for each array\n    have the columns {COLUMNS} each row represents the columns of each array respectively by their index.\n    \n    When asked about the data, your response should include a Javascript code that describes the arrays.\n    Using the provided arrays, return the javascript code and make sure to prefix the requested javascript code \n    with {START_CODE_TAG} exactly and suffix the code with {END_CODE_TAG} exactly to get the answer to the following question: \n    {QUESTION}\n    ";
    }
    ArraysAi.prototype.Configure = function (OpenAiConfig) {
        this._configurator = new OpenAiValidator_1.OpenAiConfigurator(OpenAiConfig);
        this._openaiapi = this._configurator.GetConfiguredOpenAiApi();
    };
    ArraysAi.prototype.SetData = function (Data) {
        this._data = Data;
        for (var index = 0; index < this._data.length; index++) {
            var element = this._data[index];
            var datinfo = new DataInfo_1.DataInfo();
            datinfo.SetData(element);
            this._columns[index] = datinfo.GetColumnsInfo();
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
    return ArraysAi;
}());
exports.ArraysAi = ArraysAi;
