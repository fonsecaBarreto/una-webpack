
export const INITIAL_DEPARTAMENTOS_STRUCT = {
     departaments: [], categories: [], subCategories: [],  brands: [], presentations:[]
}

export const INITIAL_PRODUCTS_LISTING_VIEW = {
     queries: {},
     total: 0,
     length: 0,
     data: { products: [], brands_available: [] },                      
     pages: 0,                 
     pageIndex: 0
 }
 
const INITIAL_STATE = {
     departaments_struct: { ...INITIAL_DEPARTAMENTOS_STRUCT },
     departaments_struct_loadtry: 0,
     products_listingview: { ...INITIAL_PRODUCTS_LISTING_VIEW },
     toSubmit: false
}

export const departamentosReducer = (state=INITIAL_STATE, action: any) => {
     switch(action.type){
          case "SET_DEPARTMENTOS_STRUCT": {
               return { ...state, departaments_struct: action.payload, departaments_struct_loadtry: state.departaments_struct_loadtry + 1 };
          };
          case "SET_PRODUCTOS_LISTINGVIEW": { 
               var listingView = state.products_listingview;
               const { content, toAppendData } = action.payload;
               var prevdata: any = { ...listingView.data }
               var products = toAppendData ? [ ...prevdata.products, ...content.data.products]: [...content.data.products]
               content.data["products"] = products;
               return ({ ...state, products_listingview: {...content}, toSubmit: false }) ; 
          };
          case "SPLICE_PRODUCTS_LISTVIEW_QUERIES": {
               let products_listingview :any = { 
                    ...state.products_listingview, 
                    queries: { ...state.products_listingview.queries, ...action.payload } 
               };
               return ({ ...state, products_listingview, toSubmit: true }) ; 
          };

          default: return state
     }
}