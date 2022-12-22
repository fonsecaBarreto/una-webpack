import React, { useEffect, useMemo, useState } from 'react'
import EmptyImage from "@/public/assets/images/product/empty.svg"

import { BudgetFindView } from './Content'

export type BudgetItemProps = {
    data: {
        ean: string,
        product_specification: string,
        product_image: string,
        quantity: string,
        price: number,
        order: number,
    }
}

export const BudgetItem: React.FunctionComponent<BudgetItemProps> = ({ data }) =>{

    const { ean, order, price, product_image, product_specification, quantity } = data;
    return (
        <div className='budget-item-a1'>
            <main>
                <img src={product_image ?? EmptyImage}></img>
                <section>

                    <label>
                        <span> { product_specification} 
                        </span>
                    </label> 
                    <label>
                        Quantidade:
                        <span> { quantity } {"unidade(s)"}</span>
                    </label> 
                    <label>
                        Subtotal:
                        <span> R$:{ price.toFixed(2) }</span>
                </label> 
                </section>
            </main> 
        </div>
    )
}


export default BudgetItem
