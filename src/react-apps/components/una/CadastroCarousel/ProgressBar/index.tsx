import React from 'react'
import CarouselFrame from '../CarouselFrame'
import './style.css'

export namespace CarouselProgressBar {
    export type Params = {
        pageIndex: number,
        frames: CarouselFrame.Frame[]
    }
}

export const CarouselProgressBar: React.FunctionComponent<any> = ({ pageIndex, frames }) =>{
    return   (
        <div className="una-carousel-pg-frame-container">
            <ul>
                { frames.map((frame: CarouselFrame.Frame, i:number)=>(
                    <li key={i} className={`${ (pageIndex == i ) ?  'selected' : ''}`} >{i+1}</li>
                ))} 
            </ul>
        </div>
    )
}

export default CarouselProgressBar