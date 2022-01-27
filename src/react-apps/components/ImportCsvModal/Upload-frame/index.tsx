import React, { useEffect, useState, useContext } from 'react'
import './style.css'
import DropAreaFileInput from "@/react-apps/components/FileInputs/DropAreaFileInput"
import InlineFileInput from  "@/react-apps/components/FileInputs/InlineFileInput"
import globalContext from "@main/global-components-context"
import { MakeNotification, NotificationType } from 'fck-react-dialog'
import CsvReader from '@/vendors/CsvReader'

export namespace UploadFrame {
     export type Params ={
          toFreeze: Function,
          onResult: (json:object) => void
     }
}

export const UploadFrame: React.FunctionComponent<UploadFrame.Params> = ({toFreeze, onResult}) =>{
     const context = useContext(globalContext)
     const [ file, setFile] = useState<File | null>(null)

     const csvReader = new CsvReader({ headers:[ "ean", "ncm", "sku", "especificacao", "marca", "categoria", "apresentacao" ] }) 

     const readfile = async () =>{
          toFreeze()
          const result = await csvReader.execute(file)
          onResult(result)
          toFreeze()
     }

     useEffect(()=>{
          if(!file) return
          if(!["text/csv", "text/x-csv", "application/vnd.ms-excel", "text/plain"].includes(file.type)) {
               context.dialog.push(MakeNotification(()=>-1,["Somento arquivos .CSV permitido"], "Atenção", NotificationType.FAILURE))
               setFile(null)
          }
          readfile()
     },[file])

     return (
          <div className='upload-frame'>
               <InlineFileInput value={file} onChange={setFile} ></InlineFileInput>
               <DropAreaFileInput onChange={(files: File[])=>setFile(files[0])} ></DropAreaFileInput>
          </div>
     )
}


export default UploadFrame