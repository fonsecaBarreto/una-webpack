import React, { ReactNode, useEffect } from 'react'
import './style.css'

export const MakeRow = ({ columns, children, isHeader=false }: { isHeader?: boolean, columns: number, children: any }) =>{
    return (
        <div className={`mform-row ${isHeader ? 'mform-header' : '' }`}>
            { 
                React.Children.map(children, (x: ReactNode,i) =>(
                    <section key={i} style={ i != 1 ? {} : { gridTemplateColumns: `repeat(${columns * 3}, 1fr)` } }> 
                        {x} 
                    </section>
                ))
            }         
        </div>
    )
}

export default MakeRow