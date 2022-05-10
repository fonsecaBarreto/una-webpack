import React from 'react'
import './style.css'
import UserImage from '@assets/images/user2.png' 

const UserComponent:React.FunctionComponent<any> = ({ user, onClick }) =>{

    return (
        <div className="common-menu-user-component" onClick={onClick}>
            <img src={UserImage}/>
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
        </div>
    )
}

export default UserComponent;