import * as React from 'react';
import "./style.css"
export const SignUpCall = () =>{
    return (
        <div className='bl-signupcall'>  
            <div className='bl-signupcall-content app-container'>
                <a href="/login?v=signup">
                    <button>
                        Cadastre-se grátis
                    </button>
                </a>
            </div> 
        </div>
    )
}

export default SignUpCall