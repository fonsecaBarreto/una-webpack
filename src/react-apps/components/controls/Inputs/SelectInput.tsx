import React, { ChangeEvent, useEffect, useState } from "react"
import InputWrapper from '../InputWrapper'
import { BaseInputTypes } from "./Base"

export namespace SelectBoxType {
    export type Option ={ label: string, value: string }
    export interface Params extends BaseInputTypes.Params {
        allowEmpty?: boolean,
        options: Option[],
        onChange: (name: string, value: Option ) => void,
    }
}

export const SelectBox: React.FunctionComponent<SelectBoxType.Params> = ( props ) =>{

    const {  
        name, error, label, options, noLabel, value="",
        onChange, className, placeHolder, disabled=false, allowEmpty= true } = props;

    const [ observable, setObservable] = useState<SelectBoxType.Option[]>([])

    useEffect(()=>{
        const novo: any[] = options.map((v)=> v);
        if(allowEmpty){
            setObservable([{ 
                value: "", 
                label: placeHolder ??  "Nenhum Item Selecionado " 
            }, ...novo]);
    
        }else{
            setObservable([ ...novo]);
        }
        
    },[options])
    
    const handleInput = ( e:ChangeEvent<HTMLSelectElement> ) =>{
        onChange(name, { value: e.target.value, label: observable[e.target.options.selectedIndex].label }) 
    }

    return (
        <InputWrapper 
            label={noLabel ? undefined : label ?? name } 
            error={error} 
            className={className}>  
            <select 
                disabled={ disabled } 
                value={ value } 
                onChange={handleInput}>
                { 
                    observable.map((u,i)=>(
                        <option value={u.value} key={i}>{u.label}</option>
                        )) 
                    }
            </select>
        </InputWrapper>
    )
}


export default SelectBox