import React, { useState } from 'react'
import './style.css'
import UploadFrame from './Upload-frame'
import TableFrame from './Table-frame'

const ImportCsvModal = ({}) =>{

    const [ freeze, setFreeze ] = useState(false)
    const [ object_data, setObject_data ]= useState<any>(null)
   
     return (
          <div className="import-csv-modal">
               <section>
                   <h2> Upload arquivo .CSV Para Fazer inclusão dos produtos </h2> 
                   { freeze && "LOADING..."}
               </section>
                <section>
                    { !object_data ? 
                         <UploadFrame toFreeze={() => setFreeze(!freeze)} onResult={setObject_data}></UploadFrame>
                         : 
                        <TableFrame dto={object_data}></TableFrame>
                    }
             
               </section> 
          </div>
     )
}


export default ImportCsvModal