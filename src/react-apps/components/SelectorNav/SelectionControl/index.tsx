import React, { useEffect, useState } from 'react'
import './style.css'
import Item from './Item'
import Wrapper, { SelectorNavWrapper } from '../Wrapper'

export namespace SelectionControl {
    export type Item  = { value: string, label: string, parent_id?:string }
    export interface Params extends Omit<SelectorNavWrapper.Params, 'children'> {
        items: Item[],
        items_to_hide?: string [],
        onChange: (items: Item[]) =>void,
        radio?: boolean
    }
}   

export const SelectionControl: React.FunctionComponent<SelectionControl.Params> =  ({ items, items_to_hide, title, onChange, radio= false }) =>{

    const [ selectedItems, setSelectedItems ] = useState<SelectionControl.Item[]>([])

    const handleClick = (item?: SelectionControl.Item) =>{
        setSelectedItems((prev)=>{
            var prevData: any = [ ...prev ]
            if (!item) { prevData = [] }
            else {

                
                if(radio){
                    let sliced = prevData.filter((c:any)=> c.value !== item.value); 
                    prevData = sliced.length < prevData.length ? [] : [ item ] 
                } else{

                    let sliced = prevData.filter((c:any)=> c.value !== item.value); 
                    prevData = sliced.length < prevData.length ? sliced : [ ...prevData, item ] 
                }
            
            }
            onChange && onChange(prevData)
            return (prevData)
        })
    }

    useEffect(()=>{
        if(selectedItems.length){
            setSelectedItems((prev)=>{
                return ([ ...prev.filter((j)=>items.map(j=>j.value).includes(j.value)) ])
            })
        }
    },[items])

    return (
        <Wrapper title={title}>
            <ul>
                <Item item={{ label: "Todos", value: ""}} onClick={()=>handleClick()} selected={ selectedItems.length === 0 }></Item>
                { items.map((c,i)=>( <Item key={i} item={c} onClick={()=>handleClick(c)} selected={ selectedItems.map(s=>s.value).includes(c.value) }> </Item> ))}
            </ul>
        </Wrapper>
    )
}

export default SelectionControl
