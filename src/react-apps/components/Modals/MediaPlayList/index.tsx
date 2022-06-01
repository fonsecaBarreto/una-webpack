import React, { useEffect, useRef, useState } from 'react'
import "./style.css"
import { filesService } from "@/services/api/files-service"
import { mediaPlayListService } from '@/services/api/media-playlist'
import { AddItem, ImageItem, ProvItem } from "./Item"
import { listenerCount } from 'process'

export namespace MediaPlayListModal {
    export type Params = {
        playlist_id: string,
        onData: any
    }
}

export const MediaPlayListModal: React.FunctionComponent<MediaPlayListModal.Params> = ({playlist_id, onData}) => {

    const [ filesToUpload, setFilesToUpload] = useState([])
    const [ images, setImages ] = useState<any>([])
    const imagesRef = useRef(false)

    useEffect(()=>{ submit() }, [ images ])

    useEffect(() => {
        if(!playlist_id) return;
        mediaPlayListService.find(playlist_id).then(r=>{ setImages(r.images)})
    }, [ playlist_id])

    useEffect(()=>{
        if(filesToUpload.length ==0 ) return;
        filesService.uploadUserImage(filesToUpload,"product")
        .then(r=> setImages((prev:any) => ([ ...prev, ...r])))
        .then(_=> setFilesToUpload([]))
    },[filesToUpload])

    const getUrl = (image: any) =>{
        const src= image.name + "/" + image.src[0].width + ".jpeg"
        return filesService.get_public_images_url(src);
    }

    const submit = async () => {
        if(imagesRef.current == false) return imagesRef.current = true;
        var result = await mediaPlayListService.save(images.map((m: any)=>m.name), playlist_id)
        onData(result)
    }

    const handleChange = (k: string, p: any) =>{
        switch(k){
            case "REMOVE":
                setImages((prev: any)=>{
                    let list = [ ...prev];
                    list.splice(p,1);
                    console.log("nova lsita")
                    return list
                })
            break;
        }
    }

    return (
        <div className='media-playlist-modal'> 
            <nav>
                <div>
                    <AddItem onChange={setFilesToUpload}></AddItem>
                    { filesToUpload.map((f:any, i : number)=>(<ProvItem key={i} ></ProvItem>))}
                    { images.map((f:any, i : number)=>( <ImageItem src={getUrl(f)} onChange={(k:string)=>handleChange(k,i)} key={i}/> )) }
                </div>
            </nav> 
        </div>
    )
}

export default MediaPlayListModal