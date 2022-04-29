import React from 'react'
import './style.css'
import UserImage from "@assets/images/user.png"

export namespace CompanyStaffPanel {
    export type Params ={
        staff: any[],
        onItemClick: (user_id: string) => any
    }
}

export const CompanyStaffPanel: React.FunctionComponent<CompanyStaffPanel.Params> =({staff, onItemClick}) =>{
    return (
        <div className='company-staff-panel'>
            {   
                staff.map((user:any)=>{ 
                    const { id, nome, telefone, email} = user
                    return (
                        <div key={user.id} onClick={()=>onItemClick(id)} className="company-user-item"> 
                            <section>
                                <img src={UserImage}></img>
                                <div className='company-user-item-main-content'>
                                    <span> {nome} - {telefone} - {email}</span>
                                </div>
                            </section>
                        </div>
                    )
                }) 
            } 
        </div>
    )
}

export default CompanyStaffPanel