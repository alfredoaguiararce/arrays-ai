"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetArrayProps = void 0;
// Define the function GetArrayProps, which takes an array of objects with unknown properties
// and returns an object with the properties and their data types
function GetArrayProps(objects) {
    // Create an empty object to hold the Props
    const props = {};
    // Loop over each object in the array
    for (let object of objects) {
        // Loop over each property in the object
        for (let prop in object) {
            // Add the property name and its data type to the Props object
            props[prop] = typeof object[prop];
        }
    }
    // Return the Props object
    return props;
}
exports.GetArrayProps = GetArrayProps;
