import React, {useContext, useEffect, useState} from 'react'
import './style.css'
import { UserFile } from '@/domain/views/User'
import { filesService } from '@/services/api/files-service'
import InlineFileInput from "@/react-apps/components/FileInputs/InlineFileInput"

export namespace UserFileItem {
    export type params = {
        entry: string | null,
        label: string,
        company_id:string,
        name: string | any,
        placeHolder: string
    }
}
export const UserFileItem: React.FunctionComponent<UserFileItem.params> = ({company_id, entry, label="", name, placeHolder=""}) =>{

    var [ userFile, setUserFile ] = useState<string | null>(null)
    var [ incomingFile, setIncomingFile ] = useState(null)
    var [ sending, setSending ] = useState(true)
    var [ error, setError] = useState<any>(null)

    useEffect(()=>{
        setUserFile(entry);
        setSending(false);
    },[entry])
    
    useEffect(()=>{ sendFile(incomingFile);  },[incomingFile])
    
    const sendFile = async (file: File | any) =>{
        setError(null);
        if(!incomingFile) return;
        setSending(true);
        try{
            const result = await filesService.uploadCompanyDocument(file, company_id, name)
            setUserFile(result.name)
        } catch (err: any){
            if(err.name === "InvalidFilesError" && err.params){
                setError(err.params['document'][0])
            }
        } finally {
            setSending(false);
        }
    }

    return (
        <div className={`user-file-item ${sending? "sending" : ""}`}> 
            <section>
                <div className={`${userFile ? "success" :  "warning"}`}>
                    { sending ? <span>...</span> : userFile ? <span> &#10003; </span> :  <span>&#10006;</span>}
                </div>
            </section>
            <section>

                <label>{label}</label>

                <div className='user-file-item-content'>

                    <div>
                        {
                            userFile ? 
                                <a className='user-file-item-document' target="_blank" href={`${filesService.get_url(userFile)}`}>
                                   {userFile}
                                </a>
                            : <InlineFileInput value={incomingFile} onChange={setIncomingFile}/>
                        }
                    </div>
                    <span className={`user-file-item-placeholder ${error ? "err" :  ""}`}>
                        { (!userFile ) && (error ? error.message : placeHolder )}
                    </span> 

                </div>
            </section>
            <section>
            </section>
        </div>
    )
}

export default UserFileItem


/* ?  
    `${userFile.mimeType} - ${Number(userFile.size / 1024).toFixed(2)}KB`
:  */