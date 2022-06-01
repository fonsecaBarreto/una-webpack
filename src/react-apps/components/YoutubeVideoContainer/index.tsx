import React from  'react'
import './style.css'

export const VideosContainer = ({video_id}: { video_id: string}) =>{
    return (
        <div className='una-video-container'>
            <div className='una-video-content app-container'>
                <div className="video-responsive">
                   <iframe
                        width="853"
                        height="480"
                        src={`https://www.youtube.com/embed/${video_id}?enablejsapi=1
                        &origin=unacompras.com.br
                        &modestbranding=1
                        &rel=0
                        &showinfo=0
                        &controls=2
                        &color=white`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen={true}
                     /> 
                </div> 
            </div>
        </div>
    )
}

export default VideosContainer