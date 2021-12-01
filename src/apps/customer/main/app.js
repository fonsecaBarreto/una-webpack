import React, { useState } from 'react';
import "../../../assets/styles/root.css";
import "../../../assets/styles/fonts.css";
import './style.css'

import DialogStackImplementation from '../../../components/implementations/Global_DialogStack';

function App(){
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
    } */

  return (
    <div className={`App ${ false ? 'loading': ''}`}>
        <DialogStackImplementation></DialogStackImplementation>
    </div>
    );

}

export default App
