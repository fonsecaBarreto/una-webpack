

import React from 'react'
import './style.css'
import { MakeDialogConfig } from '../../'


export function MakeOptions (onAction, options=[], title="Opções"){

    return MakeDialogConfig( ({onAction}) => ( 
        <div className="options-dialog"> 
            { options.map((o,i)=>{
                return ( <button onClick={ ()=> onAction(i) } key={i}> {o.label} </button>)
            }) }
        </div>
    ),onAction, title)
}

export default MakeOptions