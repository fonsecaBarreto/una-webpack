import React, {useEffect, useState } from 'react'
import './style.css'
import Item from './Item'
import Wrapper, { SelectorNavWrapper } from '../Wrapper'

export namespace MultipleSelectionControl {
    export type Item  = { value: string, label: string, parent_id?: string }
    export interface Params extends Omit<SelectorNavWrapper.Params, 'children'> {
        title: string,
        icon?: any,
        value?: any[],
        items: Item[],
        onChange: (arg:any) =>void,
        max?: number,
    }
}   

export const MultipleSelectionControl: React.FunctionComponent<MultipleSelectionControl.Params> =  ({ value=[], icon, title, items, onChange, max=-1 }) =>{
    
    const [ list, setList ] = useState<any[]>(items)
    useEffect(()=>{ setList([ ...items]) },[items]) 

    const handleClick = (item?: MultipleSelectionControl.Item) =>{

        var s_items: any[] =[];

        if (item) {

            s_items = [ ...value ]; 
            
            if ((max > 1) && ( s_items.length + 1 > max && ( (s_items.filter(b=>b.value==item.value)).length == 0  ) ) ) return 
            
            if (max == 1) {  s_items = [] }  
            
            let sliced = s_items.filter((c:any)=> c.value !== item.value); 
            
            s_items = sliced.length < s_items.length ? sliced : [ ...s_items, item ];
            
        }

        onChange(s_items) 
    } 

    return (
        <Wrapper icon={icon} title={title}>
            <ul>
                <Item item={{ label: "Todos", value: "" }} onClick={()=>handleClick()} selected={ value.length === 0 }></Item>
                { 
                    list.map((c:any,i)=>{
                        return ( 
                            <Item key={i} item={c} 
                                onClick={()=>handleClick(c)} 
                                selected={ value.map((s:any)=>s.value).includes(c.value) }> 
                            </Item> 
                        )
                    })
                }
            </ul>
        </Wrapper>
    )
}

export default MultipleSelectionControl
