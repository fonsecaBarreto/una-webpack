import { ListingView } from "@/domain/views/ListingView";
import { Produto } from "@/domain/views/Produto";

export interface DepartamentosState {
     struct: any;
     produtos_feed: ListingView<Produto>
}

const INITIAL_STATE = {
     struct: [],
     produtos_feed: null,
}
   
export const departamentosReducer = (state=INITIAL_STATE, action: any) => {
     switch(action.type){
          case "SET_DEPARTMENTOS_STRUCT": return { ...state, struct: action.payload };
          case "SET_PRODUCTOS_FEED": return { ...state, produtos_feed: action.payload };
          default: return state
     }
}