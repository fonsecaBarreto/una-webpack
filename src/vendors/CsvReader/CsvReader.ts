import { Readable } from "stream"
import * as csv from 'fast-csv';
import { InvalidCsvFile } from './errors';


export namespace CsvReader {
     export type Config = {
          separator: string,
          quote: string,
          headers: string[]
     }
}

export interface CsvReader{
     read(file: Buffer, skipLines?: number ): Promise<any[]>
}

export default class AppCsvReader implements CsvReader {
     config: CsvReader.Config;

     constructor(c?:Partial<CsvReader.Config>){
          this.config = {
               separator: ",",
               quote: '"',
               headers: [],
               ...c
          }
     }

     read(buffer: Buffer, skipLines: number = 0): Promise<any[]>{
          const { separator, quote, headers } = this.config
          const results: any = []
          const readable = new Readable()
          return new Promise( (resolve, reject) => {
               readable.push(buffer);
               readable.push(null);
               readable.pipe(csv.parse({ 
                    headers: headers.length > 0 ? headers : true,
                    skipLines: 0, 
                    delimiter: separator, quote,
                    trim: true
               }))
               .on('error', (error: any) => reject( new InvalidCsvFile(error)))
               .on('data', (row:any) => results.push(row))
               .on('end', ( rowCount: number) => { return resolve(results) })
          });
     }
}

     