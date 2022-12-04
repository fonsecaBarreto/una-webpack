import { Product } from "@/domain/views/Product"

export namespace CartState {
     export type CartItemSupply = { index: number, supplier_id: string } | null
     export type CartItem = {
          _id: string // ean_supplier_id_index
          product: Product,
          supply: CartItemSupply
          qtd: number
     }
}

export const CreateCartItem_Id=(ean: string, supply: CartState.CartItemSupply) =>{
     return `${ean}_${supply?.supplier_id ?? 'none' }_${supply?.index ?? 'none'}`
}

export const CreateCartItem=(params: Omit<CartState.CartItem, '_id'>) =>{
     const _id = CreateCartItem_Id(params.product.ean, params.supply);
     return { _id, ...params}
}

export interface CartState {
     cart :  CartState.CartItem[]
}

const INITIAL_STATE = {
     cart: [] as CartState.CartItem[],
}
   
export const carrinhoReducer = (state=INITIAL_STATE, action: any) => {
     switch(action.type){
          case "SET_CART": {
               return ({ ...state, cart: action.payload })
          };
          
          case "PUSH_TO_CART": {

               var prev_cart= [ ...state.cart ];
               const item: CartState.CartItem = action.payload;

               // Verificar se ja existe
               const indexOf = prev_cart.map(item=>item._id).indexOf(item._id)
               
               if(indexOf != -1){
                    if( item.qtd <= 0) 
                         prev_cart.splice(indexOf,1);
                    else
                         prev_cart[indexOf]=item;
               }else{
                    prev_cart = [ item, ...prev_cart ]

               }

               return ({ ...state, cart: prev_cart })
          };

          case "REMOVE_FROM_CART": {
               var prev_cart= [ ...state.cart ];
               const _id: string = action.payload;
               const indexOf = prev_cart.map(item=>item._id).indexOf(_id)
               prev_cart.splice(indexOf,1);
               return ({ ...state, cart: prev_cart })
          };

          default: return state
     }
}

/* actions */

export const setCart = (products: CartState.CartItem[])=> ({
     type: "SET_CART",
     payload: products
})

export const pushToCart = ( item: CartState.CartItem) => ({
     type: "PUSH_TO_CART",
     payload: { ...item }
})

export const removeFromCart = ( _id: string ) => ({
     type: "REMOVE_FROM_CART",
     payload: _id
})

