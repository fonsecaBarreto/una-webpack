

export namespace CartState {
     export type  Product = any;

     export type CartItem = {
          product: Product,
          qtd: number
     }
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
          } ;
          case "PUSH_TO_CART": {
               var cart= [ ...state.cart ]
               var product: any = action.payload;
               const indexOf = cart.map((p: CartState.CartItem) => p.product.ean).indexOf(product.ean);
               if (indexOf > -1){
                    cart[indexOf].qtd+=1; }
               else {
                    cart = [ { qtd :1, product: action.payload}, ...cart ]; }
               return ({ ...state, cart })
          };
          case "REMOVE_FROM_CART": {
               var cart= [ ...state.cart ];
               const indexOf = cart.map((p: CartState.CartItem) => p.product.ean).indexOf(action.payload.ean);
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

/* actions */

export const setCart = (products: CartState.Product)=> ({
     type: "SET_CART",
     payload: products
})

export const pushToCart = ( product: CartState.Product ) => ({
     type: "PUSH_TO_CART",
     payload: product
})
 
export const removeFromCart = (product: CartState.Product) => ({
     type: "REMOVE_FROM_CART",
     payload: product
})
 