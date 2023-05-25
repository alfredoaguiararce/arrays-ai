// Constants used in the library

enum Tags{
    START_CODE_TAG  = "<startCode>"
    ,END_CODE_TAG   = "<endCode>"
}

enum ListedLibraries{
    MATH    =   "math.js"
    // ...
}

enum BuilInLanguage{
    JAVASCRIPT = "JavaScript"
    // ,TYPESCRIPT = "TypeScript"
}

enum Languages
{
    ENGLISH = "English"
    ,SPANISH = "Spanish"
}

enum PromptType
{
    TASK =     
    `You are provided with and array of 'n' arrays named '{ARRAYS_NAME}' where a element can be refered like 'row' or 'element':
    for each array have the columns {COLUMNS} each row represents the columns of each array respectively by their index
    
    When asked about the data, your response should include a {BUILD_LANGUAGE} code that describes the arrays ignoring previous questions.
    You should avoid creating arrays within the code with the name '{ARRAYS_NAME}'.
    It is preferred that you use strongly typed values based on the columns and Please make sure to keep your response concise and to the point;
    If you need to perfom math operations use Math library.
    Using the provided arrays, return the {BUILD_LANGUAGE} code and make sure to prefix the requested {BUILD_LANGUAGE} code;
    with {START_CODE_TAG} exactly and suffix the code with {END_CODE_TAG} exactly to get the answer to the following question: 
    {QUESTION}
    use 'return' instead 'console.log()'
    `

    ,VERBOSE = 
    `
    Question: {QUESTION}
    Answer: {ANSWER}

    Rewrite the answer to the question in a conversational way, ignoring previous questions, use the {LANGUAGE} to describe the answer. 
    Don't translate the '{ANSWER}'.
    Don't refer to '{ANSWER}' as 'the answer' or 'the solution'.
    `
}

export{
    Tags
    , ListedLibraries
    , BuilInLanguage
    , Languages
    , PromptType
}