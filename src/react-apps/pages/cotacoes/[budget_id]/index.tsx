import React, { useEffect, useMemo, useState } from 'react';
import "./style.css"
import { useSelector } from 'react-redux';
import GeneralBreadCrumbs from '@/react-apps/layouts/components/GeneralBreadCrumbs';
import { useParams } from 'react-router-dom';
import { budgetServices } from '@/services/api/budget-service';
import CompanyHeaderView from '../components/CompanyHeaderView';
import BudgetContent, { BudgetFindView } from './Content';
import { decrypt } from '@/vendors/Cryptr';

import "../common-panel.css"

export const Cotacao: React.FunctionComponent<any> = ({history}) =>{
    const { user }:any = useSelector<any>(state=> state.main)
    const [ isLoading, setIsLoading ] = useState(true)
    const [ budget, setBudget ] = useState<BudgetFindView | null>(null)
    const { budget_id }: any = useParams();

    const decrypted_id = useMemo(()=>decrypt(budget_id+""),[budget_id])

    useEffect(()=>{ if(decrypted_id){ handleLoad()} },[decrypted_id])
 
    const handleLoad= () => {
        setIsLoading(true)
        setBudget(null)
        budgetServices.find(decrypted_id)
            .then((res)=>{
                if(!res){
                    history.push("/cotacoes")
                }
                setBudget(res);
            }) 
            .finally(()=>setIsLoading(false))
    }

    const handleContentChange = () =>{

    }


    return (
        <>
        {
            (isLoading || !budget )? <> Carregando... </>
            :
            <div id="cotacoes-page" >
                <div className='app-container'>
                    <header>
                        <GeneralBreadCrumbs data={[
                            { label: "Meu histórico de Cotações", value: "/cotacoes"}, 
                            { label: `Cotação: N${decrypted_id}`, value: `/cotacoes/${budget_id}`}
                        ]}/> 
                    </header>
                    <main className='budget-common-panel'>

                        <CompanyHeaderView 
                            company_name={budget?.company.label+""} 
                            user_name={budget?.user.label+""} 
                            label={`Cotação de numero: ${decrypted_id}`} />

                        <BudgetContent onChange={handleContentChange} data={budget}/>
                    </main> 
                </div>
            </div>
        }
        </>
    )
}

export default Cotacao

