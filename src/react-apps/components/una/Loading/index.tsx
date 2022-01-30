import React from 'react'
import './style.css'
import LoadingSvg from "@/public/assets/images/round-loading.svg"

export const LoadingComponent: React.FunctionComponent<{fill?: boolean}> = ({fill = false}) =>{
    return (
        <div className={`una-default-loading ${fill ? "una-default-loading-fill" : ""}`}>
            <img src={LoadingSvg}></img>
        </div>
    )
}

export default LoadingComponent