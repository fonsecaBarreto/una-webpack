import React from 'react'
import './style.css'
import { MakeDialogConfig } from '../..'

import { FiAlertCircle, FiUserCheck } from 'react-icons/fi'
import { GrStatusGood } from 'react-icons/gr'
import { BsQuestionOctagon } from 'react-icons/bs'

export function MakeNotification(onAction, messages=[], title="", type) {

    var icon;
    var buttons = []

    switch(type) {
        case "SUCCESS": 
            icon= <GrStatusGood>,</GrStatusGood>;
            messages = messages || ["Operação Relizada com sucesso"];
            buttons= ["Ok"];
        break;
        case "FAILURE": 
            icon= <FiAlertCircle></FiAlertCircle>,
            messages = messages || ["Não foi possivel realizar essa ação."]
            buttons= ["Ok"];
        break;
        case "INFO": 
            icon= <FiUserCheck></FiUserCheck>;
            messages= messages || [""],
            buttons= [];
        break;
        case "CONFIRMATION": 
            icon= <BsQuestionOctagon></BsQuestionOctagon>;
            messages= messages || ["Confirme!"],
            buttons= [ "Continuar", "Cancelar" ];
        break;
    }

    return MakeDialogConfig( ({onAction}) => ( 
        <div className="notify-dialog"> 

            { icon && <span className="notify-d-icon"> {icon} </span>}

            <section className="notify-d-content-body">
                { messages.length > 0 && messages.map((m, i)=>(<span key={i}>{m}</span>)) }
            </section>

            <section className="notify-d-btns">
                { buttons.map((b,i)=>( <button onClick={()=> onAction(i)} key={i}> {b} </button>)) }
            </section>

        </div>
    ),onAction, title )
}

export default MakeNotification