import React from 'react'
import Gravatar from 'react-gravatar'
import DownArrowImage from "@assets/icons/down-arrow.svg"
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
                <div className='uhub-avatar-container'>
                  <Gravatar default="mp" size={36} email={user ? user.email : "" } />
                </div>
                <div className='uhub-user-info' >
                  { 
                    (user) ? 
                    <React.Fragment>
                        <span className='uhub-user-title'>{(user.nome.split(" ")[0])}</span> 
                        <div className='uhub-user-subtitle'> 
                          <span>  Minha conta  </span>
                          <img className='uhub-down-arrow' src={DownArrowImage}></img>
                        </div> 
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <span className='uhub-user-title'>Cadastre-se</span> 
                        <div className='uhub-user-subtitle'> 
                          <span> Gratuitamente </span>
                        </div> 
                    </React.Fragment>
                  }
                </div>
              </button>
        </React.Fragment>
    )
}

export default UserButton