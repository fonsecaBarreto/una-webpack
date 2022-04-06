import React, { useEffect, useState } from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import "./style.css"
import { UseFileInput } from "@/react-apps/components/FileInputs/main"
import LoadingSvg from "@/public/assets/images/round-loading.svg"
import { BsCloudUploadFill } from 'react-icons/bs'
import { filesService } from "@/services/api/files-service"
import { mediaPlayListService } from '@/services/api/media-playlist'
import UseSearchAdapter from '../../SearchAdapter'
export const MediaPlayListItem = ({children, onClick}:any) => {

    return (
    <div className="media-playlist-item" onClick={onClick}>
        {children}  
    </div>)
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
             <button className='img-tem-exclude-button'> x</button>
        </MediaPlayListItem>
    )
}

export const SEARCH_HEADER= { playlist_id: "string" };

export const MediaPlayListModal = () => {

    const [ filesToUpload, setFilesToUpload] = useState([])
    const [ images, setImages ] = useState<any>([])
    const { parsed: parsedQueries} = UseSearchAdapter({search: SEARCH_HEADER})
    useEffect(()=>{
        if(filesToUpload.length ==0 ) return;
        console.log("testnado aqui", filesToUpload)
        filesService.uploadUserImage(filesToUpload,"product").then(r=>{
            setImages((prev:any) => ([ ...prev, ...r]));
            setFilesToUpload([]);
        })
    },[filesToUpload])


    const getUrl = (image: any) =>{
        const src= image.name + "/" + image.src[0].width+".jpeg"
        return filesService.get_url(src)
    }

    const submit = async () => {
        const result = await mediaPlayListService.save(images.map((m: any)=>m.name))
        console.log("resutlado", result)
    }

    return (
        <div className='media-playlist-modal'> 
            <span> Testando aqui  {/* { JSON.stringify(parsedQueries) } */}</span>
            <nav>
                <div>
                    <AddItem onChange={setFilesToUpload}></AddItem>
                    {
                        filesToUpload.map((f:any, i : number)=>{
                            return (<ProvItem key={i} ></ProvItem>)
                        })
                    }
                    {
                        images.map((f:any, i : number)=>{
                            return (
                                <ImageItem  src={getUrl(f)} onClick={()=>{}} key={i}>
                                    <img src={getUrl(f)}></img>
                                </ImageItem>
                            )
                        })
                    }
                </div>
            </nav>
            <div>
                <button onClick={submit}> Salvar Aqui </button>
            </div>
        </div>
    )
}

export default MediaPlayListModal