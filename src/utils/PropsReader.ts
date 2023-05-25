// Define an interface for the Props object, which will have string keys and string values
interface Props {
    [key: string]: string;
  }
  
  // Define the function GetArrayProps, which takes an array of objects with unknown properties
  // and returns an object with the properties and their data types
  function GetArrayProps<T>(objects: T[]): Props {
    // Create an empty object to hold the Props
    const props: Props = {};
  
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
  
  // Export the GetArrayProps function and Props interface so that they can be used in other modules
  export {
    GetArrayProps,
    Props
  };
  