import React, { ReactNode } from 'react'
import { Button } from 'react-bootstrap'
import "./style.css"

export namespace UnaModalForm{
    export type Params = { 
        children: ReactNode,
        onSave: () => void,
        onCancel: () => void,
        fill?: number
    }
}

export const UnaModalForm: React.FunctionComponent<UnaModalForm.Params> = ({ children, onSave, onCancel, fill }) =>{
    return (
        <div className={`una-forms ${fill ? "fullfill" : "" }`}>
            <section> {children} </section>
            <section>
                <Button onClick={onCancel} variant="danger"> Cancelar</Button>
                <Button onClick={onSave}> Salvar</Button>
            </section>
        </div>
    )
}

export default UnaModalForm