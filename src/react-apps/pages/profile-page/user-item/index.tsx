import React, {useContext, useEffect, useState} from 'react'
import './style.css'
import UserImage from "@assets/images/user.png"

export const CompanyUserItem: React.FunctionComponent<any> = ({user, onClick}) =>{
     const { nome, telefone, papeis } = user
    return (
        <div className="company-user-item" onClick={onClick}> 
            <section>
                <img src={UserImage}></img>
                <div className='company-user-item-main-content'>
                    <span> {nome} - {telefone }</span>
                    <span> { JSON.stringify(papeis)}</span>
                </div>
            </section>
        </div>
    )
}

export default CompanyUserItem