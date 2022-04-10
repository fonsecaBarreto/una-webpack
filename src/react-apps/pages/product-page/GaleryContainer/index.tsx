import React, { useEffect, useState } from 'react'
import './style.css'
import ImageNotFount from "@/public/assets/images/shopping-bag.jpg"
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md'
import { mediaPlayListService } from '@/services/api/media-playlist'
import { filesService } from '@/services/api/files-service'

export namespace GaleryContainer{
    export type Image= {
        name: string, 
        alt: string,
        ratio: number,
        src: { width: number, size: number, contentType: string }[]
        user_id: string,
    }
    
    export type Params ={
        imgs: Image[]
    }
}

export const PhotoFrame: React.FunctionComponent<any> = ({ img }) => {
    const [image, setimage ] = useState<{ url: string }>({ url: ImageNotFount });

    useEffect(()=>{
        setimage((prev:any)=>{
            if(!img) return { url: ImageNotFount};
            return { ...img, url:  filesService.get_public_images_url( img.name + "/" + img.src[2].width + ".jpeg") }
        })
    },[img])

    return (
        <section className="galery-container-photo-frame">
             <img src={image?.url}></img> 
        </section>
    )
} 

export const GaleryCarousel: React.FunctionComponent<any> = ({ imgs=[], onClick }) =>{
    const [offset, setOffset] = useState(0)

    const getUrl = (img: any) =>{
        return filesService.get_public_images_url( img.name + "/" + img.src[0].width + ".jpeg") 
    }

    const handleClick = (n: number) =>{
        setOffset( (prev: any)=>{
            let rp =(prev-n) 
            let r =  rp > 0 ? 0 : Math.abs(rp) > imgs.length-1 ? (imgs.length-1)*-1 : rp;
            return r;
        })
    }

    return (
        <section className='calery-container-carousel'>
            <button onClick={()=>handleClick(-1)}> <MdOutlineKeyboardArrowUp/> </button> 
            <nav>
                <ul style={{top: `${offset * 100}px`}}>
                {
                    imgs.length > 0 && imgs.map((img: any, i: number)=>(
                        <li key={i} onClick={()=>onClick(i)}>
                            <img src={ getUrl(img)}></img> 
                        </li>
                    ))
                }
                </ul>
            </nav>
         <button onClick={()=>handleClick(1)}> <MdOutlineKeyboardArrowDown/> </button>
        </section>
    )
}

export const GaleryContainer = ({ playlist_id }:any) =>{

    const [ images, setImages ] = useState([])
    const [ index, setIndex ] = useState(0);
    const [ currentImage, setCurrentImage ] = useState<GaleryContainer.Image | null>(null);

    useEffect(() => {
        if(!playlist_id) return;
        mediaPlayListService.find(playlist_id).then(r=>{ setImages(r.images)})
    }, [ playlist_id])

    useEffect(()=>{
        const selected  = images[index] ?? null
        setCurrentImage(selected)
    },[index, images])

    return (
        <div className='una-galery-container'>
            <GaleryCarousel imgs={images} onClick={(i:number)=>setIndex(i)}></GaleryCarousel>
            <PhotoFrame img={currentImage}/> 
        </div>
    )

}

export default GaleryContainer