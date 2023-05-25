import { Configuration } from 'openai';
import { BuilInLanguage, Languages } from '../Constants';
import { IColumns } from '../Interfaces/IColumns';
declare class ArraysAi<T> {
    private _data;
    private _columns;
    private _counts;
    private _configurator;
    private _openaiapi;
    private _language_output;
    private _tokens;
    private _temperature;
    private _task_prompt;
    private _response_instruction;
    private _language;
    Configure(OpenAiConfig: Configuration, OutputLanguage?: BuilInLanguage): void;
    SetLanguage(Language: Languages): void;
    SetData(Data: Array<Array<T>>): void;
    GetData(): Array<Array<T>>;
    GetColumns(): Array<IColumns>;
    SetTokenNumber(Tokens: number): void;
    SetTemperature(Temperature: number): void;
    Ask(Question?: string | undefined, Verbose?: boolean): Promise<string | any>;
    private GetValidCode;
    private FormmatTaskQuestion;
    private GetVerboseResponse;
    private GetOpenAiResponse;
}
export { ArraysAi };
