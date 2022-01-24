import React, { useEffect, useState } from 'react'
import './style.css'
import MainContent from './MainContent'
import Considerations from './Consideration'
import StrictInfo from './StrictInfo'
export const LayoutFooter = (({}) => {
    return (
        <div id="primary-footer" >
            <MainContent></MainContent>
            <StrictInfo></StrictInfo>
            <Considerations></Considerations>
        </div>
    )
})

export default LayoutFooter