import { IColumns } from "../Interfaces/IColumns";

class DataInfo<T>{
    private _data: Array<T> | undefined;

    public SetData(data: Array<T>){
        this._data = data;
    }

    public GetColumnsInfo():  IColumns
    {
        if(this._data == undefined) throw new Error("There's not data.")
        // Create an empty object to hold the Columns
        const Columns: IColumns = {};
      
        // Loop over each object in the array
        for (let row of this._data) 
        {
            // Loop over each property in the object
            for (let prop in row) 
            {
                // Add the property name and its data type to the columns object
                Columns[prop] = typeof row[prop];
            }
        }
      
        // Return the Props object
        return Columns;
    } 

    public GetElementsCount(): number{
        if(this._data == undefined) throw new Error("There's not data.");
        return this._data.length;
    }
}


export{
    DataInfo
}