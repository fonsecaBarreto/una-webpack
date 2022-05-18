import React, { useEffect, useState } from 'react'
import './style.css'

import { mediaPlayListService } from '@/services/api/media-playlist'
import Carousel from './components/Carousel'
import Frame from './components/PhotoFrame'

export namespace GaleryContainer{
    export type Params ={
        images: string[]
    }
}

export const GaleryContainer: React.FunctionComponent<GaleryContainer.Params> = ({ images }) =>{

    const [ index, setIndex ] = useState(0);
    const [ currentImage, setCurrentImage ] = useState<any>(null);

    useEffect(()=>{
        const selected  = images[index] ?? null
        setCurrentImage(selected)
    },[index, images])

    return (
        <div className='una-galery-container'>
            <Carousel images={images} onClick={(i:number)=>setIndex(i)}></Carousel>
            <Frame img={currentImage}/> 
        </div>
    )

}

export default GaleryContainer