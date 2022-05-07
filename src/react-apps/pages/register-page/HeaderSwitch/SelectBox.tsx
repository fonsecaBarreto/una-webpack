import React, { useEffect, useState } from 'react';

export namespace SelectBox {
    export type Item = { name: string, label: string }
    export type Params = { items: Item[],value: string, onChange: any, initial?: any }
}

export const SelectBox: React.FunctionComponent<SelectBox.Params> = ({ value, items, onChange, initial }) =>{

    const [ resultItems , setResultItems] = useState<SelectBox.Item[]>([])

    useEffect(()=>{
        var result = !initial ? [ {name: "", label: "Nenhum Selecionado"}, ...items ] : items;
        setResultItems(result);
    }, [items])

    useEffect(()=>{ if(initial) return onChange(initial)}, [resultItems])

    return (
        <select value={value} onChange={(e)=>onChange(e.target.value)}>
            {resultItems.map((p: SelectBox.Item, i:number)=>{
                return ( <option key={i} value={p.name}>{p.label}</option>)
            })}
        </select>
    )
}
