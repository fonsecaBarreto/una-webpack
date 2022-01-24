import React, { useEffect, useContext, useState } from 'react'
import './style.css'
import Item from "./Item"
import { CompanhiasService } from '@/services/api/companhias-service'

/* import { useDispatch, useSelector, useStore } from 'react-redux'
import GlobalContext from "@/react-apps/apps/main/global-components-context"
 */

const AdminsCompanhiasState = () =>{
  const [ companhias, setcompanhias ] = useState(null)
  useEffect(()=>{
    CompanhiasService.list({ p: 1, n: ""}).then(setcompanhias)
  })

  return {companhias}
}
export const ListCompanhiasPage = () => {
    const { companhias } = AdminsCompanhiasState()
    return (
        <div id="list-companhias-page">
          <ul>
           { 
              ( companhias!= null && companhias?.data?.companhias) && companhias?.data.companhias.map((c:any)=>{ 
                return (
                  <li><Item data={c}></Item></li>
                )
              }
            )} 
          </ul>
        </div>
    )
}

export default ListCompanhiasPage