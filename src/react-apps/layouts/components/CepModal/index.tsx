import * as React from 'react';
import "./style.css"
import CepInputControl from '@/react-apps/components/una/inputs-control/CepInputControl'; 
import { SessionLocation } from '@/domain/SessionLocation';

export namespace CepModal {
    export type Params = {  onChange: any, user: any}
}

export const CepModal: React.FunctionComponent<CepModal.Params> = ({ onChange, user }) => {
    /* const state = UseStateAdapter(INITIAL_DATA); */
    const [ value, setValue ] = React.useState("");
    const [ isLoading, setIsLoading ] = React.useState(false);
    const handleCep = (result: any) =>{
        // state.loading.set(false);
        setIsLoading(false);
        if(result){
            const { cep, ibge, uf, bairro, localidade }  = result
            let str = `${localidade}, ${bairro} - ${uf} `
            const sessionLocation = new SessionLocation(cep, ibge, str)
            sessionLocation.store()
        }
        onChange("UPDATE")
    }

    return(
        <div className='bl-cep-modal'>
            <header>
                <span> Minha Localidade </span>
                <button onClick={()=>onChange(-1)}> x</button>
            </header>
            <main>

                    
                    <CepInputControl beforeSubmit={()=>setIsLoading(true)} onData={handleCep} 
                        value={value} onInput={setValue}/> 
            
                    <div className='bg-cep-modal-user'>
                    { !user && <span> Ja sou Cadastrado </span>}
                        <button className='una-submit-button-color' onClick={()=> onChange('SIGNIN')}>  { user ? "Usar Meu endereço" : "Entrar"}  </button>
                    </div>
            </main>
        </div>
    )
}   

export default CepModal