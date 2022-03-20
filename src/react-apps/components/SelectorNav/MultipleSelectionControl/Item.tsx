import React from 'react'
import { SelectionControl } from '.'

export namespace SelectorNavItem {
    export type Params = {
        item: SelectionControl.Item,
        selected : boolean,
        onClick: ( item: SelectionControl.Item) => void
    }
}

export const SelectorNavItem: React.FunctionComponent<SelectorNavItem.Params> = ({ item, selected, onClick }) =>{
    const { label } = item
    return (
        <li onClick={() => onClick({...item})} className={`${selected === true? 'selected' : ''}`} >
            <input readOnly type="checkbox" checked={selected}></input> 
            {label}
        </li>
    )
}

export default SelectorNavItem