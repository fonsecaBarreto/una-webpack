import React, { ReactNode, useEffect, useMemo, useState } from 'react'
import './style.css'

export type CarouselFrameProps = {
    index: number
    title?:string,
    children: ReactNode,
    onChange: (k:string, p?:any) => void
}

export const CarouselFrame: React.FunctionComponent<CarouselFrameProps> =  (props) =>{

    const { title, children, index, onChange } = props

    const renderMain = useMemo(()=>( <>{children}</> ),[ children ]);

    const renderFoot = useMemo(()=>{

        const handleNext = async () =>{
            onChange("NEXT");
        }
    
        const handlePrev = () =>{
            onChange("PREV");
        }

        return (
            <>
                <section>
                    <button 
                        disabled={index == 0}
                        className={"una-cadastro-carousel-btn prev-btn"} 
                        onClick={handlePrev}>
                        Anterior
                    </button>
                </section>
                <section>
                    
                </section>
                <section>
                    <button 
                        className="una-cadastro-carousel-btn next-btn" 
                        onClick={handleNext}>
                        Proximo
                    </button>  
                </section>
            </>
        )
    },[ frames, index ])

    return (

        <div className={`una-cadastro-carousel-frame`}>
            <main>
                {renderMain}
            </main>
            <footer>
                { renderFoot }
            </footer>  
        </div>
    )
}

export default CarouselFrame