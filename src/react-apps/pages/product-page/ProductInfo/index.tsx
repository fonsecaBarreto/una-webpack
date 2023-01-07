import React, { useEffect, useMemo, useState } from 'react'
import "./style.css"
import { UseCartHandler } from "@/react-apps/store/reducers/cart/handler"
import CompanySupply from '../CompanySupply'
import { useSelector } from 'react-redux'
import StarImg from "@assets/icons/star.svg"
import { CreateCartItem_Id } from '@/react-apps/store/reducers/cart'

export const ProductInfo: React.FunctionComponent<any> = ({ product, supplies }) =>{
    const { user } = useSelector((state: any) => state.main)
    const [ selectedSupply, setSelectedSupply ] = useState<any>(null)
    const cartHandler = UseCartHandler()
    var quantity = useMemo(()=>product.quantity_per_unity ?? 1,[product])

    const serializedSupplies= useMemo(()=>{
        if(!supplies) return [];
        return supplies.map((s: any)=>{
            const _id = CreateCartItem_Id(product.ean, s.index, s.company_id)
            return ({ ...s, key_value: _id })
        })
    },[supplies])


    useEffect(()=>{
        if(serializedSupplies.length> 0){
            setSelectedSupply(serializedSupplies[0].key_value)
        }
    },[ serializedSupplies])

    const handleSupplySelect = (k: string, v?: any) =>{
       setSelectedSupply(v.key_value)
    }


    const handleCartButton = () =>{
        const item_id = selectedSupply ?? CreateCartItem_Id(product.ean)
        const qtd = cartHandler.countBy_id(item_id) ?? 0;
        cartHandler.pushProduct(item_id, product, qtd + 1); 
        cartHandler.openCart()
    }

    return (
        <div className='product-page-info'>
            <header>
                <span className='product-page-specification'> 
                    {product.specification}
                   {/*  <span> ( {quantity} unidade{quantity > 1 ? "s": ""} ) </span> */}
                </span>

                <div className='produto-page-stars'>
                    {[...Array(5)].map((_,i)=>{
                        return (
                            <img key={i}src={StarImg}/>
                        )
                    })}
                </div>


                <label className='product-page-product-description'>
                    ean: 
                    <span> {product.ean}</span>
                </label>
                
                <label className='product-page-product-description'>
                    Marca: 
                    <span> {product.brand?.label}</span>
                </label>

                <label className='product-page-product-description'>
                    Quantidade: 
                    <span> {!product.weight ? "nao informado" : `${quantity} unidades`}</span>
                </label>

                <label className='product-page-product-description'>
                    Peso: 
                    <span> {!product.weight ? "nao informado" : `${product?.weight} Kg`}</span>
                </label>


                <label className='product-page-product-description'>
                    Volume: 
                    <span> { !product.volume ? "nao informado" : `${product?.volume} L`}</span>
                </label>
    
            </header>

            <main>
                <h5> Ofertas Para este item: </h5>
                <div className='product-page-supplies'>
                    {(serializedSupplies.length > 0) ? 
                        serializedSupplies.map((s: any, i:number)=>  ( 
                            <CompanySupply 
                                isSelected={selectedSupply == s.key_value ? true : false} 
                                onChange={handleSupplySelect} 
                                key={i} supply={s}/>
                        ))
                    : 
                    <div className='company-supply-no-price'> 
                        <span> Nenhum oferta no momento </span>
                    </div>
                    }
                </div>
            </main>

            <div>
                <button 
                    onClick={handleCartButton} 
                    className='product-page-cart-btn una-submit-button-color'> Adicionar ao carrinho 
                </button> 
            </div> 

        </div>
    )
}

export default ProductInfo

/*     const suppliesList = useMemo(()=>{
        if(product.supplies.length == 0 ) return [];
        return product.supplies.map((sup: any)=>{
            return ({ 
                label: `R$: ${sup.price.toFixed(2)} -  ${sup.company_name}`,
                value: sup.company_id+"_"+sup.index,
                payload: { supplier_id: sup.company_id, index: sup.index }
            
            })
        })
    },[ product ]) */


    /*     const handleSupplySelect= (e: any) =>{
        console.log(e.target.value)
        const supply = suppliesList.find(p=>p.value == e.target.value);
        cartHandler.overwrite(qtd, product, supply?.payload)
    } 

    
    */
