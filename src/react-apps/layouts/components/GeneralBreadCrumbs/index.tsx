import React, { useEffect, useState } from 'react'
import './style.css'
import {Link} from 'react-router-dom'

const INITIAL_LABEL_VIEW = {
    value: "", label: ""
}

export type GeneralBreadCrumbsProps = {
    data: { value: string, label: string}[]
}
export const GeneralBreadCrumbs:React.FunctionComponent<GeneralBreadCrumbsProps> = ({data}) => {
    
    return (
        <nav className='general-page-bread-crumbs'> 
            <ul >
                <li> <Link to={`/`}> Inicio </Link> </li> 
                &#8250;
                { data?.length > 0 && data.map((d, i)=>{
                    return <>
                      <li> <Link to={`${d.value}`}>{d.label}</Link> </li> 
                      { ((i ) < data.length - 1 ) && <> &#8250; </>  }
                    </>
                })}
            </ul> 
        </nav>   
     
    )
}

export default GeneralBreadCrumbs