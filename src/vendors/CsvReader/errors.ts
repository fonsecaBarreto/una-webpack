export class InvalidCsvFile extends Error {
     constructor(err: Error){
          super("Não é um arquivo .csv Valido.")
          this.stack = err.stack;
          Object.setPrototypeOf(this, InvalidCsvFile.prototype);
     }
}