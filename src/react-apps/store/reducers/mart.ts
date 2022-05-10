
import { ListingView, LabelView } from "@/domain/views/ListingView";
import { INITIAL_LIST_VIEW } from "./base";


/* domain */
export namespace ProductsState {

     export interface Filters extends 
          Record<"departament" | "category" | "subCategory" | "brand", LabelView[]>  { v: string }

     export type DataView = { 
         products: any[], 
         brands_available: LabelView[], 
         categories_available: LabelView[], 
         subCategories_available: LabelView[]  
     }
}

export interface MartState {
    products:  ListingView< ProductsState.DataView, ProductsState.Filters>
    departaments: Record<"departaments" | "categories" | "subCategories" | "brands", LabelView[] >
}

/* initial_values */
export const INITIAL_DEPARTAMENTOS = { departaments: [], categories: [], subCategories: [],  brands: [], presentations:[]}
const INITIAL_PRODUCTS = { ...INITIAL_LIST_VIEW({ products: [], brands_available: [], categories_available: [], subCategories_available:[]}) }

const INITIAL_STATE = {
     products : { ...INITIAL_PRODUCTS },
     departaments: { ...INITIAL_DEPARTAMENTOS },
}

export const martReducer = (state=INITIAL_STATE, action: any) => {
     switch(action.type){

          case "SET_DEPARTMENTS": {
               return { 
                    ...state, 
                    departaments: action.payload, 
               };
          };
          case "SET_PRODUCTS": { 
               var listingView = state.products;
               const { content, toAppendData } = action.payload;

               var prevdata: any = { ...listingView.data }

               var products = toAppendData ? [ ...prevdata.products, ...content.data.products ]: [...content.data.products ]
               var brands_available = [ ...content.data.brands_available]

               content.data["products"] = products;
               content.data["brands_available"] = brands_available;

               return ({ ...state,  products: { ...state.products, ...content}  }) ; 
          };
          default: return state
     }
}

/* ACTIONS */
export const setDepartaments = (value:any) => ({
     type: "SET_DEPARTMENTS",
     payload: value
})

export const setProducts = (value:any, append: boolean = false) => ({
     type: "SET_PRODUCTS",
     payload: { content: value, toAppendData: append }
})