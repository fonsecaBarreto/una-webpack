import * as React from 'react';
import { filesService } from '@/services/api/files-service'

export const GaleryCarousel: React.FunctionComponent<any> = ({ images=[], onClick }) =>{
    const [offset, setOffset] = React.useState(0)

    const getUrl = (img: any) =>{
        console.log(img)
        return filesService.get_public_images_url( img + "/" + 96 + ".jpeg") 
    }

    const handleClick = (n: number) =>{
        setOffset( (prev: any)=>{
            let rp =(prev-n) 
            let r =  rp > 0 ? 0 : Math.abs(rp) > images.length-1 ? (images.length-1)*-1 : rp;
            return r;
        })
    }

    return (
        <section className='calery-container-carousel'>
            <button onClick={()=>handleClick(-1)} > <span className="clcarrow-up"> &uarr;</span> </button> 
            <nav>
                <ul style={{top: `${offset * 100}px`}}>
                {
                    images.length > 0 && images.map((img: any, i: number)=>(
                        <li key={i} onClick={()=>onClick(i)}>
                            <img src={ getUrl(img)}></img> 
                        </li>
                    ))
                }
                </ul>
            </nav>
            <button onClick={()=>handleClick(1)} > <span className="clcarrow-down"> &darr;</span> </button>
        </section>
    )
}

export default GaleryCarousel