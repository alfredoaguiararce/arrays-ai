"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataInfo = void 0;
class DataInfo {
    SetData(data) {
        this._data = data;
    }
    GetColumnsInfo() {
        if (this._data == undefined)
            throw new Error("There's not data.");
        // Create an empty object to hold the Columns
        const Columns = {};
        // Loop over each object in the array
        for (let row of this._data) {
            // Loop over each property in the object
            for (let prop in row) {
                // Add the property name and its data type to the columns object
                Columns[prop] = typeof row[prop];
            }
        }
        // Return the Props object
        return Columns;
    }
    GetElementsCount() {
        if (this._data == undefined)
            throw new Error("There's not data.");
        return this._data.length;
    }
}
exports.DataInfo = DataInfo;
