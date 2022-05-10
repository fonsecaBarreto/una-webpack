import React from 'react'
import { MultipleSelectionControl } from '.'

export namespace SelectorNavItem {
    export type Params = {
        item: MultipleSelectionControl.Item,
        selected : boolean,
        onClick: ( item: MultipleSelectionControl.Item) => void
    }
}

export const SelectorNavItem: React.FunctionComponent<SelectorNavItem.Params> = ({ item, selected, onClick }) =>{
    const { label } = item
    return (
        <li onClick={() => onClick({...item})} className={`${selected === true? 'selected' : ''}`} >
            <input readOnly type="checkbox" checked={selected}></input> 
            <span>
                {label}
            </span>
        </li>
    )
}

export default SelectorNavItem