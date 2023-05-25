declare enum Tags {
    START_CODE_TAG = "<startCode>",
    END_CODE_TAG = "<endCode>"
}
declare enum ListedLibraries {
    MATH = "math.js"
}
declare enum BuilInLanguage {
    JAVASCRIPT = "JavaScript"
}
declare enum Languages {
    ENGLISH = "English",
    SPANISH = "Spanish"
}
declare enum PromptType {
    TASK = "You are provided with and array of 'n' arrays named '{ARRAYS_NAME}' where a element can be refered like 'row' or 'element':\n    for each array have the columns {COLUMNS} each row represents the columns of each array respectively by their index\n    \n    When asked about the data, your response should include a {BUILD_LANGUAGE} code that describes the arrays ignoring previous questions.\n    You should avoid creating arrays within the code with the name '{ARRAYS_NAME}'.\n    It is preferred that you use strongly typed values based on the columns and Please make sure to keep your response concise and to the point;\n    If you need to perfom math operations use Math library.\n    Using the provided arrays, return the {BUILD_LANGUAGE} code and make sure to prefix the requested {BUILD_LANGUAGE} code;\n    with {START_CODE_TAG} exactly and suffix the code with {END_CODE_TAG} exactly to get the answer to the following question: \n    {QUESTION}\n    use 'return' instead 'console.log()'\n    ",
    VERBOSE = "\n    Question: {QUESTION}\n    Answer: {ANSWER}\n\n    Rewrite the answer to the question in a conversational way, ignoring previous questions, use the {LANGUAGE} to describe the answer. \n    Don't translate the '{ANSWER}'.\n    Don't refer to '{ANSWER}' as 'the answer' or 'the solution'.\n    "
}
export { Tags, ListedLibraries, BuilInLanguage, Languages, PromptType };
