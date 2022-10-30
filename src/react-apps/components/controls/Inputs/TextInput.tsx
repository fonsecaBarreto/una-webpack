import React from "react";
import { ChangeEvent } from "react"
import InputWrapper from '../InputWrapper'
import { BaseInputTypes } from "./Base";

export namespace TextInputType {
  export interface Params extends BaseInputTypes.Params {
    type?: string
  }
}

export const TextInput: React.FunctionComponent<TextInputType.Params> = (props) =>{

  const { name, label, error, noLabel, value="", onChange, 
    className, type="text", placeHolder, disabled=false,  floatLabel } = props;
  
  function handleChanges( e:any | ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> ) { 
      onChange(name, e.target.value)
  }
    
  return (
    <InputWrapper
      floatLabel={floatLabel}
      forceFocus={value.length > 0 ? true : false} 
      label={ noLabel ? undefined : label ?? name } error={error} className={className && className}>

      { type === "textarea" 
        ?(
          <textarea 
              disabled={disabled}
              rows={3} cols={50}
              placeholder={placeHolder ?? ''} 
              value={value}  
              onInput={handleChanges} >
          </textarea>
          ):(
          <input 
            disabled={disabled} 
            type={type} 
            placeholder={placeHolder ?? ''} 
            value={value}  
            onInput={ handleChanges }></input>
        )
      }
    </InputWrapper>
  )
}

export default TextInput