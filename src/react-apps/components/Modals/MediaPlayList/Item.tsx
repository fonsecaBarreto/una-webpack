import React from 'react'
import { AiOutlineCloseCircle, AiOutlinePlusCircle } from 'react-icons/ai'
import { UseFileInput } from "@/react-apps/components/FileInputs/main"
import LoadingSvg from "@/public/assets/images/round-loading.svg"
import { BsCloudUploadFill } from 'react-icons/bs'

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
                <AiOutlinePlusCircle/>
            </div>
        </MediaPlayListItem>
    )
}

export const ProvItem = ({}:any) => {
    return ( 
        <MediaPlayListItem onClick={() =>{}}>
            <div> 
                <BsCloudUploadFill/>
            </div>
        </MediaPlayListItem>
    )
}

export const ImageItem = ({src}:any) => {
    return ( 
        <MediaPlayListItem onClick={() =>{}}>
             <img src={src}></img>
             <button className='img-tem-exclude-button'> 
                <AiOutlineCloseCircle></AiOutlineCloseCircle>
             </button>
        </MediaPlayListItem>
    )
}
