import { Product } from '@/domain/views/Product'
import { useDispatch, useSelector } from 'react-redux'
import { CartState, CreateCartItem, CreateCartItem_Id, pushToCart } from './index'

export const UseCartHandler = () =>{
    
    const dispatch = useDispatch()
    const { cart } = useSelector((state: any)=>state.carrinho)

    const countByEan = (ean: string, supply?: CartState.CartItemSupply) =>{
      if(!ean) return 0;
      const _id = CreateCartItem_Id(ean, supply ?? null)
      return countBy_id(_id)
    }

    const countBy_id = (_id: string) =>{
      const item_index = cart.map((c:any)=> c._id ).indexOf(_id);
      const item = cart[item_index];
      return item?.qtd ?? 0;
    }

    const pushProduct = (product: Product, qtd: number, supply?: CartState.CartItemSupply) =>{

   
      if(supply == null ){

        // - Deve verificar se ja existe esse produto no carrinho, se sim, usuara o msm supply
        // do contrario o primeiro da lsita sera usado
  
      }


      const item = CreateCartItem({ product, qtd, supply: supply ?? null })
      dispatch(pushToCart(item));
    }
    return { pushProduct, countByEan, countBy_id }
}

