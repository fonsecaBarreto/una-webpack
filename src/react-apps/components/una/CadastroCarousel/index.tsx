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
import { validate } from 'class-validator';
import { CompanyDto } from './dtos/CompanyDto'
/* services */
import {  getCitiesByUf, getUfs } from '@/services/ibge'
import { loginServices } from "@/services/api/login-service"
import { handleValidate } from './vendor/Validator'
import { UserDto } from './dtos/UserDto'
import { AddressDto } from './dtos/AddressDto'

const INITIAL_DATA = {
    /* User */
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    /* CoMpany */
    nomeFantasia: "",
    cnpj: "",
    telefoneComercial: "",
    isVendor: false,
    isMart: false,
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
        switch(name){
            case "cpf":
                result_value = cpfMask(value) 
            break;
            case "telefone":
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
        
        /* Actualy submite here */

    }
    
    const renderPages = ()=>{
        const handleChange = (k: string, p?: any) => {
            switch(k){
                case "PREV":
                    setPageIndex(prev=>prev-1)
                break;
                case "NEXT":
                    if(pageIndex + 1 == pages.length){
                        setToSubmit(true);
                    }else{
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

   /*  
        useEffect(()=>{
            if(forceIndex == -1) return;
            setPageIndex(forceIndex);
        },[forceIndex])
    */
    /* useEffect(()=>{
        let uf = enderecoState.data.get["uf"];
        if(uf =="") return;
        enderecoState.loading.set(true);
        getCitiesByUf(uf.value).then( cidades => setCidades(cidades.map((u:any)=>({value: u.id, label: u.nome})))).finally(()=>enderecoState.loading.set(false))
   
    },[enderecoState.data.get["uf"]]) */
/* 
    const validateFields = async (schema: ValidationSchema, data: any, setErrors: Function) =>{
        const errors = await validator.validate(schema, data)
        if(errors) { setErrors(errors); return -1; }
        setErrors({}); return 1;
    } */

    /*   
    const submit = async () =>{

        return alert("Submetido");

        // Validar Formulario de endereço
      var enderecosData = { 
            ...enderecoState.data.get, 
            uf: Number(enderecoState.data.get["uf"].value ),
            ibge: Number(enderecoState.data.get["cidade"].value),
            cidade: enderecoState.data.get["cidade"].label,
        }
        var r = await validateFields( CadastroEndereco_schema, enderecosData, enderecoState.errors.set);
        if(r == -1) return

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
            context.dialog.push(MakeNotification(()=>-1,[ 
                "Bem Vindo a UNA Compras",
                "Cadastro efetuado com successo!", 
                "Obrigado pela confiança, entraremos em contato em breve!"], "Sucesso!", NotificationType.SUCCESS));
            history.push("/login?v=signin");
        }catch(err:any){
            context.dialog.push(MakeNotification(()=>-1,[ err?.message ], "Algo Errado", NotificationType.FAILURE))
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
    */

