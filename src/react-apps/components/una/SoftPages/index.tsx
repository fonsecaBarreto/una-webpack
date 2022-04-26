import React, { ReactNode, useEffect, useState } from 'react'
import "./style.css"
import { LabelView } from '@/domain/views/ListingView'

export namespace SoftPage {

    export type Params = {
        children: any, 
        page: string,
    }

    export namespace PageWrapper {
        export type  Params = {
            children: any, 
            name: string,
            title?:string,
            onChange?: any
            options: LabelView[]
        }
    }
}

export const PageWrapper:React.FunctionComponent<SoftPage.PageWrapper.Params> = ({children}) => {
    return ( <React.Fragment> {children} </React.Fragment> )
}

export const SoftPages: React.FunctionComponent<SoftPage.Params> = ({children, page}) => {

    const [ currentPage, setCurrentPage ] = useState<any>(null)
    const [ pageProps, setPageProps] = useState<any>(null)
    
    useEffect(() => {
        var current:any = null;
        React.Children.map(children, (child: any) => {
            console.log(child.props)
            if(child.props?.name == page) {
                current = child;
            }
        })

        setCurrentPage(current);
        setPageProps(current ? current.props: null)
    },[page])

    return (
        <div className='una-soft-page'>
            <header>
                <section>
                    <button className='una-sp-back-btn'> Voltar</button>
                </section>
                <section>
                    <span> {pageProps && pageProps["title"]} </span>
                    <span> ... </span>
                </section>
                <section>
                    {   ( pageProps?.["options"] ) && 
                        pageProps["options"].map((b: any, i: number)=> (
                            <button key={i} onClick={()=> {
                                pageProps?.onChange && pageProps.onChange(b.value)}}> {b.label}</button>)
                    )}
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
