import React, { useEffect, useState } from 'react'
import { companhiasServices } from "@/services/api/companhias-service"

export const SuppliesCompaniesModal: React.FunctionComponent<any> = ({ onAction}) =>{

    const [ companies, setCompanies ] = useState<any>(null)
    const [ selectedCompany, setSelectedCompany ] = useState(null)

    useEffect(()=>{
        companhiasServices.list({}).then((r)=>setCompanies([{value:"", label: "Nenhum selecionado"}, ...(r.data.companies.map((c:any)=>{
            return ( { value: c.id, label: c.nomeFantasia})
        }))]))
    },[])

    return (
        <div>
            { !companies? "Carregando..." :
            <React.Fragment>
                <select onChange={(e:any) => setSelectedCompany(e.target.value)}>
                        {companies.map((p: any, i:number)=>{
                            return ( <option key={i} value={p.value}>{p.label}</option>)
                        })}
                 </select>
                 <button onClick={()=>onAction(selectedCompany ?? -1 )}> { selectedCompany ? "Pronto" : "Cancelar "} </button>
            </React.Fragment>
            }
        </div>
    )
}

export default SuppliesCompaniesModal