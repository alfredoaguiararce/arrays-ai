class CodeExecutor<T> {
    private _data: Array<Array<T>> | undefined;
  
    public SetData(Data: Array<Array<T>>): void {
      this._data = Data;
    }
  
    private GetData(): Array<Array<T>> {
      if (this._data == undefined) throw new Error("There is no data.");
      return this._data;
    }
  
    public ExecuteCode(Code: string): any {
      try {
  
        let fn: Function = new Function("arrays", Code);
        let result = fn(this.GetData());
  
        return result;
      } catch (error) {
        throw new Error("💥 ~ file: CodeExecutor.ts ~ CodeExecutor<T> ~ error: " + error);
      }
    }
  }
  
  export { CodeExecutor };
  