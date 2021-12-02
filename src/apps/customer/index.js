import React, { useEffect } from "react";
import { defaultRender, AppRouter, DialogStack } from '../../global'
import './main/style.css'
import { ROUTES } from './main/ROUTES' 
/* App Router Layout */
import BlueLagum from '../../components/Layouts/BlueLagum' 
import { MENU_TREE } from './main/MENU_TREE'
function App(){

  return (
    <div className={`App ${ false ? 'loading': ''}`}>
        <AppRouter routes={ROUTES} prefix="customer" layout={() => <BlueLagum menuTree={MENU_TREE} ></BlueLagum>} root="/dashboard"></AppRouter>  
        <DialogStack.GlobalDialogStackComp></DialogStack.GlobalDialogStackComp> 
    </div>
    );
}

defaultRender({ app: App })




  /*   const open = ()=>{
        GlobalDialogStack.push(
            MakeDialogConfig(({onAction}) => ( 
            <div>
                <button onClick={open}> Vamos testar isso daqui</button>
                <button onClick={GlobalDialogStack.clear}> Clear</button>
                <button onClick={() => onAction()}>Realizar alguma açãoa</button> 
            </div>
            ), (n) => { alert("Voce esta preste a fehcar essa merda");  }, "Tirausdlasd"))  

       GlobalDialogStack.push(MakeNotification( (n) =>{
            console.log(n)
            if(n == 0 ){
                console.log("CONFIRMADO");
            }else if(n == 1){
                console.log("CANCELADO");
            }
            return -1
        },["Primeira mesage", "segnsda", "asddasd"],"qualquer", "CONFIRMATION"))

        GlobalDialogStack.push(MakeNotification( (n) =>{
            console.log(n)
            if(n == 0 ){
                console.log("CONFIRMADO");
            }else if(n == 1){
                console.log("CANCELADO");
            }
            return -1
        },["Primeira mesage", "segnsda", "asddasd"],"qualquer", "CONFIRMATION"))

 
        GlobalDialogStack.push(MakeOptions( (n) =>{
            console.log(n)
            return -1
        },[{label: "Deltar"}, {label: "escolher esse"}]))
    } 
    
    
    DialogStack.push(DialogStack.Dialog.MakeNotification( (n) =>{
        console.log(n)
        if(n == 0 ){
            console.log("CONFIRMADO");
        }else if(n == 1){
            console.log("CANCELADO");
        }
        return -1
    },["Primeira mesage", "segnsda", "asddasd"],"qualquer", "CONFIRMATION"))

    */