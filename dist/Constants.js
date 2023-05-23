"use strict";
// Constants used in the library
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuilInLanguage = exports.ListedLibraries = exports.Tags = void 0;
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
