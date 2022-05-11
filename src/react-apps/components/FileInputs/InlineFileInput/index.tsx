import React from 'react'
import './style.css'
import UseFileInput from '../main'

export namespace InlineFileInput  {

    export type Params = {
        value: File | null,
        onChange: Function
    }

}
const FileInput: React.FunctionComponent<InlineFileInput.Params> = ({ value, onChange }) => {

    const { Open } = UseFileInput({ options:{ multiple: false },callback: (files: File[]) =>{
        onChange(files[0])
    }})

    return (
        <div className="inline-file-input">
            <button onClick={Open}> selecionar </button>
            <span >  { value ? value.name : "Nenhum arquivo selecionado." } </span> 
            { value &&  <button className="app-file-input-close" onClick={()=>onChange(null)}> &#10005; </button>}
        </div>
        
    )
}


export default FileInput