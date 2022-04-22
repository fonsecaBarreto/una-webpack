import React, { ReactNode, useEffect, useState } from 'react'
import "./style.css"

export const PageWrapper:React.FunctionComponent<any> = ({children, name, title="" }) => {
    return ( <React.Fragment> {children} </React.Fragment> )
}
export const SoftPages: React.FunctionComponent<any> = ({children, page}) => {
    const [ currentPage, setCurrentPage ] = useState<any>(null)
    
    useEffect(() => {
        React.Children.map(children, (child: any) => {
            console.log(child.props)
            if(child.props?.name == page) setCurrentPage(child);
        })
    },[page])

    return (
        <div className='una-soft-page'>
            <header>
                <section>
                    <button className='una-sp-back-btn'> Voltar</button>
                </section>
                <section>
                    <span> {currentPage?.props["title"]} </span>
                    <span> ... </span>
                </section>
                <section>
                    <button> Opção 1 </button>
                </section>
            </header>
            <main>
                { currentPage && ( React.cloneElement(currentPage)) }
            </main> 
        </div>
    )
}

export default SoftPages

{/*   
    {React.Children.map(children, (x: ReactNode,i) =>(
        <section key={i}> {x} </section>
    ))}
*/}
