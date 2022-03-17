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
        max?: number,
        showChildrenFrom?: string[][],
        showValuesFrom?: string[]
    }
}   

export const SelectionControl: React.FunctionComponent<SelectionControl.Params> =  ({ showChildrenFrom=[[]], showValuesFrom=[], initial_value=[], items, title, onChange, max=-1 }) =>{
    
    const [list, setList ] = useState<any[]>(items)
    const [selectedItems, setSelectedItems ] = useState<SelectionControl.Item[]>(initial_value)
    const selectedItemsRef = useRef(selectedItems)

    useEffect(()=>{ setList(items) },[items]) 

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
                { 
                    list.map((c:any,i)=>{

                        var [ parent ] = showChildrenFrom;
    
                        if(
                            ( parent.length == 0  || (parent.map((j:any)=>j.value)).includes(c.parent_id) )
                            && 
                            ( showValuesFrom.length == 0  || (showValuesFrom.includes(c.value) )) 
                        ){
                            return (
                                <Item key={i} item={c} 
                                    onClick={()=>handleClick(c)} 
                                    selected={ selectedItems.map((s:any)=>s.value).includes(c.value) }> 
                                </Item> 
                            )
                        }  
                    })
                }
            </ul>
        </Wrapper>
    )
}

export default SelectionControl
