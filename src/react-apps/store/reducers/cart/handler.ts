import React, {} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { pushToCart, removeFromCart } from './index'

export const UseCartHandler = () =>{
    
    const dispatch = useDispatch()
    const { cart } = useSelector((state: any)=>state.carrinho)
  
    const count = (ean: string) =>{
      if(!ean) return;
      const item_index = cart.map((c:any)=> c.product.ean ).indexOf(ean);
      const item = cart[item_index];
      return item?.qtd ?? 0;
    }
  
  
    const push = (n: number, product: any) =>{
      switch(n){
          case +1:  dispatch(pushToCart(product)); break;
          case -1:  dispatch(removeFromCart(product)); break;
      }
    }
  
    return { count, push }
}

