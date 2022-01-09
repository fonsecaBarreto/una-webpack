import { IgnorePlugin } from "webpack";
import { CartItem, Product } from "./actions";

const INITIAL_STATE = {
     cart: [] as CartItem[],
}
   
export const carrinhoReducer = (state=INITIAL_STATE, action: any) => {
     switch(action.type){
          case "SET_CART": {
               return ({ ...state, cart: action.payload })
          } ;
          case "PUSH_TO_CART": {
               var cart= [ ...state.cart ]
               var product: any = action.payload;
               const indexOf = cart.map((p: CartItem) => p.product.id).indexOf(product.id);
               if (indexOf > -1){
                    cart[indexOf].qtd+=1; }
               else {
                    cart = [ { qtd :1, product: action.payload}, ...cart ]; }
               return ({ ...state, cart })
          };
          case "REMOVE_FROM_CART": {
               var cart= [ ...state.cart ];
               console.log(action.payload)
               const indexOf = cart.map((p: CartItem) => p.product.id).indexOf(action.payload.id);
               console.log(indexOf)
               if(indexOf > -1){
                    var item = cart[indexOf]
                    item.qtd -= 1 ;
                    if( item.qtd <= 0) cart.splice(indexOf,1);
               }
               return ({ ...state, cart });
          };

          default: return state
     }
}
