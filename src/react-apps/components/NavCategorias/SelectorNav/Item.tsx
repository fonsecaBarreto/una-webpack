import React from 'react'
import { NavComponent } from '.'

export namespace SelectorNavItem {
    export type Params = {
        item: NavComponent.Item,
        selected : boolean,
        onClick: ( item: NavComponent.Item) => void
    }
}

export const SelectorNavItem: React.FunctionComponent<SelectorNavItem.Params> = ({ item, selected, onClick}) =>{
    const { label } = item
    return (
        <li onClick={() => onClick({...item})} className={`${selected === true? 'selected' : ''}`} >
            <input readOnly type="checkbox" checked={selected}></input> 
            {label}
        </li>
    )
}

export default SelectorNavItem