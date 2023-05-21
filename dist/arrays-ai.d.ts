import { Configuration } from 'openai';
import { IColumns } from './Interfaces/IColumns';
declare class ArraysAi<T> {
    private _data;
    private _columns;
    private _configurator;
    private _openaiapi;
    private task_prompt;
    Configure(OpenAiConfig: Configuration): void;
    SetData(Data: Array<Array<T>>): void;
    GetData(): Array<Array<T>>;
    GetColumns(): Array<IColumns>;
}
export { ArraysAi };
