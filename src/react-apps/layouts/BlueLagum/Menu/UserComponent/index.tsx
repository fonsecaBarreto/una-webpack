import React from 'react'
import './style.css'
import UserImage from '@assets/images/user.png' 
import { ImExit } from 'react-icons/im'
import { loginServices } from '@/services/api/login-service'

const UserComponent:React.FunctionComponent<any> = ({ menuState, user }) =>{

    const handleClick = () =>{
        if(menuState.show == false ){
            menuState.setShow(true)
        }
    }

/* 
    context.dialog.push(MakeNotification((n)=>{
        if(n === 0){ dispatch(setGodMode(true))} return -1;
    },["Você está prestes a entrar no modo administrador", "tem certeza disso?"],"Atenção", NotificationType.CONFIRMATION))

    { label:"Administrador", toDo: ()=>alert("Voce esta prestes a entrar no modo admin"), icon:<MdAdminPanelSettings/>}
 */
    return (
        <div className="common-menu-user-component" onClick={handleClick}>
            
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