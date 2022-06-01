import * as React from 'react';
import "./style.css"
import YoutubeAdapter from "@/react-apps/components/YoutubeVideoContainer"
export const Tutoriais = () => {
    return (
        <div id="tutoriais-page">
            <div className='app-container'>
                <nav>
                    <div>
                        <h4> Como realizar o cadastro: </h4>
                        <div>
                            <YoutubeAdapter video_id='Vh4C5k8fuvg'></YoutubeAdapter>
                        </div>
                    </div>

                    <div>
                        <h4> Como emitir certificado CCMEI: </h4>
                        <div>
                            <YoutubeAdapter video_id='zxPunv4pXnw'></YoutubeAdapter>
                        </div>
                    </div>
                </nav>
       

            </div>
        </div>
    )
}

export default Tutoriais