import React, {useContext, useEffect, useState} from 'react'
import './style.css'
import { UserFile } from '@/domain/views/User'
import { BiErrorCircle, BiCheckCircle } from 'react-icons/bi'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import InlineFileInput from "@/react-apps/components/FileInputs/InlineFileInput"
import { filesService } from '@/services/api/files-service'
export namespace UserFileItem {
    export type params = {
        entry: UserFile | null,
        label: string,
        name: string | any,
        placeHolder: string
    }
}
export const UserFileItem: React.FunctionComponent<UserFileItem.params> = ({entry, label="", name, placeHolder=""}) =>{

    var [ userFile, setUserFile ] = useState<UserFile | null>(null)
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
            const result = await filesService.uploadCompanyDocument(file, name)
            setUserFile(result)
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
                    { sending? <AiOutlineLoading3Quarters/> : userFile ? <BiCheckCircle/> : < BiErrorCircle/>}
                </div>
            </section>
            <section>

                <label>{label}</label>

                <div className='user-file-item-content'>

                    <div>
                        {
                            userFile ? <a target="_blank" href={`${filesService.get_url(userFile.name)}`}> {userFile.alt} </a> :
                            <InlineFileInput value={incomingFile} onChange={setIncomingFile}/>
                        }
                    </div>
                    <span className={`user-file-item-placeholder ${error ? "err" :  ""}`}>
                        {userFile ?  
                            `tipo: ${userFile.mimeType} - ${Number(userFile.size / 1024).toFixed(2)}KB`
                        :
                            error ? error.message : placeHolder
                        }
                    </span> 
                </div>
            </section>
            <section>
            </section>
        </div>
    )
}

export default UserFileItem