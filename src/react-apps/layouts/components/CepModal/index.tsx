import * as React from 'react';
import "./style.css"
import CepInputControl from '@/react-apps/components/una/inputs-control/CepInputControl';
import { Forming } from 'fck-react-input-controls';
import { UseStateAdapter } from 'fck-react-input-controls/lib/Controls';
import { SessionLocation } from '@/domain/SessionLocation';

const INITIAL_DATA= { cep: "" }

export namespace CepModal {
    export type Params = {  onChange: any, user: any}
}

export const CepModal: React.FunctionComponent<CepModal.Params> = ({ onChange, user }) => {
    const state = UseStateAdapter(INITIAL_DATA);

    const handleCep = (result: any) =>{
        state.loading.set(false);
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

                    <Forming.FormGrid title="" columns={[12]} freeze={state.loading.get}>
                        <CepInputControl beforeSubmit={()=>state.loading.set(true)} onData={handleCep} 
                            value={state.data.get['cep']} onInput={(v: any)=>state.data.onInput('cep', v)}/>
                    </Forming.FormGrid>
                    <div className='bg-cep-modal-user'>
                    { !user && <span> Ja sou Cadastrado </span>}
                        <button className='una-submit-button-color' onClick={()=> onChange('SIGNIN')}>  { user ? "Usar Meu endereço" : "Entrar"}  </button>
                    </div>
            </main>
        </div>
    )
}   

export default CepModal