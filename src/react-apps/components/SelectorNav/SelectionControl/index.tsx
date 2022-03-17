import React, { useContext, useEffect, useRef, useState } from 'react'
import './style.css'
import Item from './Item'
import Wrapper, { SelectorNavWrapper } from '../Wrapper'

export namespace SelectionControl {
    export type Item  = { value: string, label: string, parent_id?: string }
    export interface Params extends Omit<SelectorNavWrapper.Params, 'children'> {
        initial_value?: any[],
        items: Item[],
        onChange: (items: Item[]) =>void,
        hide_values?: string[]
        max?: number
    }
}   

export const SelectionControl: React.FunctionComponent<SelectionControl.Params> =  ({ initial_value=[], items, title, onChange, max=-1 }) =>{
    
    const [list, setList ] = useState<any[]>(items)
    const [selectedItems, setSelectedItems ] = useState<SelectionControl.Item[]>(initial_value)
    const selectedItemsRef = useRef(selectedItems)

    useEffect(()=>{ setList(items) },[items])

   /*  useEffect(()=>{},[]) */
   /*  useEffect(()=>{
        console.log("aqui os items")
        if(selectedItems.length > 0) {
            setSelectedItems((prev)=>{
                return ([ ...prev.filter((j)=>items.map(j=>j.value).includes(j.value)) ])
            })
        }
    },[items]) */

 /*    useEffect(()=>{ onChange(selectedItems) },[selectedItems]) */

    const handleClick = (item?: SelectionControl.Item) =>{
        var prev = selectedItemsRef.current;
        var s_items: any[] =[];

        if (item) {

            s_items = [ ...prev ]; 

            if ((max > 1) && ( s_items.length + 1 > max && ( (s_items.filter(b=>b.value==item.value)).length == 0  ) ) ) return 
          
            if (max == 1) {  s_items = [] }  
            
            let sliced = s_items.filter((c:any)=> c.value !== item.value); 
        
            s_items = sliced.length < s_items.length ? sliced : [ ...s_items, item ];

        }
        selectedItemsRef.current = s_items;
        setSelectedItems(s_items);
        onChange(selectedItemsRef.current)
    } 

    return (
        <Wrapper title={title}>
            <ul>
                <Item item={{ label: "Todos", value: "" }} onClick={()=>handleClick()} selected={ selectedItems.length === 0 }></Item>
                { list.map((c:any,i)=>( 
                    <Item key={i} item={c} 
                        onClick={()=>handleClick(c)} 
                        selected={ selectedItems.map((s:any)=>s.value).includes(c.value) }> 
                    </Item> 
                ))}
            </ul>
        </Wrapper>
    )
}

export default SelectionControl
