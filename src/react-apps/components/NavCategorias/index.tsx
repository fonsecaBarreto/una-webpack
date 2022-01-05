/* Esse é o conjunto de NavComponents */
import React, { useState } from 'react'
import SelectorNav from './SelectorNav'


export const NavCategorias: React.FunctionComponent<any> = () => {

   const [ extern, setExten ] = useState<{value: string, label: string}[]>([])

    const handleAply = (items: {value: string, label: string}[] ) =>{
        console.log(items);
        setExten(items)
    };

    return (
        <div>

            <SelectorNav push={handleAply} title="Categorias" items={[ 
                { label: "Todos", value :""},
                { label: "Farinha", value :"2"},
                { label: "Outro", value :"3"},
            ]}></SelectorNav>

        </div>
    )
}

export default NavCategorias






