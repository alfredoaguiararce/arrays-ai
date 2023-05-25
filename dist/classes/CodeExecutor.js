"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeExecutor = void 0;
class CodeExecutor {
    SetData(Data) {
        this._data = Data;
    }
    GetData() {
        if (this._data == undefined)
            throw new Error("There is no data.");
        return this._data;
    }
    ExecuteCode(Code) {
        try {
            let fn = new Function("arrays", Code);
            let result = fn(this.GetData());
            return result;
        }
        catch (error) {
            throw new Error("💥 ~ file: CodeExecutor.ts ~ CodeExecutor<T> ~ error: " + error);
        }
    }
}
exports.CodeExecutor = CodeExecutor;
