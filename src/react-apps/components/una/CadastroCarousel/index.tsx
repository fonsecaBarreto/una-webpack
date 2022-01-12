import React, { useState, useContext} from 'react'
import './style.css'
import CarouselFrame from './CarouselFrame'
import { Controls, Forming } from 'fck-components'
import { UseStateAdapter } from 'fck-components/lib/Controls'
import { CadastroCompanhia_schema, CadastroEndereco_schema, CadastroUsuario_schema } from './schemas'
import { ValidationSchema, Validator } from 'fck-schema-validator'
import GlobalComponentsContext from '@/react-apps/apps/main/global/global-components-context'
import ufs from './ufs.json'
import { MakeNotification, NotificationType } from 'fck-react-dialog'
import { loginServices } from "@/react-apps/services/login-service"
import { useHistory } from 'react-router-dom'

const validator = new Validator()

const SIGNUP_INITIAL_DATA = {
    nome: "Lucas Fonseca Barreto",
    email: "lucasfonsecab@hotmail.com",
    telefone: "22997836256",
    cpf: "16855177735",
    senha: "123456",
    senhaConfirmacao: "123456"
}
const JURIDICO_INITIAL_DATA ={
    nomeFantasia: "Minha Empresa.com",
    razaoSocial: "MinhaEmpresa.com.ldta",
    cnpj: "79.547.795/0001-02",
    emailFinanceiro: "meuemail@mail.com",
    inscricaoEstadual: "123123123123",
    telefoneComercial: "22997836256"
}
const ENDERECO_INITIAL_DATA = {
    rua: "Rua Santos Drumount",
    numero: "123",
    detalhes: "Detalhes aqui",
    bairro: "Liberdade",
    cidade: "Rio das Ostras",
    uf: "",
    cep: "123456789"
}

export const CadastroCarousel: React.FunctionComponent<any>  = ({setLoading}: {setLoading: Function}) =>{
    const history = useHistory()
    const GlobalContext = useContext(GlobalComponentsContext)
    const signupState = UseStateAdapter(SIGNUP_INITIAL_DATA)
    const enderecoState = UseStateAdapter(ENDERECO_INITIAL_DATA)
    const juridicoState = UseStateAdapter(JURIDICO_INITIAL_DATA)
    const [ carouselInitialIndex, setCarouselInitialIndex] = useState(-1)
    const validateFields = async (schema: ValidationSchema, data: any, setErrors: Function) =>{
        const errors = await validator.validate(schema, data)
        if(errors) { setErrors(errors); return -1; }
        setErrors({}); return 1;
    }

    const MensagemDeSucesso = () =>{
        GlobalContext.dialog.push(MakeNotification(()=>-1,["Bem Vindo a UNA Compras", "Receberá em breve um E-mail de confirmação"], "Bem-vindo", NotificationType.SUCCESS))
    }

    const submit = async () =>{

        var r = await validateFields( CadastroEndereco_schema, { ...enderecoState.data.get, uf: enderecoState.data.get["uf"].value }, enderecoState.errors.set)
        if(r == -1) return

        setLoading(true);
        signupState.errors.set({})
        enderecoState.errors.set({})
        juridicoState.errors.set({}) 

        const data = { 
            usuario: { ...signupState.data.get }, 
            companhia: { ...juridicoState.data.get },
            endereco: { ...enderecoState.data.get, uf: enderecoState.data.get["uf"].value }, 
        }
    
        try{
            const result = await loginServices.signup(data);
            GlobalContext.dialog.push(MakeNotification(()=>-1,[ 
                "Bem Vindo a UNA Compras",
                "Cadastro efetuado com successo!", 
                "Obrigado pela confiança, entraremos em contato em breve!"], "Sucesso!", NotificationType.SUCCESS));

            history.push("/");

        }catch(err:any){
            GlobalContext.dialog.push(MakeNotification(()=>-1,[ err?.message ], "Algo Errado", NotificationType.FAILURE))
            setCarouselInitialIndex(-1);
            if(err.params) {
                let paramsKeys = Object.keys(err.params);
                let signUpParams = Object.keys(signupState.data.get)
                var signUpFormIntersection = paramsKeys.filter((x) => (signUpParams.indexOf(x) != -1));
                if(signUpFormIntersection.length > 0 ){ 
                    signupState.errors.set(err.params)
                    return setCarouselInitialIndex(0)
                }
                let juridicoStateParams = Object.keys(juridicoState.data.get)
                var juridicoFormIntersection = paramsKeys.filter((x) => (juridicoStateParams.indexOf(x) != -1));
                if(juridicoFormIntersection.length > 0 ){ 
                    juridicoState.errors.set(err.params)
                    return setCarouselInitialIndex(1)
                }
            }

        }finally {
            setLoading(false)
        } 
    } 


    const carouselFrames = [
        { title: "Dados Pessoais",
            next: async () => {
                const n = await validateFields(CadastroUsuario_schema, Object.assign({}, signupState.data.get), signupState.errors.set)
                if(n == -1) return -1;
                const { senha, senhaConfirmacao } = signupState.data.get
                if(senha != senhaConfirmacao){ 
                    signupState.errors.set({ senhaConfirmacao: "Senhas não batem!" })
                    return -1
                }
                return 1
            },
            content:  
            <Forming.FormGrid title="" columns={[12,12,12,12,12,12]}>
                <Controls.TextBox  placeHolder="Exemplo: Casimiro Miguel Ferreira"
                    state={signupState} label={"Nome"} name={"nome"} type={Controls.TextBoxTypes.TEXT}/>
                <Controls.TextBox placeHolder="Exemplo: meuemail@mail.com"
                    state={signupState} label={"E-mail"} name={"email"} type={Controls.TextBoxTypes.TEXT}/>
                <Controls.TextBox  placeHolder="(22) 01234-1234" mask="(99) 99999-9999"
                    state={signupState} label={"Telefone"} name={"telefone"} type={Controls.TextBoxTypes.TEXT}/>
                <Controls.TextBox placeHolder="Exemplo: 999.999.999-99" mask="999.999.999.99" 
                    state={signupState} label="CPF " name={"cpf"}  type={Controls.TextBoxTypes.TEXT}  > </Controls.TextBox>
                <Controls.TextBox state={signupState} label="Senha" name={"senha"} type={Controls.TextBoxTypes.PASSWORD}/> 
                <Controls.TextBox state={signupState} label='Confirme a senha' name={"senhaConfirmacao"} type={Controls.TextBoxTypes.PASSWORD}/> 
            </Forming.FormGrid>
        },
        { title: "Pessoa Jurídica", 
            next: async () => await validateFields(CadastroCompanhia_schema, { ...juridicoState.data.get }, juridicoState.errors.set),
            content: (
            <Forming.FormGrid title="" columns={[]}>
                <Controls.TextBox placeHolder="Exemplo: Minha Empresa"
                    state={juridicoState} label={"Nome Fantasia"} name={"nomeFantasia"} type={Controls.TextBoxTypes.TEXT}/>
                <Controls.TextBox placeHolder="Exemplo: Minha Empresa LTDA"
                     state={juridicoState} label={"Razão Social"} name={"razaoSocial"} type={Controls.TextBoxTypes.TEXT}/>
                <Controls.TextBox placeHolder="Exemplo: 99.999.999/9999-99" mask="99.999.999/9999-99" 
                    state={juridicoState} label="CNPJ " name={"cnpj"}  type={Controls.TextBoxTypes.TEXT} > </Controls.TextBox>
                <Controls.TextBox placeHolder="Exemplo: meuemail@mail.com"
                    state={juridicoState} label={"E-mail financeiro"} name={"emailFinanceiro"} type={Controls.TextBoxTypes.TEXT}/>
                <Controls.TextBox placeHolder='Exemplo: 123.123.123.123' mask="999.999.999.999"
                    state={juridicoState} label={"Inscrição Estadual"} name={"inscricaoEstadual"} type={Controls.TextBoxTypes.TEXT}/>
                <Controls.TextBox placeHolder="(22) 01234-1234" mask="(99) 99999-9999"
                    state={juridicoState} label={"Telefone Comercial"} name={"telefoneComercial"} type={Controls.TextBoxTypes.TEXT}/>
            </Forming.FormGrid>
        ) },
        { title: "Endereço", 
            next: submit,
            nextLabel: "Finalizar",
            content: (
            <Forming.FormGrid title="" columns={[6, 6, 7, 5, 12]}>
                <Controls.TextBox 
                    state={enderecoState} label={"Cep"} name={"cep"} type={Controls.TextBoxTypes.TEXT}  placeHolder={'Exemplo : 123456-123'}  mask="99999-999"  />
                <Controls.SelectBox 
                    state={enderecoState} label="UF" name={"uf"} list={ufs.UFS}  > </Controls.SelectBox>
                <Controls.TextBox placeHolder={'Exemplo: Rua Silva'}
                    state={enderecoState} label={"Logradouro"} name={"rua"} type={Controls.TextBoxTypes.TEXT}/>
                <Controls.TextBox placeHolder={"Exemplo: 99"} 
                    state={enderecoState} label={"Numero"} name={"numero"} type={Controls.TextBoxTypes.TEXT}/>
                <Controls.TextBox placeHolder={"Exemplo: Bairro das Flores"}
                    state={enderecoState} label={"Bairro "} name={"bairro"} type={Controls.TextBoxTypes.TEXT}/>
                <Controls.TextBox placeHolder={"Exemplo: Macaé"}
                    state={enderecoState} label="Cidade" name={"cidade"} type={Controls.TextBoxTypes.TEXT}/> 
                <Controls.TextBox placeHolder={"Exemplo: Proximo a fármacia"}
                    state={enderecoState} label="Complemento " name={"detalhes"} type={Controls.TextBoxTypes.TEXTAREA}/> 
            </Forming.FormGrid>
        )} 
    ]
    return (
        <div className="una-cadastro-carousel">
      
            <CarouselFrame frames={carouselFrames} forceIndex={carouselInitialIndex}> </CarouselFrame>        
        </div>
    )
}

export default CadastroCarousel
