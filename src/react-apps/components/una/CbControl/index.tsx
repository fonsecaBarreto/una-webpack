import React, { useEffect, useState } from 'react'
import './style.css'

export namespace CheckBoxControl {
    export interface Params  {
        value: { value: string, label: string },
        selected : boolean,
        onClick: ( value: any) => void
    }
}   

export const CheckBoxControl: React.FunctionComponent<CheckBoxControl.Params> =  ({ value, onClick, selected =false }) =>{

    return (
        <div className='flex-row' onClick={() => onClick(value)}>
            <input readOnly type="checkbox" name="roles" checked={selected} />
            <label>  {value.label} </label>
        </div>
    )
}

export default CheckBoxControl
