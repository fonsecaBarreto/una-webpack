import { ListingView, LabelView } from "@/domain/views/ListingView";
import { INITIAL_LIST_VIEW } from './base'

export namespace CompaniesState {
     export type Filters = Record< "ativo"| "v", any >
     export type DataView = { companies: LabelView[] }
}

export interface CompaniesState extends ListingView< CompaniesState.DataView, CompaniesState.Filters> {}

const INITIAL_STATE = { ...INITIAL_LIST_VIEW({ "companies": []}) }

export const companiesReducer = (state=INITIAL_STATE, action: any) => {
     switch(action.type){
     
          case "SET_COMPANHIAS": { 
               const { content, toAppendData } = action.payload;
               var prev_data: any = { ...state.data }
               var companies = toAppendData ? [ ...prev_data.companies, ...content.data.companies]: [...content.data.companies]
               content.data["companies"] = companies;
               return ({ ...state, ...content }) ; 
          };

          default: return state
     }
}
/* actions */
export const setCompanhias = (content:any, append: boolean) => ({
     type: "SET_COMPANHIAS",
     payload: { content, toAppendData: append }
})
