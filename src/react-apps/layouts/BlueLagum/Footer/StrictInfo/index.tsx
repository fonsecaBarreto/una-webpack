import React from 'react'
import "./style.css"
import LestEncrypt from "@/public/assets/images/letsencrypt.png"
import PoweredByAWS from "@/public/assets/images/powered-by-aws.png"
export const StrictInfo = () =>{
    return (
        <div className="footer-strict-content">

            <div className="app-container">
                <section>

                    <label className="strict-label"> 
                        UNA Compras ....Ltda:
                        <span>
                            Rodovia amaral peixoto, 2511 - km 179 loja 01 - barra de macaé. Macaé-RJ. <br/>
                            CEP: 27973-030 | CNPJ: 30.801.165/0001-23
                        </span>
                    </label>

                    <label className="strict-label"> 
                         Comercial:
                        <span> adm@unacompras.com.br </span>
                    </label>

                    <label className="strict-label"> 
                        Suporte:
                        <span>
                            <span> suporte@unacompras.com.br </span>
                        </span>
                    </label>

                </section>

                <section>
                    <img src={LestEncrypt}/>
                    <img src={PoweredByAWS}/>

                </section>
            </div>

        </div>
    )
}

export default StrictInfo