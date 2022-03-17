import { CompaniesState, setCompanhias } from '@/react-apps/store/reducers/companies';
import { companhiasServices } from '@/services/api/companhias-service';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export const CompanyListState = () =>{

    const dispatch = useDispatch();
    const listData: any = useSelector<CompaniesState>((state: any)=>state.companies);

    useEffect(()=>{ if(listData.sync == 0 ){ handleLoad({}) } },[]) 
    
    const handleLoad= (filters: any) =>{
        var { ativo=[], v="" } =filters
        ativo = ativo?.length == 0 ? "" : ativo[0].value 
        companhiasServices.list({ ativo, v }).then(resp => { dispatch(setCompanhias(resp, false))})
    }

    return ({ listData, handleLoad })
}


export default CompanyListState

