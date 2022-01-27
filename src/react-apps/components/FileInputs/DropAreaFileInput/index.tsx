import React from 'react'
import './style.css'
import UseFileInput from '../main'
import UploadImage from "@assets/images/file-upload/upload.png"
export namespace DropAreaFileInput  {

    export type Params = {
        onChange: Function,
        multiple?: boolean
    }

}


export const DropAreaFileInput: React.FunctionComponent<DropAreaFileInput.Params> = ({  onChange, multiple=false }) =>{

    const { Open } = UseFileInput({ options:{ multiple },callback: (files: File[]) =>{
        onChange(files)
    }})

    const getFileFromDrop = (ev: any) =>{
        ev.preventDefault()
        onChange(ev.dataTransfer.files )
    }
      
    const preventOver = (ev: any)=>{ ev.preventDefault() }

    return (
        <div className="drop-area-file-input">
            <div className={`drop-area-container`} onClick={Open} onDrop={getFileFromDrop} onDragOver={preventOver}>
                <img src={UploadImage}></img>
            </div>
        </div>
    )
}


export default DropAreaFileInput 