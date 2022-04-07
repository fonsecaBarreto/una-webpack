import React, { useEffect, useState } from 'react'
import "./style.css"
import { filesService } from "@/services/api/files-service"
import { mediaPlayListService } from '@/services/api/media-playlist'
import { AddItem, ImageItem, ProvItem } from "./Item"

export namespace MediaPlayListModal {
    export type Params = {
        playlist_id?: string 
    }
}

export const MediaPlayListModal: React.FunctionComponent<MediaPlayListModal.Params> = ({playlist_id}) => {

    const [ filesToUpload, setFilesToUpload] = useState([])
    const [ images, setImages ] = useState<any>([])

    useEffect(() => {
        if(!playlist_id) return;
        mediaPlayListService.find(playlist_id).then(r=>{ setImages(r.images)})
    }, [ playlist_id])

    useEffect(()=>{
        if(filesToUpload.length ==0 ) return;
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
        const result = await mediaPlayListService.save(images.map((m: any)=>m.name), playlist_id)
        console.log("resutlado", result)
    }

    return (
        <div className='media-playlist-modal'> 
            <nav>
                <div>
                    <AddItem onChange={setFilesToUpload}></AddItem>
                    {   
                        filesToUpload.map((f:any, i : number)=>  (<ProvItem key={i} ></ProvItem>))}
                    {
                        images.map((f:any, i : number)=>(
                            <ImageItem  src={getUrl(f)} onClick={()=>{}} key={i}>
                                <img src={getUrl(f)}></img>
                            </ImageItem>
                        ))
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