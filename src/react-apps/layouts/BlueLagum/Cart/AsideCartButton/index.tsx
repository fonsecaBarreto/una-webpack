import React from 'react'
import './style.css'

export namespace AsideCartButton{
    export type Params = {
        value: number,
        onChange: (n: number, c: string) => void
    }
}

export const AsideCartButton = ({value =0, onChange}: any) => {

    return (
        <div className={`aside-cart-btn`}>
            <section>
                <button onClick={()=>onChange(-1, 'PUSH')}>-</button>
                <input type="text" inputMode="numeric" value={value+""} onInput={(e:any)=>onChange(Number(e.target.value), 'OVERWRITE')}/>
                <button onClick={()=>onChange(1, 'PUSH')}>+</button>
            </section>
        </div>)
}



export default AsideCartButton