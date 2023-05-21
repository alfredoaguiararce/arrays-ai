import { Configuration, OpenAIApi } from 'openai';
import { DataInfo } from './datautils/DataInfo';
import { IOpenAiConfiguration, OpenAiConfigurator } from './Utils/OpenAiValidator';
import { Tags, ListedLibraries, BuilInLanguage } from './Constants';
import { IColumns } from './Interfaces/IColumns';

class ArraysAi<T>
{
    private _data : Array<Array<T>> | undefined;
    private _columns : Array<IColumns> | undefined;
    private _counts : Array<number> | undefined;
    private _configurator : IOpenAiConfiguration;
    private _openaiapi: OpenAIApi | undefined;
    private _language_output: BuilInLanguage = BuilInLanguage.JAVASCRIPT; // Default Value

    // If the question does not specify a particular array indexes, you need to concatenate or merge all the arrays into a single array before performing any operations or calculations;
    private _task_prompt: string = 
    `You are provided with and array of 'n' arrays named '{ARRAYS_NAME}' where a element can be refered like 'row' or 'element':
    for each array have the columns {COLUMNS} each row represents the columns of each array respectively by their index
    
    When asked about the data, your response should include a {BUILD_LANGUAGE} code that describes the arrays.
    It is preferred that you use strongly typed values based on the columns and Please make sure to keep your response concise and to the point;
    If you need to perfom math operations use Math library.
    Using the provided arrays, return the {BUILD_LANGUAGE} code and make sure to prefix the requested {BUILD_LANGUAGE} code;
    with {START_CODE_TAG} exactly and suffix the code with {END_CODE_TAG} exactly to get the answer to the following question: 
    {QUESTION}
    use 'return' instead 'console.log()'
    `;

    public Configure(OpenAiConfig: Configuration, OutputLanguage?: BuilInLanguage){
        this._configurator = new OpenAiConfigurator(OpenAiConfig);
        this._openaiapi = this._configurator.GetConfiguredOpenAiApi();

        if(OutputLanguage != undefined || OutputLanguage != null) this._language_output = OutputLanguage;
    }

    public SetData(Data : Array<Array<T>>): void{
        this._data = Data;
        this._columns = [];
        this._counts = [];
      
        for (let i = 0; i < this._data.length; i++) {
          const rowData = this._data[i];
          const dataInfo: DataInfo<T> = new DataInfo<T>();
          dataInfo.SetData(rowData);
          this._columns.push(dataInfo.GetColumnsInfo());
          this._counts.push(dataInfo.GetElementsCount())
        }
    }

    public GetData(): Array<Array<T>>{
        if(this._data == undefined) throw new Error("There is not data.");
        return this._data;
    }

    public GetColumns(): Array<IColumns>{
        if(this._data == undefined) throw new Error("Please configure Data first.");
        if(this._columns == undefined) throw new Error("Somethings was wrong configuring the columns.");
        return this._columns;
    }

    public async Ask(Question?: string | undefined): Promise<string>{
        if(Question == null || Question == undefined) throw new Error("Please provide a question...");
        const PromptQuestion = this.FormmatPropmt(Question);
        console.log("🚀 ~ file: arrays-ai.ts:55 ~ Ask ~ PromptQuestion:", PromptQuestion)
        // Send the prompt to the OpenAI API to generate the filter code
        const response = await this._openaiapi.createCompletion({
            model: 'text-davinci-003',
            prompt: PromptQuestion,
            temperature: 0,
            max_tokens: 250,
            n: 1,
        });

        // Get the generated text from the response
        const GeneratedText: string | undefined = response.data.choices[0].text;

        // Check if the generated text is undefined and throw an error if it is
        if (GeneratedText == undefined) throw new Error("There's no response for the prompt");

        // Trim the generated text and evaluate it as {BUILD_LANGUAGE} code to get the filtered array
        const query = GeneratedText.trim();
        return query;
    }

    public FormmatPropmt(Question: string): string{
        this._task_prompt = this._task_prompt.replace("{ARRAYS_NAME}", "arrays")
        .replace("{BUILD_LANGUAGE}", this._language_output)
        .replace("{COLUMNS}", JSON.stringify(this._columns))
        .replace("{START_CODE_TAG}", Tags.START_CODE_TAG)
        .replace("{END_CODE_TAG}", Tags.END_CODE_TAG)
        .replace("{QUESTION}", Question)

        return this._task_prompt;
    }

}


export{
    ArraysAi
}