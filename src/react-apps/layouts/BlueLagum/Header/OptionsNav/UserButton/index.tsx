import React from 'react'
import './style.css'
import { FaUserCircle } from "react-icons/fa"

export namespace UserButton {
  export type Params = {
    user: any,
    onClick: Function
  }
}

export const UserButton: React.FunctionComponent<any> = ({ user, onClick }) =>{
    return (
        <React.Fragment>
              <button className="una-header-user-button" onClick={onClick} >
                <FaUserCircle></FaUserCircle>
                <div >
                  { 
                    (user) ? 
                    <React.Fragment>
                        <span>{user.nome}</span> 
                        <span>{user?.roles[0]}</span> 
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <span>Cadastre-se</span> 
                        <span>Gratuitamente</span> 
                    </React.Fragment>
                  }
                </div>
              </button>
        </React.Fragment>
    )
}

export default UserButton