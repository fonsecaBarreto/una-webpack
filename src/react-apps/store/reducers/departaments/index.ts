import { ListingView } from "@/domain/views/ListingView";
import { ProductListView, Produto } from "@/domain/views/Produto";

export interface DepartamentosState {
     struct: any;
     produtos_feed: ListingView<Produto>
}

const INITIAL_STATE = {
     struct: [],
     produtos_feed: {
          total: 0,
          length: 0,
          data: [],                      
          queries: {},
          pages: 0,                 
          pageIndex: 0
     }
}
   
export const departamentosReducer = (state=INITIAL_STATE, action: any) => {
     switch(action.type){
          case "SET_DEPARTMENTOS_STRUCT": return { ...state, struct: action.payload };
          case "SET_PRODUCTOS_FEED": { 
               var data = action.payload.toAppend ? [ ...state.produtos_feed.data, ...action.payload.listView.data ] : [...action.payload.listView.data ]
               var produtos_feed :any = { ...action.payload.listView, data } ;
               return ({ ...state, produtos_feed }) ;
          };
          default: return state
     }
}