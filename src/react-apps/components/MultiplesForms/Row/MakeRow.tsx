import React, { ReactNode, useEffect } from 'react'
import './style.css'

export const MakeRow = ({ columns, children, isHeader=false, freeze=false }: { isHeader?: boolean, columns: number, children: any, freeze?: boolean }) =>{
    return (
        <div className={`mform-row ${isHeader ? 'mform-header' : '' } ${freeze? "freeze" : ""}`}>
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