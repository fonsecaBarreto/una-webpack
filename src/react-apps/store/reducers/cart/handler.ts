import { useDispatch, useSelector } from 'react-redux'
import { CartState, pushToCart } from './index'





export const serializeCartProdut = (product: any): CartState.Product =>{

  return({
      ean: product.ean,
      images: product.images ?? [],
      specification: product.specification  ?? "-",
      presentation: typeof product.presentation == "string" ? product.presentation : ( product?.presentation?.label ?? "" ) 
  })
}

export const UseCartHandler = () =>{
    
    const dispatch = useDispatch()
    const { cart } = useSelector((state: any)=>state.carrinho)
  
    const count = (ean: string) =>{
      if(!ean) return;
      const item_index = cart.map((c:any)=> c.product.ean ).indexOf(ean);
      const item = cart[item_index];
      return item?.qtd ?? 0;
    }

    const overwrite = (n: number, product: CartState.Product) => {
      dispatch(pushToCart(product,n, 'OVERWRITE'));
    }
  
    const push = (n: number, product: CartState.Product) =>{
      const cartProduct = serializeCartProdut(product)
      switch(n){
          case +1:  dispatch(pushToCart(cartProduct,1)); break;
          case -1:  dispatch(pushToCart(cartProduct,-1)); break;
      }
    }
    return { count, push, overwrite }
}

