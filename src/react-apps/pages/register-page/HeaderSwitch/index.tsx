import React, { useEffect, useState } from 'react';
import { SelectBox } from './SelectBox';
import "./style.css"

export namespace HeaderSwitch {
    export type Action =  { label: string, name: string }
    export type Item = { name: string, label: string, actions?: Action[], buttons?: Action[] }
    export type Params = { items: Item[],section: string, action: string, onChange: any, initials?: string[], }
}

export const HeaderSwitch: React.FunctionComponent<HeaderSwitch.Params> = ({ items, section, action, onChange, initials=["",""]}) => {
    const [ selected, setSelected ] = useState<any>(null)

    useEffect(()=>{ onChange("ACTION",initials[1])},[ selected ])

    useEffect(()=>{ 
        let indexof = items.findIndex(p=>(p.name == section))
        var selectedItem:any = indexof == -1 ? null : items[indexof];
        setSelected(selectedItem)
    },[section])

    return (
        <div className="bl-header-switch">
            <section>
                <SelectBox initial={initials[0]} items={items} value={section} onChange={(v:string)=>onChange("SECTION", v)}></SelectBox>
            </section>
            <section> 
                { selected?.actions && selected.actions.length > 0 && 
                    <SelectBox initial={initials[1]} items={selected.actions} value={action} onChange={(v:string)=>onChange("ACTION", v)}></SelectBox>
                }
            </section>
            <section> 
                 { (selected?.buttons && selected.buttons.length > 0) && 
                   selected.buttons.map((b:any, i : number)=>(
                       <button onClick={(()=>onChange("OPTION",b.name))} key={i}>{b.label}</button>
                   ))
                } 
            </section>
        </div>
    )
}


export default HeaderSwitch

