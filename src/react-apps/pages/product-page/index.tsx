import React, { useContext, useDebugValue, useEffect, useState } from 'react'
import "./style.css"
import GlobalContext from  "@/react-apps/apps/main/global-components-context"
import { MakeDialogConfig, MakeOptions }  from 'fck-react-dialog'
import { useDispatch, useSelector } from 'react-redux'
import { CompaniesState, setCompanhias } from '@/react-apps/store/reducers/companies'
import UseSearchAdapter from '@/react-apps/components/SearchAdapter'
import { companhiasServices } from '@/services/api/companhias-service'
import GaleryContainer from './GaleryContainer'

//export const SEARCH_HEADER= { status:"array" };

export const ProductPage: React.FunctionComponent<any> = ({location, history}) => {

    const dispatch = useDispatch()
    const context = useContext(GlobalContext)
    const { parsed: parsedSearch, parsedParam, pushToHistory } = UseSearchAdapter({ param:"ean" })

    useEffect(()=>{ if(parsedSearch){ handleLoad()} },[parsedParam])

    const handleLoad= () => { /* companhiasServices.list({ ...parsedSearch, ...parsedParam }).then( r => dispatch(setCompanhias(r, false))) */ }

    /* const handleActions = (key: any, payload: any) =>{
      if(key === "options"){
        context.dialog.push(MakeOptions((n)=>{ 
          switch(n){
            case 0:  pushToHistory({value: payload}, "company_id"); break;
            case 1:  history.push(`/perfil/${payload}`); break; 
          }
          return -1;
        }, [ {label: "Visualizar"}, {label: "Abrir"},
        ]))
      }
      if(key === "p") {
        pushToHistory(payload+"", 'p')
      }
    } */

    return (
        <div id="product-page">
          <div className='app-container'>
              <div className='prouct-page-container'>
                <section>
                  Aqui o breand crumbs
                </section>

                <section>
                    <GaleryContainer/>
                </section>

                <section>
                  <div>
                    <span>Especiicação</span>
                    <span>Marcas</span>
                    <div>
                      <button> Comprar </button>
                    </div>
                  </div>
                </section>
                <section>
                   Descrição do item aqui
                  </section>
              </div>
            </div> 
        </div>
    )
}

export default ProductPage