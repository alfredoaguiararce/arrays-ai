import { Configuration, OpenAIApi } from 'openai';
import { DataInfo } from '../datautils/DataInfo';
import { OpenAiConfigurator } from '../utils/OpenAiValidator';
import { Tags, ListedLibraries, BuilInLanguage, PromptType, Languages } from '../Constants';
import { IColumns } from '../Interfaces/IColumns';
import { CodeExecutor } from './CodeExecutor';

class ArraysAi<T>
{
    private _data : Array<Array<T>> | undefined;
    private _columns : Array<IColumns> | undefined;
    private _counts : Array<number> | undefined;
    private _configurator : OpenAiConfigurator;
    private _openaiapi: OpenAIApi | undefined;
    private _language_output: BuilInLanguage = BuilInLanguage.JAVASCRIPT; // Default Value

    private _tokens : number = 250;
    private _temperature : number = 0;

    private _task_prompt: string = PromptType.TASK;
    private _response_instruction: string = PromptType.VERBOSE;
    private _language: Languages = Languages.ENGLISH;

    public Configure(OpenAiConfig: Configuration, OutputLanguage?: BuilInLanguage)
    {
        this._configurator = new OpenAiConfigurator(OpenAiConfig);
        this._openaiapi = this._configurator.GetConfiguredOpenAiApi();

        if(OutputLanguage != undefined || OutputLanguage != null) this._language_output = OutputLanguage;
    }

    public SetLanguage(Language: Languages)
    {
        this._language = Language;
    }

    public SetData(Data : Array<Array<T>>): void
    {
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

    public GetData(): Array<Array<T>>
    {
        if(this._data == undefined) throw new Error("There is not data.");
        return this._data;
    }

    public GetColumns(): Array<IColumns>
    {
        if(this._data == undefined) throw new Error("Please configure Data first.");
        if(this._columns == undefined) throw new Error("Somethings was wrong configuring the columns.");
        return this._columns;
    }

    public SetTokenNumber(Tokens: number)
    {
        if(Tokens > 2048) throw new Error("The maximum number of tokens is 2048.");
        this._tokens = Tokens;
    }

    public SetTemperature(Temperature: number)
    {
        this._temperature = Temperature;
    }

    public async Ask(Question?: string | undefined, Verbose?: boolean): Promise<string | any>
    {
        if(Question == null || Question == undefined) throw new Error("Please provide a question...");
        const prompt_question = this.FormmatTaskQuestion(Question);
        // Send the prompt to the OpenAI API to generate the filter code
        const response = await this.GetOpenAiResponse(prompt_question, this._temperature, this._tokens);

        const response_removed_tags:string | null = this.GetValidCode(response);

        if(response_removed_tags == null) throw new Error("The generated code does not contain the tags correctly.");

        let arrays: Array<Array<T>> = this.GetData();
        let executor: CodeExecutor<any> = new CodeExecutor<any>();
        executor.SetData(arrays);
        let result = executor.ExecuteCode(response_removed_tags);
        if(Verbose) return this.GetVerboseResponse(Question, JSON.stringify(result))

        return result;
    }

    private GetValidCode(CodeWithTags: string): string | null
    {
        var start_index = CodeWithTags.indexOf(Tags.START_CODE_TAG);
        var end_index = CodeWithTags.indexOf(Tags.END_CODE_TAG, start_index + Tags.START_CODE_TAG.length);
      
        if (start_index !== -1 && end_index !== -1) {
          return CodeWithTags.substring(start_index + Tags.START_CODE_TAG.length, end_index);
        } 
        else {
          return null; // Not found characters
        }
    }
    private FormmatTaskQuestion(Question: string): string
    {
        this._task_prompt = this._task_prompt.replace("{ARRAYS_NAME}", "arrays")
        .replace("{BUILD_LANGUAGE}", this._language_output)
        .replace("{COLUMNS}", JSON.stringify(this._columns))
        .replace("{START_CODE_TAG}", Tags.START_CODE_TAG)
        .replace("{END_CODE_TAG}", Tags.END_CODE_TAG)
        .replace("{QUESTION}", Question)

        return this._task_prompt;
    }

    private async GetVerboseResponse(Question: string, Answer: string): Promise<string>
    {
        let formatted_prompt = this._response_instruction
                    .replace("{QUESTION}", Question)
                    .replace("{ANSWER}", Answer)
                    .replace("{LANGUAGE}", this._language);

        // Send the prompt to the OpenAI API to generate the filter code
        const response = await this.GetOpenAiResponse(formatted_prompt,this._temperature, 100);
        return response;
    }

    private async GetOpenAiResponse(Prompt: string, Temperature: number, MaxTokens: number): Promise<string>
    {
        const response = await this._openaiapi.createCompletion({
            model: 'text-davinci-003',
            prompt: Prompt,
            temperature: Temperature, 
            max_tokens: MaxTokens,
            n: 1,
        }); 

        // Get the generated text from the response
        const response_text: string | undefined = response.data.choices[0].text;

        // Check if the generated text is undefined and throw an error if it is
        if (response_text == undefined) throw new Error("There's no response for the prompt");

        // Trim the generated text and evaluate it as {BUILD_LANGUAGE} code to get the filtered array
        const trim_response = response_text.trim();

        return trim_response;

    }

}

export{
    ArraysAi
}