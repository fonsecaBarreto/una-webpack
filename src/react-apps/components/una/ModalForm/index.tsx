import React, { ReactNode, useEffect } from 'react'
import "./style.css"

export namespace UnaModalForm{
    export type Params = { 
        children: ReactNode,
        onSave: () => void,
        onCancel: () => void
    }
}

export const UnaModalForm: React.FunctionComponent<UnaModalForm.Params> = ({ children, onSave, onCancel }) =>{
    return (
        <div className='una-forms'>
            <section> {children} </section>
            <section>
                <button onClick={onCancel}>Cancelar</button>
                <button onClick={onSave}>Salvar</button>
            </section>
        </div>
    )
}

export default UnaModalForm