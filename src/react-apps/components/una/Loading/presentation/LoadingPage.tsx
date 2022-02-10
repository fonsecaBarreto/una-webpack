import React from 'react'
import './style.css'
import LoadingComponent from '../'

export const LoadingPage: React.FunctionComponent = () =>{
    return (
        <div className={`una-default-loading-page`}>
            <LoadingComponent/>
        </div>
    )
}

export default LoadingPage