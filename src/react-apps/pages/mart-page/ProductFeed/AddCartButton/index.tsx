import React from 'react'
import './style.css'

export namespace AddCartButton{
    export type Params = {
        value: number,
        onChange: () => void,

    }
}

export const ProductFeedCartButton = ({value =0, onChange}: any) => {
    return (
        <div className={`product-feed-cart-btn ${value == 0 ? "single" : ""}`}>
            <section>
                { value > 0 && <React.Fragment>
                    <button onClick={()=>onChange(-1)}>-</button>
                    <span> {value} </span>
                </React.Fragment>}
                <button onClick={()=>onChange(1)}>{"+"}</button>
            </section>
        </div>)
}



export default ProductFeedCartButton