import { IColumns } from "../Interfaces/IColumns";
declare class DataInfo<T> {
    private _data;
    SetData(data: Array<T>): void;
    GetColumnsInfo(): IColumns;
}
export { DataInfo };
