import React, { useEffect } from 'react'
import "./style.css"
import { Controls, Forming } from 'fck-react-input-controls'
import { UseStateAdapter } from 'fck-react-input-controls/lib/Controls'
import UnaModalForm from '../components/una/ModalForm'

const INITIAL_DATA= {
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    senha: "",
    senhaConfirmacao: ""
}

export namespace UserForm{
    export type Params = {
        entry: any
    }
}

export const UserForm: React.FunctionComponent<UserForm.Params> = ({ entry }) =>{
    const state = UseStateAdapter(INITIAL_DATA)

    useEffect(()=>{ 
        state.data.set(entry ? entry : INITIAL_DATA) 
    },[entry])

    return (
        <UnaModalForm onSave={()=>{}} onCancel={()=>{}} >
              <Forming.FormGrid title="" columns={[12,12,12,12,12,12]}>
                <Controls.TextBox  placeHolder="Exemplo: Casimiro Miguel Ferreira"
                    state={state} label={"Nome"} name={"nome"} type={Controls.TextBoxTypes.TEXT}/>
                <Controls.TextBox placeHolder="Exemplo: meuemail@mail.com"
                    state={state} label={"E-mail"} name={"email"} type={Controls.TextBoxTypes.TEXT}/>
                <Controls.TextBox  placeHolder="(22) 01234-1234" mask="(99) 99999-9999"
                    state={state} label={"Telefone"} name={"telefone"} type={Controls.TextBoxTypes.TEXT}/>
                <Controls.TextBox placeHolder="Exemplo: 999.999.999-99" mask="999.999.999.99" 
                    state={state} label="CPF " name={"cpf"}  type={Controls.TextBoxTypes.TEXT}  > </Controls.TextBox>
                <Controls.TextBox state={state} label="Senha" name={"senha"} type={Controls.TextBoxTypes.PASSWORD}/> 
                <Controls.TextBox state={state} label='Confirme a senha' name={"senhaConfirmacao"} type={Controls.TextBoxTypes.PASSWORD}/> 
            </Forming.FormGrid>
        </UnaModalForm>
    )
}

export default UserForm