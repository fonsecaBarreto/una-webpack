import './style.css'
import React from 'react'
import Softpages, { PageWrapper } from "@/react-apps/components/una/SoftPages"
import { AddSuppliesTable, ListSupplies } from './content/Supplies'
import UseSearchAdapter from '@/react-apps/components/SearchAdapter'
import HeaderSwitch from './HeaderSwitch'

const HISTORY_HEADER = { search: [ "a", "o" ], params: [ "section" ] }

const actions = [
    { label: "Criar", name: "CREATE" }, { label: "Listar", name: "LIST" },
]

const ITEMS = [
    { 
        name: "fornecimento", label: "Fornecimento", 
        actions:[ { label: "Criar", name: "CREATE" }], 
    },
    { name: "apresentacoes", label: "Apresentações", actions },
    { name: "marcas", label: "Marcas", actions }
]

export const RegisterPage: React.FunctionComponent<any> = ({history}) =>{

    const searchAdapter = UseSearchAdapter({ header: HISTORY_HEADER })
    const { pushToHistory, parsedParams, parsedSearch } = searchAdapter 

    const handleChange = (value: string, payload: any) => {
        switch(value){
            case "SECTION":pushToHistory({ section: [payload]});break;
            case "ACTION":pushToHistory({ a: payload ? [payload] : null});break;
            case "OPTION": pushToHistory({ o: payload ? [payload] : null});break;
        } 
    } 

    return (
        <React.Fragment>
            { !parsedParams ? <span> Carregando... </span> :
            <div id="adm-register-page"> 
                <div className='adm-register-page-container app-container'>
                    <header>
                        <HeaderSwitch initials={["fornecimento", "CREATE"]} action={parsedSearch.a[0] ?? ""} 
                            section={parsedParams.section} items={ITEMS} onChange={handleChange}></HeaderSwitch> 
                    </header>
                    <section className='adm-register-page-content'>
                        <Softpages page={`${parsedParams["section"]}/${parsedSearch.a[0]}`} >
                            <PageWrapper name="fornecimento/LIST" title="Listar Fornecimento" >
                                <ListSupplies></ListSupplies>
                            </PageWrapper>  
                            <PageWrapper name="fornecimento/CREATE" title="Salvar Fornecimentos" >
                                <AddSuppliesTable onChange={handleChange}></AddSuppliesTable>
                            </PageWrapper>
                        </Softpages>
                    </section> 
                </div>  
            </div>}
        </React.Fragment>
    )
}

export default RegisterPage
