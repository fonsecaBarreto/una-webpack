import React from 'react'
import './style.css'
import UserImage from '@assets/images/user2.png' 
import { ImExit } from 'react-icons/im'
import { loginServices } from '@/services/api/login-service'

const UserComponent:React.FunctionComponent<any> = ({ user }) =>{
    return (
        <div className="common-menu-user-component">
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