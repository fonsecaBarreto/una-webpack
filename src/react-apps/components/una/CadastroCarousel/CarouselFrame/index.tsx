import React, { ReactNode, useEffect, useState } from 'react'
import './style.css'

import ProgressBar from '../ProgressBar'

export namespace CarouselFrame {

    export type Frame = {
        title?:string,
        content: ReactNode,
        hideButtons?:boolean,
        next: () => void,
        prev: () => void
    }
    
    export type Params = {
        frames: Frame[], 
        loading: boolean
    }
}

export const CarouselFrame: React.FunctionComponent<any> =  ({ loading, frames }) =>{

    const [ pageIndex, setPageIndex ] = useState(0)

    const handleNext = async () =>{
        setPageIndex(pageIndex + 1 )
    }

    const handlePrev = () =>{
        setPageIndex(pageIndex - 1 )
    }

    return (

        <div className={`una-cadastro-carousel-frame ${loading? 'loading' : ''}`}>
            <section>
                <ProgressBar frames={frames} pageIndex={pageIndex}></ProgressBar> 
                {
                    frames.map( (f: any, i:number)=>{
                    if(pageIndex === i && f.title) return (<h2 key={i}> {(f.title)} </h2>)
                })}
            </section>
            <section>
                {frames.map( (f: any, i:number)=>{
                    if(pageIndex === i ) return <div key={i}> {(f.content)} </div>
                })}
            </section>
            <section >
                {
                    frames[pageIndex]?.hideButtons === true ? <span></span>  :
                    <React.Fragment>
                        { (pageIndex > 0) && <button className="una-cadastro-carousel-btn prev-btn" onClick={handlePrev}>Anterior</button>}
                        { (pageIndex < frames.length - 1) && <button className="una-cadastro-carousel-btn next-btn" onClick={handleNext}>
                        { frames[pageIndex]?.nextLabel || 'Proximo'}
                        </button>}    
                    </React.Fragment>
                }
            </section>  
        </div>
    )
}

export default CarouselFrame