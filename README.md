# Arrays-AI

The "arrays-ai" library provides a way to manipulate arrays of objects in JavaScript using artificial intelligence. It allows performing operations such as filtering, aggregaton, sorting, and removing elements from the array, interpreting commands in natural language. The library uses the OpenAI API to process the commands and apply the corresponding operations on the array.

## **Installation**

To install the library, you can use NPM:

```bash
npm install arrays-ai
```

You can also download the source code from the GitHub repository and use it directly in your project.

## **Usage**

To use the library in your project, you must first import it:

```jsx
const { GetQuery, ConfigureKey } = require('arrays-ai');
```

Then, you must configure the OpenAI API key using the "ConfigureKey" function. This key is necessary to use certain functions of the library:

```jsx
ConfigureKey(process.env.OPENAI_API_KEY);
```

After that, you can manipulate an array of objects using the "GetQuery" function. This function takes as parameters the array to manipulate and a query string that indicates the operation to perform. For example, to add an element to the array, you could use the following query:

```jsx
GetQuery(array, "Get the persons with name Alfredo")
  .then(array => {
    console.log(array);
  });
```

The "GetQuery" function uses OpenAI's artificial intelligence to interpret the query and perform the corresponding manipulation on the array. The result is returned through a promise that resolves with the modified array.

## **Documentation**

The "arrays-ai" library has the following API:

| Function | Description |
| --- | --- |
| GetQuery(array: Array, query: string) => Promise<Array> | Performs a manipulation on the "array" according to the "query". Returns a promise that resolves with the modified array. |
| ConfigureKey(apiKey: string) => void | Configures the OpenAI API key. This function must be called before using the "GetQuery" function. |

## **Contributing**

If you want to contribute to the project, you can do the following:

- Report bugs or suggest improvements using the GitHub issues system.
- Propose new features or improve documentation using pull requests.

## **License**

This project is distributed under the MIT license. See the LICENSE file for more details.