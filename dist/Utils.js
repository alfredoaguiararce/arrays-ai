"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetArrayProps = void 0;
// Define the function GetArrayProps, which takes an array of objects with unknown properties
// and returns an object with the properties and their data types
function GetArrayProps(objects) {
    // Create an empty object to hold the Props
    var props = {};
    // Loop over each object in the array
    for (var _i = 0, objects_1 = objects; _i < objects_1.length; _i++) {
        var object = objects_1[_i];
        // Loop over each property in the object
        for (var prop in object) {
            // Add the property name and its data type to the Props object
            props[prop] = typeof object[prop];
        }
    }
    // Return the Props object
    return props;
}
exports.GetArrayProps = GetArrayProps;
