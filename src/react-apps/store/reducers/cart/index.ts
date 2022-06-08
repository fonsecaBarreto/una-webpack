import CartItem from "@/react-apps/layouts/BlueLagum/Cart/CartItem";

export namespace CartState {
     export type  Product = {
          ean: string,
          images: string[]
          specification: string
          presentation: string
     };

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
               var { product, qtd=1, handle="PUSH" }: { product: any, qtd?: number, handle?: "PUSH" | "OVERWRITE" } = action.payload;
               const indexOf = cart.map((p: CartState.CartItem) => p.product.ean).indexOf(product.ean);

               var cartItem: CartState.CartItem = (indexOf > -1) ? cart[indexOf] : { qtd:0, product}

               switch(handle){
                    case "PUSH": 
                         cartItem.qtd+=qtd;
                    break;

                    case "OVERWRITE":
                         cartItem.qtd = qtd
                    break;
               }

               if( cartItem.qtd <= 0) cart.splice(indexOf,1);
               else if(indexOf == -1){
                    cart = [ cartItem, ...cart ]
               }
               
               return ({ ...state, cart })
          };
          default: return state
     }
}

/* actions */

export const setCart = (products: CartState.Product)=> ({
     type: "SET_CART",
     payload: products
})

export const pushToCart = ( product: CartState.Product, qtd: number, handle?: "PUSH" | "OVERWRITE" ) => ({
     type: "PUSH_TO_CART",
     payload: {product, qtd, handle}
})
 
