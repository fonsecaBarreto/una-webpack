import React, { useState, useContext, useEffect} from 'react'
import './style.css'
import CarouselFrame from './CarouselFrame'
import { Controls, Forming } from 'fck-react-input-controls'
import { UseStateAdapter } from 'fck-react-input-controls/lib/Controls'
import { CadastroCompanhia_schema, CadastroEndereco_schema, CadastroUsuario_schema } from './schemas'
import { ValidationSchema, Validator } from 'fck-schema-validator'
import GlobalComponentsContext from '@/react-apps/apps/main/global-components-context'
import { MakeNotification, NotificationType } from 'fck-react-dialog'
import { loginServices } from "@/services/api/login-service"
import { useHistory } from 'react-router-dom'
import CepInputControl from '../inputs-control/CepInputControl'
import { getCitiesByUf, getUfs } from '@/services/ibge'
import CompanyTypeSelector from './CompanyType'

const validator = new Validator()



const SIGNUP_INITIAL_DATA = {
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    senha: "",
    senhaConfirmacao: ""
}
const JURIDICO_INITIAL_DATA ={
    nomeFantasia: "",
    razaoSocial: "",
    cnpj: "",
    emailFinanceiro: "",
    inscricaoEstadual: "",
    telefoneComercial: "",
    isVendor: false,
    isMart: false,
}
const ENDERECO_INITIAL_DATA = {
    rua: "",
    ibge: "",
    numero: "",
    detalhes: "",
    bairro: "",
    cidade: "",
    uf: "",
    cep: ""
}

export const CadastroCarousel: React.FunctionComponent<any>  = ({setLoading}: {setLoading: Function}) =>{
    const history = useHistory()
    const [ ufs, setUfs ] = useState([])
    const [ cidades, setCidades ] = useState([])

    const GlobalContext = useContext(GlobalComponentsContext)
    const signupState = UseStateAdapter(SIGNUP_INITIAL_DATA)
    const enderecoState = UseStateAdapter(ENDERECO_INITIAL_DATA)
    const juridicoState = UseStateAdapter(JURIDICO_INITIAL_DATA)
    const [ carouselInitialIndex, setCarouselInitialIndex] = useState(-1)

    useEffect(()=>{
        enderecoState.loading.set(true);
        getUfs().then((ufs)=>setUfs(ufs.map((u:any)=>({value: u.id, label: u.nome, sigla: u.sigla })))).finally(()=>enderecoState.loading.set(false))
    },[])

    useEffect(()=>{
        let uf = enderecoState.data.get["uf"];
        if(uf =="") return;
        enderecoState.loading.set(true);
        getCitiesByUf(uf.value).then( cidades => setCidades(cidades.map((u:any)=>({value: u.id, label: u.nome})))).finally(()=>enderecoState.loading.set(false))
    },[enderecoState.data.get["uf"]])

    const validateFields = async (schema: ValidationSchema, data: any, setErrors: Function) =>{
        const errors = await validator.validate(schema, data)
        if(errors) { setErrors(errors); return -1; }
        setErrors({}); return 1;
    }

    const submit = async () =>{

        // Validar Formulario de endereço
        var enderecosData = { 
            ...enderecoState.data.get, 
            uf: Number(enderecoState.data.get["uf"].value ),
            ibge: Number(enderecoState.data.get["cidade"].value),
            cidade: enderecoState.data.get["cidade"].label,
        }
        var r = await validateFields( CadastroEndereco_schema, enderecosData, enderecoState.errors.set);
        if(r == -1) return

        // Continua
        setLoading(true);
        signupState.errors.set({})
        enderecoState.errors.set({})
        juridicoState.errors.set({}) 

        const data = { 
            usuario: { ...signupState.data.get }, 
            companhia: { ...juridicoState.data.get },
            endereco: enderecosData, 
        }

        try{
            await loginServices.signup(data);
            GlobalContext.dialog.push(MakeNotification(()=>-1,[ 
                "Bem Vindo a UNA Compras",
                "Cadastro efetuado com successo!", 
                "Obrigado pela confiança, entraremos em contato em breve!"], "Sucesso!", NotificationType.SUCCESS));
            history.push("/login?v=signin");
        }catch(err:any){
            GlobalContext.dialog.push(MakeNotification(()=>-1,[ err?.message ], "Algo Errado", NotificationType.FAILURE))
            setCarouselInitialIndex(-1);
            if(err.params) {
                let paramsKeys = Object.keys(err.params);
                let signUpParams = Object.keys(signupState.data.get)
                var signUpFormIntersection = paramsKeys.filter((x) => (signUpParams.indexOf(x) != -1));
                if(signUpFormIntersection.length > 0 ){ 
                    signupState.errors.set(err.params)
                    return setCarouselInitialIndex(1)
                }
                let juridicoStateParams = Object.keys(juridicoState.data.get)
                var juridicoFormIntersection = paramsKeys.filter((x) => (juridicoStateParams.indexOf(x) != -1));
                if(juridicoFormIntersection.length > 0 ){ 
                    juridicoState.errors.set(err.params)
                    return setCarouselInitialIndex(2)
                }
            }

        }finally {
            setLoading(false)
        } 
    } 

    const handleCep = (result: any) =>{
        if(!result) return enderecoState.loading.set(false)
        const { ibge, logradouro, complemento, bairro, localidade }  = result
        const uf_id = (ibge+"").substring(0,2);
        enderecoState.data.onInput("uf",{ value: uf_id });
        enderecoState.data.onInput("cidade",{ value: ibge, label: localidade });
        enderecoState.data.onInput("rua",logradouro);
        enderecoState.data.onInput("bairro", bairro);
        enderecoState.data.onInput("detalhes", complemento);
        enderecoState.loading.set(false);
    }

    const carouselFrames = [
        { title: "Conte-nos um pouco sobre o seu negócio.",
            next: async () => {
                return 1;
            },
            content:  
            <React.Fragment>
                <CompanyTypeSelector onChange={(n:any)=>{
                    console.log("hanged type", n)
                    juridicoState.data.onInput("isVendor", n == 0 ? false :true)
                    juridicoState.data.onInput("isMart", n == 0 ? true : false)
                }}></CompanyTypeSelector>
            </React.Fragment>
        },
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
            <Forming.FormGrid title="" columns={[6, 6, 7, 5, 12]} freeze={enderecoState.loading.get}>
                <CepInputControl beforeSubmit={()=>enderecoState.loading.set(true)} onData={handleCep} 
                    value={enderecoState.data.get['cep']} onInput={(v)=>enderecoState.data.onInput('cep', v)}/>
                <Controls.SelectBox disabled={ufs.length == 0 ? true : false}
                    state={enderecoState} label="UF" name={"uf"} list={ufs}  > </Controls.SelectBox>
                <Controls.SelectBox disabled={ cidades.length == 0 ? true : false}
                    state={enderecoState} label="Cidade" name={"cidade"} list={cidades}  > </Controls.SelectBox>
                <Controls.TextBox placeHolder={"Exemplo: 99"} 
                    state={enderecoState} label={"Numero"} name={"numero"} type={Controls.TextBoxTypes.TEXT}/>
                <Controls.TextBox placeHolder={"Exemplo: Bairro das Flores"}
                    state={enderecoState} label={"Bairro "} name={"bairro"} type={Controls.TextBoxTypes.TEXT}/>
                <Controls.TextBox placeHolder={"Exemplo: Macaé"}
                    state={enderecoState} label="Logradouro" name={"rua"} type={Controls.TextBoxTypes.TEXT}/> 
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
