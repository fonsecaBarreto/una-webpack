import React from 'react'
import './style.css'
import UserImage from "@assets/images/user.png"

export namespace CompanyStaffPanel {
    export type Params ={
        staff: any[],
        onChange: any
    }
}

export const CompanyStaffPanel: React.FunctionComponent<CompanyStaffPanel.Params> =({staff, onChange}) =>{
    return (
        <div className='company-staff-panel'>
            {   
                staff.map((user:any)=>{ 
                    const { id, nome, telefone, email} = user
                    return (
                        <div key={user.id} onClick={()=>onChange(id)} className="company-user-item"> 
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