import React, { useState } from 'react'
import './style.css'
import { AiOutlineShop, AiOutlineBell, AiOutlinePaperClip } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { FiEdit } from 'react-icons/fi'
import { HiChevronDown } from 'react-icons/hi'


export const ListViewItem: React.FunctionComponent<any> = ({ onClick, data}) =>{

    const [ show, setShow ] = useState(false)

    return (
        <div className="list-view-item">

            <div className="list-view-item-content">

                <section className="list-view-item-icon" onClick={()=>onClick({key:"open", data})}>
                    <AiOutlineShop></AiOutlineShop>
                </section>

                <section>
                    <span className="list-view-item-name">{data.razaoSocial}</span>
                </section>

                <section>
        

                    <Link to={`/admins/`} className="mart-opt-btn">
                        <span className={'font-bold '}> 
                            <FiEdit></FiEdit> 
                        </span> 
                    </Link>

                </section>
       
            </div>
        </div>
    )
}

export default ListViewItem