import { Configuration } from 'openai';
import { BuilInLanguage } from './Constants';
import { IColumns } from './Interfaces/IColumns';
declare class ArraysAi<T> {
    private _data;
    private _columns;
    private _counts;
    private _configurator;
    private _openaiapi;
    private _language_output;
    private _tokens;
    private _task_prompt;
    private _response_instruction;
    Configure(OpenAiConfig: Configuration, OutputLanguage?: BuilInLanguage): void;
    SetData(Data: Array<Array<T>>): void;
    GetData(): Array<Array<T>>;
    GetColumns(): Array<IColumns>;
    SetTokenNumber(Token: number): void;
    Ask(Question?: string | undefined, Verbose?: boolean): Promise<string | any>;
    FormmatPropmt(Question: string): string;
    GetVerboseResponse(Question: string, Answer: string): Promise<string>;
}
export { ArraysAi };
