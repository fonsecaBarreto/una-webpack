import React, { useRef } from 'react'
import Routes from './routes'
import './style.css'

export const MyApplication = () =>{
    const appRef = useRef<HTMLHeadingElement>(null)
    return (
        <div id="App" ref={appRef} > 
            <Routes></Routes> 
        </div>
    )
}

export default MyApplication