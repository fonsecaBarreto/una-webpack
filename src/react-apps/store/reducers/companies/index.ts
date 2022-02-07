import { ListingView, LabelView } from "@/domain/views/ListingView";
export namespace CompaniesState {
     export type FilterStruct = Record< "ativo"| "v", any >
}
export interface CompaniesState {
     companies_listview: ListingView<{companies: LabelView[]}>,
}

const INITIAL_LIST_VIEW = {
     queries: {},
     total: 0,
     length: 0,
     data: { companies:[] },                      
     pages: 0,                 
     pageIndex: 0
}

const INITIAL_STATE = {
     companies_listview: { ...INITIAL_LIST_VIEW },
}
   
export const companiesReducer = (state=INITIAL_STATE, action: any) => {
     switch(action.type){
     
          case "SET_COMPANHIAS": { 
               const { content, toAppendData } = action.payload;
               var prev_data: any = { ...state.companies_listview.data }
               var companies = toAppendData ? [ ...prev_data.companies, ...content.data.companies]: [...content.data.companies]
               content.data["companies"] = companies;
               return ({ ...state, companies_listview: {...content} }) ; 
          };

          default: return state
     }
}