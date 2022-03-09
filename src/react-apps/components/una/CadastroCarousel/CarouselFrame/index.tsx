import React, { ReactNode, useEffect, useState } from 'react'
import './style.css'

import ProgressBar from '../ProgressBar'
import { nextTick } from 'process'

export namespace CarouselFrame {

    export type Frame = {
        title?:string,
        content: ReactNode,
        hideButtons?:boolean,
        next: () => 1 | -1,
        prev: () => 1 | -1,
        nextLabel?: string
    }
    
    export type Params = {
        frames: Frame[], 
        loading: boolean,
        forceIndex?: number
    }
}

export const CarouselFrame: React.FunctionComponent<any> =  ({ loading, frames, forceIndex }) =>{

    const [ pageIndex, setPageIndex ] = useState(2); // 0
    useEffect(()=>{
        if(forceIndex == -1) return;
        setPageIndex(forceIndex)},[forceIndex])

    const handleNext = async () =>{
        let frame = frames[pageIndex]
        const n = frame.next ? await frame.next() : 1
        if(n == 1){
            setPageIndex(pageIndex + 1 )
        }
    }

    const handlePrev = () =>{
        setPageIndex(pageIndex - 1 )
    }

    return (

        <div className={`una-cadastro-carousel-frame ${loading? 'loading' : ''}`}>
            <section>
                <ProgressBar frames={frames} pageIndex={pageIndex}></ProgressBar> 
                <h2> {(frames[pageIndex].title)} </h2>
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
                        <button className="una-cadastro-carousel-btn next-btn" onClick={handleNext}>
                            { frames[pageIndex]?.nextLabel || 'Proximo'} 
                        </button>
                    </React.Fragment>
                }
            </section>  
        </div>
    )
}

export default CarouselFrame