import React, { useState } from 'react'
import './style.css'

import DropAreaFileInput from "@/react-apps/components/FileInputs/DropAreaFileInput"
import InlineFileInput from  "@/react-apps/components/FileInputs/InlineFileInput"


export const UploadFrame = () =>{
     const [ file, setFile] = useState<File | null>(null)
     return (
          <div>
               <div> Primeira ente haver o extrator</div>
               <InlineFileInput value={file} onChange={setFile} ></InlineFileInput>
               <DropAreaFileInput onChange={(files: File[])=>setFile(files[0])} ></DropAreaFileInput>
          </div>
     )
}

const ImportCsvModal = ({}) =>{
    const [ index, setIndex ] = useState(0)
    const [ freeze, setFreeze ] = useState(false)
   
     return (
          <div className="import-csv-modal">
               <section>
                   <h2> Upload arquivo .CSV Para Fazer inclusão dos produtos </h2> 
               </section>
                <section>
                    { index == 0 ? 
                         <UploadFrame></UploadFrame>
                         : 
                        <span> Teste aqui</span>
                    }
             
               </section> 
          </div>
     )
}


export default ImportCsvModal