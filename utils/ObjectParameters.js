/**
 * The function returns an object containing the properties and their data types of all objects in an
 * array.
 * @param Objects - The input parameter "array" is an array of objects.
 * @returns The function `GetArrayProps` is returning an object that contains the properties of the
 * objects in the input array and their data types.
 */

function GetArrayProps(Objects) {
  const Props = {};
  for (let object of Objects) {
    for (let prop in object) {
      Props[prop] = typeof object[prop];
    }
  }
  return Props;
}


module.exports = {
  GetArrayProps
};