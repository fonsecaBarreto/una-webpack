import { DialogContent } from 'fck-react-dialog'
import React, { ReactNode, useEffect } from 'react'
import { BsCloudCheckFill } from 'react-icons/bs'
import { FaTimes } from 'react-icons/fa'
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
                <button onClick={onCancel} className="scape-button"> <FaTimes/> Cancelar</button>
                <button onClick={onSave}> <BsCloudCheckFill/> Salvar</button>
            </section>
        </div>
    )
}

export default UnaModalForm