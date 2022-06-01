import React, {ChangeEvent, useEffect, useState } from 'react'
import './style.css'

export namespace SelectControl {
    export type Item  = { value: string, label: string, parent_id?: string }
    export interface Params {
        value?: string,
        items: Item[],
        disabled?: boolean,
        onChange: (args: any) =>void,
        emptyValue?: boolean,
        className?: string
    }
}   

export const SelectControl: React.FunctionComponent<SelectControl.Params> =  ({ className,value, items, onChange, disabled=false, emptyValue = false}) =>{
    
    const [ list, setList ] = useState<any[]>(items)

    useEffect(()=>{ 
        setList( (prev)=>{
            var novas=  [ ...items ]
            if(emptyValue) {
                novas.unshift({ label: "Nenhuma opção selecionada", value:"" });
            }
            return novas;
        }) 
    },[items])

    const handleInput = ( e: ChangeEvent<HTMLSelectElement> ) =>{
        onChange({ value: e.target.value, label: list[e.target.options.selectedIndex].label }) 
    }

    return (
        <select
            className={className ?? ""}
            disabled={disabled || list.length === 0 || (value == ""&& emptyValue == false) } 
            onChange={handleInput}
            value={ value ?? ""} >
            { list?.length && list.map((opt: any, i:number)=> (<option key={i} value={opt.value}>{opt.label}</option>)) }
        </select>
    )
}

export default SelectControl
