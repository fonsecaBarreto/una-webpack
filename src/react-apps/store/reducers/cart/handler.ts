import React, {} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { pushToCart } from './index'

export const UseCartHandler = () =>{
    
    const dispatch = useDispatch()
    const { cart } = useSelector((state: any)=>state.carrinho)
  
    const count = (ean: string) =>{
      if(!ean) return;
      const item_index = cart.map((c:any)=> c.product.ean ).indexOf(ean);
      const item = cart[item_index];
      return item?.qtd ?? 0;
    }

    const overwrite = (n: number, product: any) => {
      dispatch(pushToCart(product,n, 'OVERWRITE'));
    }
  
    const push = (n: number, product: any) =>{
      switch(n){
          case +1:  dispatch(pushToCart(product,1)); break;
          case -1:  dispatch(pushToCart(product,-1)); break;
      }
    }

  
    return { count, push, overwrite }
}

