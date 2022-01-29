import React, { useEffect } from 'react'
import "./style.css"
import { UseStateAdapter } from 'fck-components/lib/Controls'
import { Controls, Forming } from 'fck-components'

export namespace FormModal {
    export type Params = {
        initial_data: any,
        onAction: (data: any) => void,
        headers: { label: string, value: string }[],
    }
}

export const FormModal: React.FunctionComponent<FormModal.Params> = ({ initial_data, onAction, headers }) => {

    const formState = UseStateAdapter(initial_data);

    const submit = () =>{
        onAction(formState.data.get)
    }
    return (
        <div className='m-form-modal'>

            <Forming.FormGrid title="" columns={[]}>

                        { headers.map((h: any, i: number)=> {

                            var name = h.value;
                            var label = h.label
     
                            return (
                                <React.Fragment key={i}>
                                    <Controls.TextBox placeHolder="" state={formState} label={label} name={name} type={Controls.TextBoxTypes.TEXT}/> 
                                </React.Fragment>
                            )
                        })}

                    <button onClick={submit}>Salvar </button>
            </Forming.FormGrid>

        </div>
    )
}

export default FormModal