import { Configuration, CreateCompletionRequest } from 'openai';
import { BuilInLanguage } from './Constants';
import { IColumns } from './Interfaces/IColumns';
declare class ArraysAi<T> {
    private _data;
    private _columns;
    private _counts;
    private _configurator;
    private _openaiapi;
    private _language_output;
    private _arrays_name;
    private _task_prompt;
    Ask(Question?: string | undefined, Completion?: CreateCompletionRequest): Promise<string>;
    Configure(OpenAiConfig: Configuration, OutputLanguage?: BuilInLanguage): void;
    SetArraysName(Name: string): void;
    SetData(Data: Array<Array<T>>): void;
    GetData(): Array<Array<T>>;
    GetColumns(): Array<IColumns>;
    FormmatPropmt(Question: string): string;
}
export { ArraysAi };
