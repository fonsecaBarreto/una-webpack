import React, { useContext, useEffect } from 'react'
import "./style.css"
import { Controls, Forming } from 'fck-react-input-controls'
import { UseStateAdapter } from 'fck-react-input-controls/lib/Controls'
import UnaModalForm from '../components/una/ModalForm'
import Globalcontext from '@/react-apps/apps/main/global-components-context'
import SwitchButton from '../components/una/switchButton'
import { BiBadgeCheck } from 'react-icons/bi'
import { MdBlock } from 'react-icons/md'
import CheckBoxControl from '../components/una/CbControl'
import { LabelView } from 'fck-components/lib/Controls'

const USER_PROFILE_ROLES = [ 
    { value: "LOGISTICA", label: "Logistica" },
    { value: "COMPRADOR", label: "Comprador" },
    { value: "FORNECEDOR", label: "Fornecedor" },
    { value: "GESTOR", label:"Gestor" },
    { value: "ADMIN", label:"Admin" },
    { value: "NEGOCIADOR", label:"Negociador" } ]

const INITIAL_DATA= {
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    senha: "",
    senhaConfirmacao: "",
    ativo: false,
    roles: []
}

export namespace UserForm{
    export type Params = {
        entry: any,
        onData: any
        onAction: any
    }
}

export const UserForm: React.FunctionComponent<UserForm.Params> = ({ entry }) =>{
    const context = useContext(Globalcontext)
    const state = UseStateAdapter(INITIAL_DATA)

    useEffect(()=> ( state.data.set(entry ? entry : INITIAL_DATA) ),[entry])

    const spliceRoles = (entry: LabelView ) =>{

        state.data.set((prev: any)=>{
            var prevRoles: any = [ ...prev.roles ];
            let sliced = prevRoles.filter((c:any)=> c.value !== entry.value); 

            prevRoles = sliced.length < prevRoles.length ? sliced : [ ...prevRoles, entry ] 
            
            return ({  ...prev, roles: prevRoles })
        })
    }

    return (
        <UnaModalForm onSave={()=>{}} onCancel={()=>{}} >
              <Forming.FormGrid title="" columns={ state.data.get["id"]? [8,4,12,12,12,6,6,12]: [8,4,12,12,12,12] }>
                <Controls.TextBox  placeHolder="Exemplo: Casimiro Miguel Ferreira"
                    state={state} label={"Nome"} name={"nome"} type={Controls.TextBoxTypes.TEXT}/>

                <Forming.InputWrapper label={"Status"}>
                    <SwitchButton value={state.data.get['ativo'] === true ? 0 : 1} 
                        onInput={(i)=>state.data.onInput("ativo", i === 0 ? true : false)}> 
                        <span className='una-company-status-button active' > <BiBadgeCheck/>  Ativo </span>
                        <span className='una-company-status-button inactive'> <MdBlock/>  Inativo </span>
                    </SwitchButton>
                </Forming.InputWrapper>

                <Controls.TextBox placeHolder="Exemplo: meuemail@mail.com"
                    state={state} label={"E-mail"} name={"email"} type={Controls.TextBoxTypes.TEXT}/>

                <Controls.TextBox  placeHolder="(22) 01234-1234" mask="(99) 99999-9999"
                    state={state} label={"Telefone"} name={"telefone"} type={Controls.TextBoxTypes.TEXT}/>

                <Controls.TextBox placeHolder="Exemplo: 999.999.999-99" mask="999.999.999.99" 
                    state={state} label="CPF " name={"cpf"}  type={Controls.TextBoxTypes.TEXT}  > </Controls.TextBox>

                { 
                    !state.data.get["id"] &&
                        <Controls.TextBox state={state} label="Senha" name={"senha"} type={Controls.TextBoxTypes.PASSWORD}/> 
                }
                 
                { 
                    !state.data.get["id"] &&
                        <Controls.TextBox state={state} label='Confirme a senha' name={"senhaConfirmacao"} type={Controls.TextBoxTypes.PASSWORD}/> 
                }


                <Forming.InputWrapper label={"Papeis"}>
           
                    {
                        USER_PROFILE_ROLES.map(p=>( <CheckBoxControl key={p.value} selected={state.data.get['roles'].includes(p)} onClick={spliceRoles} value={p}/> ))
                    }
                                     
                </Forming.InputWrapper>

            </Forming.FormGrid>
        </UnaModalForm>
    )
}

export default UserForm