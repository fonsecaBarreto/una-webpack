import React, { useEffect, useState, useContext } from 'react'
import './style.css'
import DropAreaFileInput from "@/react-apps/components/FileInputs/DropAreaFileInput"
import InlineFileInput from  "@/react-apps/components/FileInputs/InlineFileInput"
import globalContext from "@main/global-components-context"
import { MakeNotification, NotificationType } from 'fck-react-dialog'
import axios from 'axios'
export namespace UploadFrame {
     export type Params ={
          toFreeze: Function
     }
}

export const UploadFrame: React.FunctionComponent<UploadFrame.Params> = ({toFreeze}) =>{
     const context = useContext(globalContext)
     const [ file, setFile] = useState<File | null>(null)
    /*  const csvReader = new CsvReader() */

 /*     function getBase64(file: any) {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
          });
     } */


     const readfile = async () =>{
          toFreeze();

          
          /* fetch("http:localhost:8080/read",  {
               method: 'POST',
               mode: 'cors',
               cache: 'default'
             } )
          .then(r=>{
               console.log("aqui", r)
          }) */
         /*  if(buffer){ 
               const result = await csvReader.read(buffer,0)
               console.log("Resultado", result)
          } */

          toFreeze()
     }
     useEffect(()=>{
          if(!file) return
          console.log(file.type)
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