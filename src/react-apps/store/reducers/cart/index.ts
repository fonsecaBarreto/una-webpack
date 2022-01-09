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
               console.log(action.payload)
               var exists = state.cart.find((p: CartItem) => (p.product.id  == action.payload.id) )
               var qtd = exists ? exists.qtd + 1 : 1;
               var cartItem = { qtd, product: action.payload}
               var prev = state.cart.filter((p: Product) =>p.product.id!=action.payload.id);
               return { ...state, cart: [ ...prev, cartItem ] }
          };
          case "REMOVE_FROM_CART": {
               var exists = state.cart.find((p: CartItem) => (p.product.id  == action.payload.id) )
               if(!exists) return state;
               var qtd = exists.qtd - 1 ?? 0;
               var cartItem = { qtd, product: action.payload}
               console.log(cartItem)
               var prev = state.cart.filter((p: Product) =>p.product.id!=action.payload.id);
               return ({ ...state, cart: cartItem.qtd <= 0 ? [...prev] : [ ...prev, cartItem ]});
          };

          default: return state
     }
}