import React from  'react'
import './style.css'

export const VideosContainer = () =>{
    return (
        <div className='una-video-container'>
            <div className='una-video-content app-container'>
                <div className="video-responsive">
                   <iframe
                        width="853"
                        height="480"
                        src={`https://www.youtube.com/embed/${"HsLqAMpFZL0"}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Embedded youtube"/> 
                </div> 
            </div>
        </div>
    )
}

export default VideosContainer