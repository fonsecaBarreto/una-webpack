import React, { ChangeEvent, ReactNode, useEffect, useState } from 'react'
import './style.css'
import Wrapper, { SelectorNavWrapper } from '../Wrapper'

export namespace ButtonGroupControl {
    export interface Params extends Omit<SelectorNavWrapper.Params, 'children'> {
        content:{ onClick: () => void, node: ReactNode}[]
    }
}   

export const ButtonGroupControl: React.FunctionComponent<ButtonGroupControl.Params> =  ({ content, title }) =>{

    return (
        <Wrapper title={title}>
            <section className='button-group-control'>
                {
                    content.map((b)=>(
                        <button className='una-submit-button-color' onClick={b.onClick}> {b.node} </button>
                    ))
                }
            </section>
        </Wrapper>
    )
}

export default ButtonGroupControl
