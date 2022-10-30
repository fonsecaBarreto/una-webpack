export namespace BaseInputTypes {
  export interface Params {
      name: string,
      value: any,
      onChange: (name: string, value: any) => void,
      label?: string,
      error?: string
      placeHolder?:string,
      className?:string,
      noLabel?: boolean,
      disabled?: boolean,
      floatLabel?: boolean
  }
}