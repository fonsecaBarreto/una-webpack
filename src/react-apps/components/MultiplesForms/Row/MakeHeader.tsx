import React from 'react'
import { IoIosAddCircleOutline } from 'react-icons/io'
import MakeRow from './MakeRow'

export const MakeHeader = ({headers, action}:{ headers:any[], action: any}) =>{
    return (
        <MakeRow columns={headers.length} isHeader>
            <React.Fragment>
                <button onClick={action}> <IoIosAddCircleOutline/> </button> 
            </React.Fragment>

            <React.Fragment>
                { 
                    headers.map((h: any, i: number)=> ( 
                        <div key={i} style={{gridColumn: `span ${h.columns ?? 3}`}} > 
                            { h.label }
                        </div> 
                    ))
                } 
            </React.Fragment>
            <React.Fragment>  </React.Fragment>
        </MakeRow>
    )
}

export default MakeHeader