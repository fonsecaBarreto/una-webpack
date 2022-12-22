
import React from 'react'
import './style.css'
import LoadingSvg from "@assets/images/round-loading.svg"

export const ModalUnaLoading: React.FunctionComponent<any> = () =>{
    return (
        <div className={`modal-una-loading `}>
            <div>
              <img src={LoadingSvg}></img>
            </div>
        </div>
    )
}

export default ModalUnaLoading