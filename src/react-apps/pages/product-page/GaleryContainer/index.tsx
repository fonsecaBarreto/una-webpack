import React, { useEffect, useState } from 'react'
import './style.css'
import ImageNotFount from "@/public/assets/images/shopping-bag.jpg"
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md'
export namespace GaleryContainer{
    export type Image= {
        key: string
    }
    export type Params ={
        imgs: any[]
    }
}

export const PhotoFrame: React.FunctionComponent<any> = ({ entry }) => {
    const [image, setimage ] = useState<any>(null);
    useEffect(()=>{
        setimage((prev:any)=>{
            if(!entry?.key) return ImageNotFount;
            return entry.key
        })
    },[entry])
    return (
        <section className="galery-container-photo-frame">
             <img src={image}></img> 
        </section>
    )
} 

export const GaleryCarousel: React.FunctionComponent<any> = ({ imgs, onClick }) =>{
    const [offset, setOffset] = useState(0)

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
                        imgs.map((img: any, i: number)=>{
                            return ( 
                                <li onClick={()=>onClick(i)}>
                                     <img src={img.key}></img> 
                                </li>)
                        })
                    }
                </ul>
            </nav>
         <button onClick={()=>handleClick(1)}> <MdOutlineKeyboardArrowDown/> </button>
        </section>
    )
}

export const GaleryContainer = () =>{

    const photos = [
        {key: "nome_dafoto1"},
        {key: "nome_dafoto2"},
        {key: "nome_dafoto3"},
        {key: "nome_dafoto4"},
        {key: "nome_dafoto5"},
        {key: "nome_dafoto6"},
        {key: "nome_dafoto7"},
        {key: "nome_dafoto8"},
        {key: "nome_dafoto9"},
    ]

    const [ index, setIndex ] = useState(0);
    const [ currentImage, setCurrentImage ] = useState<GaleryContainer.Image | null>(null);

    useEffect(()=>{
        const selected  = photos[index] ?? null
        setCurrentImage(selected)
    },[index])

    return (
        <div className='una-galery-container'>
            <GaleryCarousel imgs={photos} onClick={(i:number)=>setIndex(i)}></GaleryCarousel>
            <PhotoFrame img={currentImage}>  </PhotoFrame> 
        </div>
    )

}

export default GaleryContainer