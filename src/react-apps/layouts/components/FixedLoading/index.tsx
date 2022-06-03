
import React from 'react'
import './style.css'
import LoadingSvg from "@assets/images/round-loading.svg"
import LogoImage from "@assets/images/logo-alt-2.svg"

export const FixedUnaLoading: React.FunctionComponent<any> = () =>{
    return (
        <div className={`fixed-una-loading `}>
            <div>
          {/*       <img src={LoadingSvg}></img> */}
                <img src={LogoImage}></img> 
            </div>
        </div>
    )
}

export default FixedUnaLoading