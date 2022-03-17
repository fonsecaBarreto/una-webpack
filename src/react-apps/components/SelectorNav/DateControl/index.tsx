import React, { useEffect, useState } from 'react'
import './style.css'
import Wrapper, { SelectorNavWrapper } from '../Wrapper'

export namespace DateControl {
    export interface Params extends Omit<SelectorNavWrapper.Params, 'children'> {
        onChange: (arg: any) =>void,
        initial_value?: string
    }
}   

export const DateControl: React.FunctionComponent<DateControl.Params> =  ({ title, initial_value="", onChange }) =>{
    const [ selectedDate, setSelectedDate ] = useState<string>(initial_value)
    const handleInput = (data: any) =>{
        setSelectedDate(data)
        onChange && onChange(data)
    } 
    return (
        <Wrapper title={title}>
            <input className='selector-wrapper-date-picker' type="date" value={selectedDate} onChange={(e:any)=>handleInput(e.target.value)} />
        </Wrapper>
    )
}

export default DateControl
