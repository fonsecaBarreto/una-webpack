import { Product, ProductSupply } from "@/domain/views/Product"

export namespace CartState {
     export type CartItem = {
          _id: string;
          product: Product;
          qtd: number;
     }
     export class CartItemHandler implements CartItem{
         
          _id!: string;
          product!: Product;
          qtd!: number;

          constructor(params: CartItem){
               Object.assign(this, params)
          }

          getSupply(): ProductSupply | null{
               const [ ean, index, supplier_id ] = this._id.split("_");
               const supply: ProductSupply | null = 
                    (this.product.supplies.find((p: any)=> ( p.company_id == supplier_id && p.index == Number(index) ))) 
                    ?? null;
               return supply;
          }

          getUnitPrice(){
               return (this.getSupply()?.price) ?? 0
          }

          getTotalPrice(){
               return this.getUnitPrice() * this.qtd
          }

     }
}

export const CreateCartItem_Id=(ean: string, index?:string, supplier_id?:string) =>{
     return `${ean}_${index}_${supplier_id}`
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
               const _ids: string[] = action.payload;
               const new_cart = prev_cart.filter(item=>!_ids.includes(item._id)); 
               return ({ ...state, cart: new_cart })
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

export const removeFromCart = ( _ids: string[] ) => ({
     type: "REMOVE_FROM_CART",
     payload: _ids
})

