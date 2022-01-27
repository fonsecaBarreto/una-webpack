import React, { useState } from 'react'
import './style.css'
import UploadFrame from './Upload-frame'
import TableFrame from './Table-frame'

const ImportCsvModal = ({}) =>{
    const [ index, setIndex ] = useState(0)
    const [ freeze, setFreeze ] = useState(false)
   
     return (
          <div className="import-csv-modal">
               <section>
                   <h2> Upload arquivo .CSV Para Fazer inclusão dos produtos </h2> 
                   { freeze && "LOADING..."}
               </section>
                <section>
                    { index == 0 ? 
                         <UploadFrame toFreeze={() => setFreeze(!freeze)}></UploadFrame>
                         : 
                        <TableFrame></TableFrame>
                    }
             
               </section> 
          </div>
     )
}


export default ImportCsvModal