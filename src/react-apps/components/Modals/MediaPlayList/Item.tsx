import React from 'react'
import { UseFileInput } from "@/react-apps/components/FileInputs/main"

export const MediaPlayListItem = ({children, onClick}:any) => {
    return (
        <div className="media-playlist-item" onClick={onClick}>
            {children}  
        </div>
    )
}

export const AddItem = ({onChange}:any) => {

    const { Open } = UseFileInput({ options:{ multiple: true },callback: (files: File[]) =>{
        onChange(files)
    }})

    return ( 
        <MediaPlayListItem onClick={Open}>
            <div> 
                &#10010;
            </div>
        </MediaPlayListItem>
    )
}

export const ProvItem = ({}:any) => {
    return ( 
        <MediaPlayListItem onClick={() =>{}}>
            <div> 
                Upload
            </div>
        </MediaPlayListItem>
    )
}

export const ImageItem = ({src, onChange}:any) => {
    return ( 
        <MediaPlayListItem onClick={() =>onChange("REMOVE")}>
             <img src={src}></img>
             <button className='img-tem-exclude-button'> 
                &#10005;
             </button>
        </MediaPlayListItem>
    )
}
