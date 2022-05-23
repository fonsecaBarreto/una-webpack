import React from 'react'
import './style.css'
import UnaListing from '../..'

export namespace SimpleItem {
    export type Params = UnaListing.ItemProps<{ value: string, label: string}>
}

export const SimpleItem: React.FunctionComponent<SimpleItem.Params> = ({ onChange, icon, data, listMode }) =>{

    return (
        <div className={`list-view-item ${listMode}`} onClick={()=>onChange && onChange("OPEN", data?.value )}>
            <div className="list-view-item-content">
                <section className="list-view-item-icon">
                    { icon && <img src={icon}/>}
                </section>
                <section>
                    <span className="list-view-item-name">
                        { data && data.label }
                    </span> 
                </section>
            </div> 
        </div>
    )
}

export default SimpleItem