import React, { useContext, useEffect, useState } from 'react'
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
import { usersServices } from '@/services/api/users-service'
import { MakeNotification, NotificationType } from 'fck-react-dialog'

import { USER_PROFILE_ROLES } from "@/domain/views/User"

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
        onAction: any,
        company_id: any
    }
}

export const UserForm: React.FunctionComponent<UserForm.Params> = ({ entry, onAction, onData, company_id }) =>{
    const context = useContext(Globalcontext)
    const state = UseStateAdapter(INITIAL_DATA)
    const [page, setPage] = useState(0);

    useEffect(()=>{ 
        if(!entry) return state.data.set(INITIAL_DATA);
        console.log(entry)
        var roles = entry.roles.map((r:string)=> (USER_PROFILE_ROLES[ USER_PROFILE_ROLES.findIndex((v:any)=>v.value==r)])    );
        console.log("roles", roles)
        return state.data.set({ ...entry, roles}) 
    },[entry])

    const submit = async ()=>{
        state.loading.set(true)
        state.errors.clear()

        const { senha, senhaConfirmacao } = state.data.get

        if(senha != senhaConfirmacao){ 
            state.errors.set({ senhaConfirmacao: "Senhas não batem!" })
            return
        }

        var body:any = { ...state.data.get, company_id, roles: state.data.get["roles"].map((v:any)=>v.value)}

        try{
            const data = await usersServices.save(body);
            onAction(-1);
            context.dialog.push(MakeNotification(() =>{ return -1 },[ "Salvo com sucesso!"],"Sucesso!",NotificationType.SUCCESS))
        }catch(err:any){
            if (err.params) {  
                state.errors.set(err.params) ;
                setPage(0);
            }
        }finally{
            state.loading.set(false)
        }
    }

    const jumpPage = () =>{
        if(state.data.get["id"]) return submit();

        if(page == 0){
            setPage(prev=>prev+1)
        }else if(page == 1){
            submit()
        }
    }

    return (
        <UnaModalForm onSave={jumpPage} onCancel={()=>onAction(-1)} >
            { 
                page == 0 
                ? <UserInfoForm  state={state}/>
                : <AuthForm state={state}/>
            }
        </UnaModalForm>
    )
}

export const UserInfoForm = ({state}: { state: any}) =>{

    const spliceRoles = (entry: LabelView ) => {
        state.data.set((prev: any)=>{
            var prevRoles: any = [ ...prev.roles ];
            let sliced = prevRoles.filter((c:any)=> c.value !== entry.value); 

            prevRoles = sliced.length < prevRoles.length ? sliced : [ ...prevRoles, entry ] 
            
            return ({  ...prev, roles: prevRoles })
        })
    }

    return (  
        <Forming.FormGrid title="Informações gerais" columns={[8,4,12,12,12]}>
            
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

            <Forming.InputWrapper label={"Papeis"}>
                {
                    USER_PROFILE_ROLES.map(p=>( 
                        <CheckBoxControl 
                            key={p.value} 
                            selected={state.data.get['roles'].includes(p)} 
                            onClick={spliceRoles} 
                            value={p}/> 
                    ))
                }                   
            </Forming.InputWrapper>

        </Forming.FormGrid> 
    )
}

export const AuthForm = ({state}: { state: any}) => {
    

    return (  
        <Forming.FormGrid title="Segurança" columns={ [12] }>

            { !state.data.get["id"] &&
                <Forming.FormGrid title="" columns={[6,6]}>
                    <Controls.TextBox state={state} label="Senha" name={"senha"} type={Controls.TextBoxTypes.PASSWORD}/> 
                    <Controls.TextBox state={state} label='Confirme a senha' name={"senhaConfirmacao"} type={Controls.TextBoxTypes.PASSWORD}/> 
                </Forming.FormGrid>
            }
        </Forming.FormGrid> 
    )
}


export default UserForm