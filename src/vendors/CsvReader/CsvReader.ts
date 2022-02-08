export namespace CsvReader {
     export type Config = {
          separator: string,
          quote: string,
          headers: string[]
     }
}

export default class AppCsvReader  {
     config: CsvReader.Config;
     private readonly _reader: FileReader;
     constructor(c?:Partial<CsvReader.Config>){
          this.config = {
               separator: ",",
               quote: '"',
               headers: [],
               ...c
          }
          this._reader = new FileReader();
     }

     public async execute(file: File | null): Promise<any>{
          if(!file) return ""
          const text = await this.read(file)
          const data = this.csvToArray(text)
          return data
     }

     private read(file: File,): Promise<string>{
          this._reader.readAsText(file);
          return new Promise((resolve)=>{
               this._reader.onload = function (e: any) {
                    const text = e.target.result;
                    return resolve(text)
               };
          })
     }

     private csvToArray(str: string, skipLines: number = 0) {
          const { separator, headers } = this.config
          let lines: any[] = [];
          /* Divide por linha */
          const linesArray = str.split('\n');
          /* Tira os caracteres extras */
          linesArray.forEach( (e: any) => {
               const row = e.replace(/[\s]+[,]+|[,]+[\s]+/g, ',').trim();
               lines.push(row);
          });
          const result = [];
          for (let i = skipLines; i < lines.length; i++) {
               const obj:any = {};
               const currentline = lines[i].split(separator);

               for (let j = 0; j < headers.length; j++) {
                    obj[headers[j]] = currentline[j];
               }
               
               result.push(obj);
          }
          return result
     }
}

     