import { Product } from '@/domain/views/Product'
import { useDispatch, useSelector } from 'react-redux'
import { CartState, pushToCart } from './index'
import { toast } from 'react-toastify'
import { setForceCartToOpen } from '../main/actions'


export const UseCartHandler = () =>{
    
    const dispatch = useDispatch()
    const { cart } = useSelector((state: any)=>state.carrinho)

    const openCart = () =>{
      dispatch(setForceCartToOpen(true))
    }

    const getCartBySupplier = (): any =>{
      var mtr: { label: string, supplier_id: string, items: any }[] = [];

      if(cart.length > 0){
        cart.forEach((item: CartState.CartItem) => {

          const [ ean, index, supplier_id ] = item._id.split("_");
        
          var company_name = (supplier_id == "undefined" || index == "undefined") ? "Preço sobre orçamento" 
          : (item.product.supplies.find((p: any)=> ( p.company_id == supplier_id && p.index == Number(index) )))?.company_name ?? ""

          const vet_index = mtr.findIndex((v: any)=>( v.supplier_id == supplier_id))

          if(vet_index == -1){
            mtr.push({ label: company_name, supplier_id, items: [ item] })
          }else{
            mtr[vet_index] = { label: company_name, supplier_id, items: [ ...mtr[vet_index].items, item] }
          }
        });
      }
      return mtr;
    }

    const countBy_id = (_id: string) =>{
      const item_index = cart.map((c:any)=> c._id ).indexOf(_id);
      const item = cart[item_index];
      return item?.qtd ?? 0;
    }

    const pushProduct = (_id: string, product: Product, qtd: number, ) =>{
      const item: CartState.CartItem = { _id, product, qtd }
      dispatch(pushToCart(item));

      toast.info(`${product.specification} adicionado ao carrinho.`, { position: "top-left"});
      

    }
    return { pushProduct, countBy_id, getCartBySupplier, openCart }
}

