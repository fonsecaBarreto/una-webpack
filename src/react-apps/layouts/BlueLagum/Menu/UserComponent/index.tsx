import React from 'react'
import './style.css'
import UserImage from '@assets/images/user2.png' 
import { ImExit } from 'react-icons/im'
import { loginServices } from '@/services/api/login-service'

const UserComponent:React.FunctionComponent<any> = ({ user, menuState }) =>{
    return (
        <div className="common-menu-user-component">
            
            <img src={UserImage}/>

            { (menuState.show == true &&  user )&& 
                <React.Fragment>
                    <span> { user.nome || "Nome do Usuario" } </span>
                    { user && <button onClick={loginServices.logout}> <ImExit></ImExit>  Sair </button> }
                </React.Fragment>
            }
        </div>
    )
}

export default UserComponent;