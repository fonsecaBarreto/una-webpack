import React from 'react'
import './style.css'
import { FaUserCircle } from "react-icons/fa"
import { IoMdArrowDropdown } from 'react-icons/io'
export const UserButton: React.FunctionComponent<any> = ({onClick }) =>{
    return (
        <React.Fragment>
              <button className="una-header-user-button" onClick={onClick} >
                <FaUserCircle></FaUserCircle>
                <IoMdArrowDropdown></IoMdArrowDropdown>
              </button>
        </React.Fragment>
    )
}

export default UserButton