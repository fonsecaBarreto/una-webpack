import React, { FunctionComponent, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import './styles.css'

export type FantasticRootModalProps = {
  show?: boolean, 
  children: any
}

export const FantasticRootModal:React.FunctionComponent<FantasticRootModalProps> = ({ children, show=true }) =>{
  const [ isClient, setIsClient ]= useState(false)

  useEffect(()=>{
    setIsClient(true)
  },[])
  const ModalWrapper = () => (
    <div className={`fantastic-root-modal-container ${ show ? "show": ""}`}>
        { children }
    </div>
  )
  if(!isClient) return <></>
  return ReactDOM.createPortal(
    <ModalWrapper/>,
    document.getElementById('modal-root') as HTMLElement
  )
}

export default FantasticRootModal