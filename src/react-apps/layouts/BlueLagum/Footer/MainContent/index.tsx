import React from 'react'
import './style.css'
import Logo from "@/public/assets/images/logo.svg" 
import WhatsAppIcon from "@/public/assets/icons/whatsapp.svg" 
import InstagramIcon from "@/public/assets/icons/instagram.svg" 
import FacebookIcon from "@/public/assets/icons/facebook.svg" 

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
                            <span>(22) 99231-7557 </span>
                        </li>
                    </ul>
                    <nav className="footer-social-nav">



                        <span className="social-icon"> <img src={InstagramIcon}></img></span>
                        <span className="social-icon"> <img src={FacebookIcon}></img></span>
                        <span className="social-icon"> <img src={WhatsAppIcon}></img></span>
                    </nav>
                </section>
            </div>
        </div>
    )
})

export default LayoutFooterMainContent