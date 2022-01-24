export type  Product = any;

export type CartItem = {
     product: Product,
     qtd: number
}

export const setCart = (products: Product)=> ({
     type: "SET_CART",
     payload: products
})

export const pushToCart = ( product:Product ) => ({
     type: "PUSH_TO_CART",
     payload: product
})
 
export const removeFromCart = (product: Product) => ({
     type: "REMOVE_FROM_CART",
     payload: product
})
 