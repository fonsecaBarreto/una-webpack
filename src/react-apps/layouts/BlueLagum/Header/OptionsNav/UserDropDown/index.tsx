import * as React from 'react';
import { UserProfileRole } from "@/domain/views/User";
import GlobalContext from "@/react-apps/apps/GlobalContext";
import DropDown from "@/react-apps/components/una/DropDown";
import { setGodMode } from "@/react-apps/store/reducers/main/actions";
import { loginServices } from "@/services/api/login-service";
import { MakeNotification, NotificationType } from "fck-react-dialog";
import { useContext, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { useHistory } from "react-router-dom";
import UserButton from "./UserButton";
/* assets */
import DocumentsIcons from "@assets/icons/cotacoes.svg"
import ExitIcon from "@assets/icons/exit.svg"
import ConfigIcon from "@assets/icons/config.svg"

const MakeDropDownOptions = (user?: any): DropDown.Options[] =>{

    var list: DropDown.Options[] = [];

    if(user){
        list = [ 
            { 
                label: "Sair", 
                value: "SAIR",
                icon:  <img src={ExitIcon} /> 
            },
            { 
                label:"Historico de Cotações", 
                value: "COTACOES", 
                icon: <img src={DocumentsIcons} /> 
            }
        ];

        if(user.roles.includes(UserProfileRole.ADMIN)){
            list = [ ...list, { label:"Super Usuario", value: "GOD_MODE", icon: <img src={ConfigIcon} /> }]
        }
    }else{
        list = [ 
            { label: "Entrar", value: "SIGNIN"}, 
            { label: "Cadastrar-se", value : "SINGUP"},
            
        ];
    }

    return list

}

export const UserDropDown = () =>{

    const context: any = useContext(GlobalContext);
    const dispatch = useDispatch()
    const history = useHistory()

    const [ options , setOptions ] = useState<DropDown.Options[]>([])
    const { user } = useSelector((state: any)=>state.main)

    React.useEffect(()=>{ setOptions(MakeDropDownOptions(user)) }, [user])

    const handleGodMode = () => {
        context.dialog.push(MakeNotification((n)=>{
            if(n === 0){ dispatch(setGodMode(true))} return -1;
        },["Você está prestes a entrar no modo administrador", "tem certeza disso?"],"Atenção", NotificationType.CONFIRMATION))
    }

    const handleOptions = (n:string) =>{
        switch(n){
            case "SAIR": loginServices.logout();break;
            case "GOD_MODE": handleGodMode(); break;
            case "SIGNIN": history.push("/login?v=signin");break;
            case "SINGUP": history.push("/login?v=signup");break;
            case "COTACOES": history.push("/cotacoes");break;
        }
        return -1
    }

    return (
        <DropDown options={options} onAction={handleOptions} className="desktop-only">
            <UserButton user={user} onClick={() =>{}}></UserButton>
        </DropDown>
    )
}


export default UserDropDown
