import { Companhia } from "@/domain/views/Companhia";
import { ListingView, LabelView } from "@/domain/views/ListingView";

const INITIAL_LIST_VIEW = {
     queries: {},
     total: 0,
     length: 0,
     data: [],                      
     pages: 0,                 
     pageIndex: 0
}

const INITIAL_STATE = {
     companhias: { ...INITIAL_LIST_VIEW },
}
   
export const companhiasReducer = (state=INITIAL_STATE, action: any) => {
     switch(action.type){
     
          case "SET_COMPANHIAS": { 
               const { content, append } = action.payload
               var data = append == true ? [ ...state.companhias.data, ...content.data ] : [ ...content.data ];
               var { total, length, pages, pageIndex, queries } = content;
               let companhias :ListingView<Companhia[]> = { queries, total, length, pages, pageIndex, data } ;
               return ({ ...state, companhias }) ; 
          };

          default: return state
     }
}