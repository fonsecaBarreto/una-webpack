
import LoadingComponent from '@/react-apps/components/una/Loading'
import React, { ReactNode  } from 'react'
import './style.css'

export namespace ContentGrid {
    export type Params = { 
        children: ReactNode ,
        loading?: boolean
    }
}

export const ContentGrid: React.FunctionComponent<ContentGrid.Params> = ({ children, loading=false }) =>{
    return (
        <div id="departamento-content-grid">
            {
                loading ? 
                [...Array(2)].map((x,i) =>(
                    <section className={`${loading ? "una-gradiente-loading" : ""}`}>  </section> 
                ))
                :
                React.Children.map(children, (x,i) =>(
                    <section> {x} </section> 
                ))
            }       
        </div>
    )
}

export default ContentGrid