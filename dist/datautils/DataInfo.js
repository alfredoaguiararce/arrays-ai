"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataInfo = void 0;
var DataInfo = /** @class */ (function () {
    function DataInfo() {
    }
    DataInfo.prototype.SetData = function (data) {
        this._data = data;
    };
    DataInfo.prototype.GetColumnsInfo = function () {
        if (this._data == undefined)
            throw new Error("There's not data.");
        // Create an empty object to hold the Columns
        var Columns = {};
        // Loop over each object in the array
        for (var _i = 0, _a = this._data; _i < _a.length; _i++) {
            var row = _a[_i];
            // Loop over each property in the object
            for (var prop in row) {
                // Add the property name and its data type to the columns object
                Columns[prop] = typeof row[prop];
            }
        }
        // Return the Props object
        return Columns;
    };
    return DataInfo;
}());
exports.DataInfo = DataInfo;
