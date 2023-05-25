"use strict";
// Constants used in the library
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromptType = exports.Languages = exports.BuilInLanguage = exports.ListedLibraries = exports.Tags = void 0;
var Tags;
(function (Tags) {
    Tags["START_CODE_TAG"] = "<startCode>";
    Tags["END_CODE_TAG"] = "<endCode>";
})(Tags || (Tags = {}));
exports.Tags = Tags;
var ListedLibraries;
(function (ListedLibraries) {
    ListedLibraries["MATH"] = "math.js";
    // ...
})(ListedLibraries || (ListedLibraries = {}));
exports.ListedLibraries = ListedLibraries;
var BuilInLanguage;
(function (BuilInLanguage) {
    BuilInLanguage["JAVASCRIPT"] = "JavaScript";
    // ,TYPESCRIPT = "TypeScript"
})(BuilInLanguage || (BuilInLanguage = {}));
exports.BuilInLanguage = BuilInLanguage;
var Languages;
(function (Languages) {
    Languages["ENGLISH"] = "English";
    Languages["SPANISH"] = "Spanish";
})(Languages || (Languages = {}));
exports.Languages = Languages;
var PromptType;
(function (PromptType) {
    PromptType["TASK"] = "You are provided with and array of 'n' arrays named '{ARRAYS_NAME}' where a element can be refered like 'row' or 'element':\n    for each array have the columns {COLUMNS} each row represents the columns of each array respectively by their index\n    \n    When asked about the data, your response should include a {BUILD_LANGUAGE} code that describes the arrays ignoring previous questions.\n    You should avoid creating arrays within the code with the name '{ARRAYS_NAME}'.\n    It is preferred that you use strongly typed values based on the columns and Please make sure to keep your response concise and to the point;\n    If you need to perfom math operations use Math library.\n    Using the provided arrays, return the {BUILD_LANGUAGE} code and make sure to prefix the requested {BUILD_LANGUAGE} code;\n    with {START_CODE_TAG} exactly and suffix the code with {END_CODE_TAG} exactly to get the answer to the following question: \n    {QUESTION}\n    use 'return' instead 'console.log()'\n    ";
    PromptType["VERBOSE"] = "\n    Question: {QUESTION}\n    Answer: {ANSWER}\n\n    Rewrite the answer to the question in a conversational way, ignoring previous questions, use the {LANGUAGE} to describe the answer. \n    Don't translate the '{ANSWER}'.\n    Don't refer to '{ANSWER}' as 'the answer' or 'the solution'.\n    ";
})(PromptType || (PromptType = {}));
exports.PromptType = PromptType;
