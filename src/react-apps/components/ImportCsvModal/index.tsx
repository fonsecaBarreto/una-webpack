import './style.css'
import React, { useEffect, useState } from 'react'
import UploadFrame from './UploadFrame'

export namespace ImportCsvModal {
     export type Params = {
          onAction: (data: any) => void,
          headers: string[]
     }
}

const ImportCsvModal: React.FunctionComponent<ImportCsvModal.Params> = ({ headers, onAction}) =>{

     const [ freeze, setFreeze ] = useState(false)
     const [ object_data, setObject_data ]= useState<any>(null) 

     useEffect(()=>{
          if(object_data){ onAction(object_data); } 
     },[object_data])
   
     return (
          <div className="import-csv-modal">
               <section>
                   <h2> Upload arquivo .CSV Para Fazer inclusão dos produtos </h2> 
                   { freeze && "LOADING..."}
               </section>
                <section>
                    <UploadFrame headers={headers} toFreeze={() => setFreeze(!freeze)} onResult={setObject_data}></UploadFrame> 
               </section> 
          </div>
     )
}


export default ImportCsvModal