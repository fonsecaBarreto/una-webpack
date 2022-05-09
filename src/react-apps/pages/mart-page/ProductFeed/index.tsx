import React from 'react'
import './style.css'
import { useSelector } from 'react-redux'
import ContentPool from '@/react-apps/layouts/components/ContentPool'
import { ProductItem } from './item'
import SearchHeader, { LabelRow } from '../SearchHeader'
import { BsFillFilterSquareFill } from 'react-icons/bs'
import { AiOutlinePlusSquare } from 'react-icons/ai'

export namespace ProductFeed { export type onChange = any }

export const ProductFeed: React.FunctionComponent<any> = ({ onChange }) =>{

    const { user, god_mode } = useSelector((state: any)=>state.main)
    const { products } = useSelector( (state: any)=>state.mart);

    return (
        <div className="una-product-feed">
            <ContentPool list_data={products} dataAlias={"products"}

                onAction={onChange}
                header={ (queries: any)=>(<SearchHeader  queries={queries}/>) }
                auxHeader={(queries: any)=>(
                    <React.Fragment>
                        { 
                            (user && user.roles.includes("ADMIN")) &&
                            <React.Fragment> 
                                { ( god_mode ) &&
                                    <React.Fragment>
                                        <button className='admin-mode-button.add' onClick={ () => onChange("HISTORY", "registro")}> 
                                            <AiOutlinePlusSquare/>
                                        </button>
                                    </React.Fragment>
                                }
                            </React.Fragment>
                        } 
                        <button className='mobile-only' onClick={ () => onChange("SHOW_FILTERS")}> <BsFillFilterSquareFill/> </button>
                    </React.Fragment>
                )}
                itemComponent={ ({item_data, listMode })=> (
                    <ProductItem 
                        showPrices={user}
                        showOptions={god_mode} 
                        listMode={listMode} produto={item_data} 
                        onAction={onChange}
                    ></ProductItem>
                )}>
            </ContentPool>
        </div>
    )
}

export default ProductFeed


