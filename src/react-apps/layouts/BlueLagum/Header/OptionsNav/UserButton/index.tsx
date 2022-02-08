import React from 'react'
import './style.css'
import { FaUserCircle } from "react-icons/fa"
import { IoMdArrowDropdown } from 'react-icons/io'



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
                { (user) && 
                  <div>
                    <span>{user.nome}</span> 
                    <span>{user?.roles[0]}</span> 
                  </div>
                }
                <FaUserCircle></FaUserCircle>
                <IoMdArrowDropdown></IoMdArrowDropdown>
              </button>
        </React.Fragment>
    )
}

export default UserButton