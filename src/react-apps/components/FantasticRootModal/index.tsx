import React, { FunctionComponent, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import './styles.css'

export type FantasticRootModalProps = {
  show?: boolean, 
  children: any
}

export const FantasticRootModal:React.FunctionComponent<FantasticRootModalProps> = ({ children, show=true }) =>{

  const ModalWrapper = () => (
    <div className={`fantastic-root-modal-container ${ show ? "show": ""}`}>
    {/*   <div className='overlap-content'> */}
        { children }
     {/*  </div> */}
    </div>
  )

  return ReactDOM.createPortal(
    <ModalWrapper/>,
    document.getElementById('modal-root') as HTMLElement
  )
}

export default FantasticRootModal