import React, { useEffect, useState } from 'react'
import './style.css'
import { MdExpandLess, MdExpandMore } from 'react-icons/md'
import Item from './Item'

export namespace NavComponent {
    export type Item  = { value: string, label: string }
    export type Params = {
        title:string,
        items:Item[],
        push: ( item?: Item ) => void,
        selectedItems: string[],
    }
}   

export const SelectorNav: React.FunctionComponent<NavComponent.Params> =  ({ title, items, selectedItems, push }) =>{
    const [ open, setOpen ] = useState(true);
    return (
        <div className="nav-selector">
            <div onClick={()=>setOpen(!open)} className="nav-selector-title">{ open ? <MdExpandMore/> : <MdExpandLess/>}{ title } </div>
            <nav className={`nav-selector-body ${open ? 'open' : ''}`}>
                <ul>
                    <Item item={{ label: "Todos", value: ""}} onClick={()=>push()} selected={ selectedItems.length === 0 }></Item>
                    { items.map((c,i)=>( <Item key={i} item={c}  onClick={()=>push(c)} selected={ selectedItems.includes(c.value) ? true : false }> </Item> ))}
                </ul>
            </nav>
        </div>
    )
}

export default SelectorNav
