import React, { useEffect, useState } from 'react'
import './style.css'
import ToggleButton from '../ToggleButton'
import MenuItem from './Item' 
/* import UserComponent from './UserComponent'  */
import { useWindowSize } from '../../../utils/hooks/useWindowSize'


export const PrimaryMenu = ({ history, menuState, user, tree }) =>{

    const screenSize = useWindowSize();

    const goTo = (to) =>{
       
        if (screenSize.width < 756) {
            menuState.setShow(false)
            // se a tela for menor do que 756px, significa dizer que o menu esta no estilo alternativo, por isso deve ser recolhido.
        }

         to && history.push(to)
    }
    
    return (
    
        <aside className={`primary-menu ${menuState.show ? 'show' : ''}`}>
            <section className="primary-menu-header">
                <ToggleButton onClick={menuState.toToggle} desktop></ToggleButton>
            </section>

            <section>
                <ul> 
                { 
                    tree && tree.map((p,i) => ( <MenuItem config={p} key={i} menuState={menuState} onClick={goTo}> </MenuItem>))
                } 
                </ul>
            </section>
            
            <section>
               {/*  <UserComponent menuState={menuState} user={user}></UserComponent> */}
            </section> 

        </aside>)
}

export default PrimaryMenu