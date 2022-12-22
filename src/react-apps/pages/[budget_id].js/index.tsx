import React, { useEffect, useMemo, useState } from 'react';
import "./style.css"
import { useSelector } from 'react-redux';
import GeneralBreadCrumbs from '@/react-apps/layouts/components/GeneralBreadCrumbs';
import { useParams } from 'react-router-dom';
import { budgetServices } from '@/services/api/budget-service';
import CompanyHeaderView from '../components/CompanyHeaderView';
import BudgetContent from './Content';

export const Cotacao: React.FunctionComponent<any> = ({history}) =>{
    const { user }:any = useSelector<any>(state=> state.main)
    const [ isLoading, setIsLoading ] = useState(true)
    const [ budget, setBudget ] = useState(null)
    const { budget_id }: any = useParams();


    useEffect(()=>{ if(budget_id){ handleLoad()} },[budget_id])
 
    const handleLoad= () => {
        setIsLoading(true)
        setBudget(null)
        budgetServices.find(budget_id)
            .then(setBudget) 
            .finally(()=>setIsLoading(false))
    }

    const handleContentChange = () =>{

    }


    return (
        <>
        {
            (isLoading || !budget )? <> Carregando... </>
            :
            <div id="cotacoes-page">
                <header className='app-container'>
                    <GeneralBreadCrumbs data={[
                        { label: "Meu histórico de Cotações", value: "/cotacoes"}, 
                        { label: `Cotação: N${budget_id}`, value: `/cotacoes/${budget_id}`}
                    ]}/>

                    <CompanyHeaderView company={user.company} user_name={user.nome} label={`Cotação de numero: ${budget_id}`} ></CompanyHeaderView>
                </header>
                <div className='app-container'>

                    <BudgetContent onChange={handleContentChange} data={budget}/>

                </div> 
            </div>
        }
        </>
    )
}

export default Cotacao

