import React, { useEffect } from 'react'
import "./style.css"
import { UseStateAdapter } from 'fck-react-input-controls/lib/Controls'
import { Controls, Forming } from 'fck-react-input-controls'
import {MultiplesForms} from '..'

export namespace FormModal {
    export type Params = {
        initial_data: any,
        initial_errors: any,
        onAction: (data: any) => void,
        headers: MultiplesForms.Header[],
    }
}

export const FormModal: React.FunctionComponent<FormModal.Params> = ({ initial_data, initial_errors, onAction, headers }) => {

    const formState = UseStateAdapter(initial_data);
    useEffect(()=>{ formState.errors.set( initial_errors ?? {}) },[initial_errors]) 

    const submit = () =>{ onAction(formState.data.get) }

    return (
        <div className='m-form-modal'>
            <Forming.FormGrid title="" columns={[]}>
                { 
                    headers.map((h: any, i: number)=> {
                        var{ value: name, label, list, type } =h
                        return (
                            <React.Fragment key={i}>
                                { 
                                    type == "select" ? 
                                        <Controls.SelectBox 
                                            state={formState} label={label} name={name} list={list}/> 
                                    :   <Controls.TextBox placeHolder="" 
                                            state={formState} label={label} name={name} type={Controls.TextBoxTypes.TEXT}/> 
                                } 
                            </React.Fragment>
                        )
                    })
                }

            <button  className="una-submit-button m-auto" onClick={submit}>Inserir </button>
            </Forming.FormGrid>
        </div>
    )
}

export default FormModal