import { StateAdapter } from "fck-components/lib/Controls";
import React from "react";
import './style.css'
import { ChangeEvent, useEffect, useState } from "react"


export namespace MultiplesFormSelectInput {
    export type ItemView ={ label: string, value: string }
    export interface Params {
        list: ItemView[],
        name: string, 
        state: StateAdapter.Handler, 
        placeHolder?: string
    }
}

export const MultiplesFormSelectInput: React.FunctionComponent<MultiplesFormSelectInput.Params> = ({ name, state, list, placeHolder }) =>{

    const [ observable, setObservable] = useState<MultiplesFormSelectInput.ItemView[]>([])

    useEffect(()=>{
        const novo: any[] = list.map((v,i)=> v);
        setObservable([{ value: "", label: placeHolder ??  "Nenhum Item Selecionado " }, ...novo]);
    },[list])


    const handleInput = ( e:ChangeEvent<HTMLSelectElement> ) =>{
        state.data.onInput(name, { value: e.target.value, label: observable[e.target.options.selectedIndex].label }) 
    }

    return (
        <React.Fragment>
            <select disabled={list.length === 0}  value={ state.data.get[name]?.value ?? ""} onChange={handleInput}>
                { observable.map((u,i)=><option value={u.value} key={i}>{u.label}</option>) }
            </select>
        </React.Fragment>
    )
}

export default MultiplesFormSelectInput