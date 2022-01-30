import './style.css'
import React, { useEffect, useState } from 'react'
import UploadFrame from './UploadFrame'
import UnaLoading from "@/react-apps/components/una/Loading"

export namespace ImportCsvModal {
     export type Params = {
          onAction: (data: any) => void,
          headers: string[]
     }
}

const ImportCsvModal: React.FunctionComponent<ImportCsvModal.Params> = ({ headers, onAction }) =>{

     const [ freeze, setFreeze ] = useState(false)
     
     const onBeforeResult = () => setFreeze(true)

     const onResult = (object_data: any) =>{
          setFreeze(false);
          onAction(object_data);
     }
   
     return (
          <div className="import-csv-modal">
                <section>
                    {   
                         freeze ? <UnaLoading fill/> :    
                         <React.Fragment>
                              <UploadFrame headers={headers} onBeforeResult={onBeforeResult} onResult={onResult}></UploadFrame> 
                         </React.Fragment>
                    }
               </section> 
          </div>
     )
}

export default ImportCsvModal

