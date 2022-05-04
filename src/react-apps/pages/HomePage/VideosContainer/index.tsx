import React from  'react'
import './style.css'
import teste from '@/public/assets/images/video-container.svg'
export const VideosContainer = () =>{
    return (
        <div className='una-video-container app-container' style={{backgroundImage: teste}}>
            <img className='una-v-c-bg-image' src={teste}></img>  
                <div className="video-responsive">
                   <iframe
                        width="853"
                        height="480"
                        src={`https://www.youtube.com/embed/${"rokGy0huYEA"}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Embedded youtube"
                    /> 
                </div> 

        </div>
    )
}

export default VideosContainer