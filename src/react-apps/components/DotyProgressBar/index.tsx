import React from 'react'
import './style.css'

export namespace CarouselProgressBar {
    export type Params = {
        index: number,
        total: number,
        onChange: (key: string, payload: number )=>void
    }
}

export const CarouselProgressBar: React.FunctionComponent<any> = ({ index, total, onChange }) =>{
    return   (
        <div className="doty-progress-bar">
            <ul>
                { [ ...Array(total)].map((_: any, i:number)=>(
                    <li 
                        key={i} 
                        onClick={()=>onChange("INDEX", index)}
                        className={`${ (index >= i ) ?  'selected' : ''}`} >
                    </li>
                ))} 
            </ul>
        </div>
    )
}

export default CarouselProgressBar