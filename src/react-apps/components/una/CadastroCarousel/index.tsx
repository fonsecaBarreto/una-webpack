import React, { useState } from 'react'
import './style.css'
import CarouselFrame from './CarouselFrame'
import { Controls, Forming } from 'fck-components'
import { UseStateAdapter } from 'fck-components/lib/Controls'
import HandShakeImage from "@/public/assets/images/handshake.jpg"

const SIGNUP_INITIAL_DATA = {
    nome: "Lucas Fonseca Barreto",
    email: "lucasfonsecab@hotmail.com",
    telefone: "22997836256",
    cpf: "0000000000",
    senha: "123456",
    senhaconfirmacao: "123456"
}

const ENDERECO_INITIAL_DATA = {
    rua: "Minha rua aqui",
    numero: "A n2",
    detalhes: "Detalhe é esse aqui",
    bairro: "Flores",
    cidade: "Rio das ostras",
    uf: "SP",
    cep: "Campo 'cep' é obrigatório"
}

const JURIDICO_INITIAL_DATA ={
    nomeFantasia: "Lucas Fonsec2a",
    razaoSocial: "Lucas Fonseca F22x",
    cnpj: "37.478.004/0001-90",
    emailFinanceiro: "meuemailfinceiroutroo@gmail.com",
    inscricaoEstadual: "1231231312223"
}


export const CadastroCarousel: React.FunctionComponent<any>  = () =>{

    const signupState = UseStateAdapter(SIGNUP_INITIAL_DATA)
    const enderecoState = UseStateAdapter(ENDERECO_INITIAL_DATA)
    const juridicoState = UseStateAdapter(JURIDICO_INITIAL_DATA)

    const [ loading, setLoading ] = useState(false)

    const afterInfo = () =>{
        return true
    }

    const submit = () =>{
        return console.log("submitting")
    }

    const carouselFrames = [
        { title: "Dados Pessoais",
            content:  
            <Forming.FormGrid title="" columns={[12,12,12,12,12,12]}>
                <Controls.TextBox state={signupState} label={"Nome"} name={"nome"} type={Controls.TextBoxTypes.TEXT}/>
                <Controls.TextBox state={signupState} label={"E-mail"} name={"email"} type={Controls.TextBoxTypes.TEXT}/>
                <Controls.TextBox  placeHolder="(22) 01234-1234" mask="(99) 99999-9999"
                    state={signupState} label={"Telefone"} name={"telefone"} type={Controls.TextBoxTypes.TEXT}/>
                <Controls.TextBox placeHolder="Exemplo: 999.999.999-99" mask="999.999.999.99" 
                    state={signupState} label="CPF " name={"cpf"}  type={Controls.TextBoxTypes.TEXT}  > </Controls.TextBox>
                <Controls.TextBox state={signupState} label="Senha" name={"senha"} type={Controls.TextBoxTypes.PASSWORD}/> 
                <Controls.TextBox state={signupState} label='Confirme a senha' name={"senhaconfirmacao"} type={Controls.TextBoxTypes.PASSWORD}/> 
            </Forming.FormGrid>
        },
        { title: "Pessoa Jurídica", content: (
            <Forming.FormGrid title="" columns={[]}>
                <Controls.TextBox state={juridicoState} label={"Nome Fantasia"} name={"nomeFantasia"} type={Controls.TextBoxTypes.TEXT}/>
                <Controls.TextBox state={juridicoState} label={"Razão Social"} name={"razaoSocial"} type={Controls.TextBoxTypes.TEXT}/>
                <Controls.TextBox placeHolder="Exemplo: 99.999.999/9999-99" mask="99.999.999/9999-99" 
                    state={juridicoState} label="CNPJ " name={"cpf"}  type={Controls.TextBoxTypes.TEXT}  > </Controls.TextBox>
                <Controls.TextBox state={juridicoState} label={"E-mail financeiro"} name={"emailFinanceiro"} type={Controls.TextBoxTypes.TEXT}/>
                <Controls.TextBox state={juridicoState} label={"Inscrição Estadual"} name={"inscricaoEstadual"} type={Controls.TextBoxTypes.TEXT}/>
            </Forming.FormGrid>
        ) },
        { title: "Endereço", content: (
            <Forming.FormGrid title="" columns={[6, 6, 7, 5, 12]}>
                <Controls.TextBox state={enderecoState} label={"Cep"} name={"cep"} type={Controls.TextBoxTypes.TEXT}  placeHolder={'CEP *'}  mask="99999-999"  />
                <Controls.TextBox state={enderecoState} label={"UF"} name={"uf"} type={Controls.TextBoxTypes.TEXT}/>
                <Controls.TextBox state={enderecoState} label={"Logradouro"} name={"rua"} type={Controls.TextBoxTypes.TEXT}/>
                <Controls.TextBox state={enderecoState} label={"Numero"} name={"numero"} type={Controls.TextBoxTypes.NUMBER}/>
                <Controls.TextBox state={enderecoState} label={"Bairro "} name={"bairro"} type={Controls.TextBoxTypes.TEXT}/>
                <Controls.TextBox state={enderecoState} label="Cidade" name={"cidade"} type={Controls.TextBoxTypes.TEXT}/> 
                <Controls.TextBox state={enderecoState} label="Complemento " name={"detalhes"} type={Controls.TextBoxTypes.TEXTAREA}/> 
            </Forming.FormGrid>
        ) },
        { hideButtons: false, content: (
            <span className="congratspanel">
                <img src={HandShakeImage}></img> 
                <h2> Obrigado!</h2> 
                <h3> Suas informações passarão por um processo de validação </h3>
                <span>Receberá em breve um E-mail de confirmação</span>
            </span>
        ) }
    ]
    return (
        <div className="una-cadastro-carousel">
            <CarouselFrame frames={carouselFrames} loading={loading}> </CarouselFrame>        
        </div>
    )
}

export default CadastroCarousel
    /* const submit = async () =>{
        setLoading(true)
        signUpFormState.errorsState.setErrors({})
        addressFormState.errorsState.setErrors({})
        annexState.errorsState.setErrors({})
        try{
            const data = { 
                ...signUpFormState.inputsState.data, 
                address: {...addressFormState.inputsState.data}, 
                annexeses: annexState.files
            }

            await signUpService(data)
            dispatch(showSuccess(
                "Cadastrado com successo!", 
                "Obrigado pela confiança, entraremos em contato em breve!",
                "Sucesso!"))
            return true

        }catch(err){
            var whereIsTheError = 0
            if(err.params) {
                signUpFormState.errorsState.setErrors(err.params)
                if(err.params.address){
                    whereIsTheError=1
                    addressFormState.errorsState.setErrors(err.params.address) 
                }
                if(err.params.annexs){
                    whereIsTheError=2
                    annexState.errorsState.setErrors([err.params.annexs]) 
                }
            }
            setForceIndex(whereIsTheError)
            dispatch(showFailure(err.message))

            return false
        }finally {
            setLoading(false)
        }
    }  */