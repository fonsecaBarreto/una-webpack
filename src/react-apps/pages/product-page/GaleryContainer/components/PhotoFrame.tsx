import * as React from 'react';
import ImageNotFount from "@/public/assets/images/product/empty.svg"
import { filesService } from '@/services/api/files-service'

export const PhotoFrame: React.FunctionComponent<any> = ({ img }) => {
    const [image, setimage ] = React.useState<{ url: string }>({ url: ImageNotFount });

    React.useEffect(()=>{
        setimage((prev:any)=>{
            if(!img) return { url: ImageNotFount};
            return { ...img, url:  filesService.get_public_images_url( img + "/" + 560 + ".jpeg") }
        })
    },[img])

    return (
        <section className="galery-container-photo-frame">
             <img src={image?.url}></img> 
        </section>
    )
} 


export default PhotoFrame