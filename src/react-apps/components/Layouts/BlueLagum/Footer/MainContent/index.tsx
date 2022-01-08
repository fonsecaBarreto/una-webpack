import React from 'react'
import './style.css'
import Logo from "@/public/assets/images/logo.svg" 
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { FiPhone } from  'react-icons/fi'
import { AiOutlineMail } from  'react-icons/ai'

export const LayoutFooterMainContent = (({}) => {
    return (
        <div className="footer-main-content">
            <div className="app-container">
                <section> 
                    <img src={Logo} alt="logo"></img> 
                </section>
                <section> 
                    <ul className="footer-contact">
                        <li> 
                            <span> <FiPhone></FiPhone>(22) 99231-7557 </span>
                        </li>
                    </ul>
                    <nav className="footer-social-nav">
                        <span className="social-icon"><FaInstagram></FaInstagram></span>
                        <span className="social-icon"><FaFacebookF></FaFacebookF></span>
                        <span className="social-icon"><FaWhatsapp></FaWhatsapp></span>
                    </nav>
                </section>
            </div>
        </div>
    )
})

export default LayoutFooterMainContent