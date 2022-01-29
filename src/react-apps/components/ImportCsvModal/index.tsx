import React, { useEffect, useState } from 'react'
import './style.css'
import UploadFrame from './Upload-frame'
import TableFrame from './Table-frame'



export namespace ImportCsvModal {
     export type Params = {
          onData: (data: any) => void,
          onAction: (n:number) => void
     }
}

const ImportCsvModal: React.FunctionComponent<ImportCsvModal.Params> = ({onData, onAction}) =>{

    const [ freeze, setFreeze ] = useState(false)
    const [ object_data, setObject_data ]= useState<any>(null) 

    useEffect(()=>{
     if(object_data){
          onData(object_data)
          onAction(-1)
     }
    },[object_data])
   
     return (
          <div className="import-csv-modal">
               <section>
                   <h2> Upload arquivo .CSV Para Fazer inclusão dos produtos </h2> 
                   { freeze && "LOADING..."}
               </section>
                <section>
                    <UploadFrame toFreeze={() => setFreeze(!freeze)} onResult={setObject_data}></UploadFrame> 
               </section> 
          </div>
     )
}


export default ImportCsvModal