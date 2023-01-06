import React, { useState, useContext, useEffect, useMemo, useCallback} from 'react'
import './style.css'
/* components */
import CarouselFrame from './Frame'
import { GlobalContext } from "@/react-apps/apps/GlobalContext"
import { useHistory } from 'react-router-dom'
import ProgressBar from '@/react-apps/components/DotyProgressBar'
import TextInput from '../../controls/Inputs/TextInput'
import InputWrapper from '../../controls/InputWrapper'
import { SwitchButton } from '../../controls/Inputs/SwitchButton'
import FormGrid from '../../controls/FormGrid'
import { cnpjMask, cpfMask, phoneMask } from '../../utils/masks'
import CepInputControl from '../../controls/CepInputControl'
import SelectBox from '../../controls/Inputs/SelectInput'
/* validation */
import { CompanyDto } from './dtos/CompanyDto'
/* services */
import {  getCitiesByUf, getUfs } from '@/services/ibge'
import { handleValidate } from './vendor/Validator'
import { UserDto } from './dtos/UserDto'
import { AddressDto } from './dtos/AddressDto'
import { loginServicesV2, SignUpParams } from '@/services/api/v2/login-service'
import { toast } from 'react-toastify'



const INITIAL_DATA = {
    /* User */
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    senha: "",
    senhaConfirmacao: "",
    /* CoMpany */
    nomeFantasia: "",
    cnpj: "",
    telefoneComercial: "",
    isVendor: false,
    isMart: true,
    /* Address */
    address: "",
    city: { value: "", label: ""},
    uf: { value: "", label: ""},
    postalCode: ""
}

const AddressForm =  ({ inputsState, setLoading, errors, setErros}: any) =>{

    const [ ufs, setUfs ] = useState([])
    const [ cidades, setCidades ] = useState([])
    const [ inputs, setInputs ] = inputsState;

      /* Load ufs */
    useEffect(()=>{
        setLoading(true);
        getUfs()
            .then((ufs)=>{
                setUfs(ufs.map((u:any)=>({value: u.sigla, label: u.nome, id: u.id })))
            })
            .finally(()=>setLoading(false))
    },[]) 

     /* Load cities */
    useEffect(()=>{
        if(!inputs["uf"].value || ufs.length == 0 ) return
        let uf: any =  ufs.find((_uf: any)=>(_uf.value == inputs["uf"].value));

        setLoading(true)
        getCitiesByUf(uf.id)
            .then( cidades => setCidades(cidades.map((u:any)=>({value: u.id, label: u.nome }))))
            .finally(()=>setLoading(false));
    
    },[ufs, inputs["uf"]])

    const handleInputs = (name: string, value: any) =>{
        let result_value = value;
        setInputs((prev: any)=>(
            {...prev, [name]: result_value}
        ))
        setErros((prev: any) =>(
            { ...prev, [name]: undefined }
        ))
    }

    const handleCepResult = (result: any) =>{
        const { ibge, logradouro, complemento, bairro, localidade, uf}  = result    
        setInputs((prev: any)=>(
            {
                ...prev,
                uf: { value: uf },
                city: {  value: ibge, label: localidade },
                address: `${logradouro} ${complemento}, ${bairro}`
            }
        ))  
    }

    return (
        <FormGrid columns={[12, 12, 12, 12, 12]}>

            <InputWrapper
                error={errors["postalCode"]}
                label="CEP">
                <CepInputControl
                    onChange={(k: string,p: string)=>{
                        if(k == "INPUT")
                            handleInputs('postalCode', p)
                        else    
                            handleCepResult(p)
                    }}
                    value={inputs['postalCode']}
                />
            </InputWrapper>

            <SelectBox
                error={errors["uf"]}
                options={ufs}
                disabled={ufs.length == 0 ? true : false}
                value={inputs["uf"].value}
                onChange={handleInputs}
                label={"UF *"} 
                name={"uf"}/>

            <SelectBox
                error={errors["city"]}
                options={cidades}
                value={inputs["city"].value}
                disabled={cidades.length == 0 ? true : false}
                onChange={handleInputs}
                label={"Cidade *"} 
                name={"city"} />

            <TextInput
                error={errors["address"]}
                type="textarea"
                value={inputs["address"]}
                onChange={handleInputs}
                label={"Endereço *"} 
                name={"address"} />
            
        </FormGrid>
    )
}

const UserForm =  ({ inputsState, setLoading, errors, setErros }: any) =>{

    const [ inputs, setInputs ] = inputsState;

    const handleInputs = (name: string, value: any) =>{

        let result_value = value;
        setErros((prev: any) =>(
            { ...prev, [name]: undefined }
        ))
        switch(name){
            case "cpf":
                result_value = cpfMask(value) 
            break;
            case "telefone":
                result_value = phoneMask(value);
            break;
            case "senhaConfirmacao":
                if(value != inputs['senha']){
                    setErros((prev: any)=>{
                        return ({ 
                            ...prev,
                            senhaConfirmacao: "Senhas não batem!"
                        })
                    })
                }
            break;
        }
        setInputs((prev: any)=>(
            {...prev, [name]: result_value}
        ))
  
    }

    return (
        <FormGrid columns={[12, 6, 6, 12 ]}>
            <TextInput
                error={errors["nome"]}
                value={inputs["nome"]}
                onChange={handleInputs}
                label={"Nome do responsável *"} 
                name={"nome"} />

            <TextInput
                error={errors["cpf"]}
                value={inputs["cpf"]}
                onChange={handleInputs}
                label={"CPF *"} 
                name={"cpf"} />

            <TextInput
                error={errors["telefone"]}
                value={inputs["telefone"]}
                onChange={handleInputs}
                label={"Telefone *"} 
                name={"telefone"} />

            <TextInput
                error={errors["email"]}
                value={inputs["email"]}
                onChange={handleInputs}
                label={"Email *"} 
                name={"email"} />

            <TextInput
                type="password"
                error={errors["senha"]}
                value={inputs["senha"]}
                onChange={handleInputs}
                label={"Senha *"} 
                name={"senha"} />

            <TextInput
                type="password"
                error={errors["senhaConfirmacao"]}
                value={inputs["senhaConfirmacao"]}
                onChange={handleInputs}
                label={"Confirme a senha *"} 
                name={"senhaConfirmacao"} />

        </FormGrid>
    )
}

const CompanyForm =  ({ inputsState, setLoading, errors, setErros }: any) =>{

    const [ inputs, setInputs ] = inputsState;

    const handleInputs = (name: string, value: any) =>{
        let result_value = value;
        switch(name){
            case "cnpj":
                result_value = cnpjMask(value) 
            break;
            case "telefoneComercial":
                result_value = phoneMask(value);
            break;
        }
        setInputs((prev: any)=>(
            {...prev, [name]: result_value}
        ))
        setErros((prev: any) =>(
            { ...prev, [name]: undefined }
        ))
    }

    return (
        <FormGrid columns={[12, 12, 12, 6,6]}>
            <TextInput
                error={errors["nomeFantasia"]}
                value={inputs["nomeFantasia"]}
                onChange={handleInputs}
                label={"Nome do estabelecimento *"} 
                name={"nomeFantasia"} />
            
            <TextInput
                error={errors["cnpj"]}
                value={inputs["cnpj"]}
                onChange={handleInputs}
                label={"CNPJ *"} 
                name={"cnpj"} />

            <TextInput
                error={errors["telefoneComercial"]}
                value={inputs["telefoneComercial"]}
                onChange={handleInputs}
                label={"Telefone"} 
                name={"telefoneComercial"} />
                
            <InputWrapper 
                label='Quero Vender'>
                <SwitchButton 
                    name="isVendor"
                    value={inputs.isVendor}
                    onChange={handleInputs}/>
            </InputWrapper>

            <InputWrapper 
                label='Quero comprar'>
                <SwitchButton 
                    name="isMart"
                    value={inputs.isMart}
                    onChange={handleInputs}/>
            </InputWrapper>
            
        </FormGrid>
    )
}

const pages = [ 
   
    { 
        title: "Responsavel", 
        element: UserForm
    },
    { 
        title: "Companhia",
        element: CompanyForm
    },
    { 
        title: "Endereço", 
        element: AddressForm
    }
];

export const CadastroCarousel: React.FunctionComponent<any>  = ({setLoading}: {setLoading: Function}) =>{
    const history = useHistory();
    const context = useContext(GlobalContext)
    const inputsState = useState(INITIAL_DATA);
    const [ errors, setErros ] = useState({})
    const [ pageIndex, setPageIndex ] = useState(0);
    const currentPage = useMemo(()=> ({ ...pages[pageIndex] }) ,[pageIndex])
    const [ toSubmit, setToSubmit ] = useState(false)
    
    useEffect(()=>{
        if(toSubmit == true){
            submit();
            setToSubmit(false)
        }
    },[toSubmit])

    const submit = async () =>{
        
        var errors: any = [];
        let index= 0;

        setErros({})

        await Promise.all([ 
            new UserDto(inputsState[0]), 
            new CompanyDto(inputsState[0]),
            new AddressDto({ 
                ...inputsState[0], 
                uf: inputsState[0].uf.value,
                city: inputsState[0].city.value,
            })

        ].map( async (dto: any, i: number)=>{
            return handleValidate(dto)
                .then((errs: any)=>{ 
                    if(errs){
                        errors = { ...errors, ...errs};
                        index = i;
                    }
                })
        }))
        if(Object.keys(errors).length > 0){
            setErros(errors);
            setPageIndex(index)
            return;
        } 
        const{ city, uf, ...rest } = inputsState[0];

        const params: SignUpParams = {
            ...rest,
            uf: uf.value,
            ibge: Number(city.value),
            city: city.label,
        }

        setLoading(true);
        toast.promise(
            loginServicesV2.signup(params)
            .then(()=>{
                history.push("/login?v=signin");   
            })
            .finally(()=>{
                setLoading(false)
            })
            ,{
                pending: 'Enviando...',
                success: 'Cadastro efetuado com successo  Bem Vindo a UNA Compras',
                error: {
                    render({data}){
                        console.log("erro aqui", data)
                        if(data.params)
                            setErros(data.params);
                        return data.message
                    }
                },
            }
        )
    }
    
    const renderPages = ()=>{
        const handleChange = (k: string, p?: any) => {
            switch(k){
                case "PREV":
                    setPageIndex(prev=>prev-1);
                    context.app.current?.scrollTo({ top: 0, behavior: 'auto'}); 
                break;
                case "NEXT":
                    if(pageIndex + 1 == pages.length){
                        setToSubmit(true);
                    }else{
                        context.app.current?.scrollTo({ top: 0, behavior: 'auto'}); 
                        setPageIndex(prev=>prev+1)
                    }
                break;
            }
        }

        return (
            <CarouselFrame onChange={handleChange} index={pageIndex} >
               <currentPage.element inputsState={inputsState} errors={errors} setErros={setErros} setLoading={setLoading} />
            </CarouselFrame>
        )
    }
    
    return (
        <div className="una-cadastro-carousel">
            <header> 
                <ProgressBar total={pages.length} index={pageIndex}/>
            </header>
            <main>
                { renderPages() }
            </main>
        </div>
    )
}

export default CadastroCarousel
