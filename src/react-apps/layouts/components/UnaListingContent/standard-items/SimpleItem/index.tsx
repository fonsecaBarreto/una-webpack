import React from 'react'
import './style.css'
import UnaListing from '../..'

export namespace SimpleItem {
    export type Params = UnaListing.ItemProps<{ value: string, label: string}>
}

export const SimpleItem: React.FunctionComponent<SimpleItem.Params> = ({ onChange, icon, data }) =>{

    return (
        <div className={`list-view-item`} onClick={()=>onChange && onChange("OPEN", data?.value )}>
            <div className="list-view-item-content">
                <section className="list-view-item-icon">
                    { icon && <img src={icon}/>}
                </section>
                <section>
                    <span className="list-view-item-name">
                        { data && JSON.stringify(data) }
                    </span> 
                </section>
            </div> 
        </div>
    )
}

export default SimpleItem