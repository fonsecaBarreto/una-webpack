import { ListingView, LabelView } from "@/domain/views/ListingView";
import { INITIAL_LIST_VIEW } from '../base'

export interface CompaniesState {
     companies_listview: ListingView<{ companies: LabelView[]}, Record< "ativo"| "v", any > >,
     budgets_listview: ListingView<{ budgets: any[]}, Record< "user"| "company" | "idate" | "ldate", any > >,
}

const INITIAL_STATE = {
     companies_listview: { ...INITIAL_LIST_VIEW({ "companies": []}) },
     budgets_listview: { ...INITIAL_LIST_VIEW({ "budgets": []}) },
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

          case "SET_BUDGETS": { 
               const { content, toAppendData } = action.payload;
               var prev_data: any = { ...state.budgets_listview.data }
               var budgets = toAppendData ? [ ...prev_data.budgets, ...content.data.budgets]: [...content.data.budgets]
               content.data["budgets"] = budgets;
               return ({ ...state, budgets_listview: { ...content } }) ; 
          };

          default: return state
     }
}