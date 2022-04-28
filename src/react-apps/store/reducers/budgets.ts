import { ListingView } from "@/domain/views/ListingView";
import { INITIAL_LIST_VIEW } from './base'

export namespace BudgetState {
     export type Filters = Record< "user"| "company" | "idate" | "ldate", any >
     export type DataView = { budgets: any[] }
}
export interface BudgetState extends ListingView< BudgetState.DataView, BudgetState.Filters> {}

const INITIAL_STATE = { ...INITIAL_LIST_VIEW({ "budgets": []}) }

export const BudgetsReducer = (state=INITIAL_STATE, action: any) => {
     switch(action.type){
     
          case "SET_BUDGETS": { 
               const { content, toAppendData } = action.payload;
               var prev_data: any = { ...state.data }
               var budgets = toAppendData ? [ ...prev_data.budgets, ...content.data.budgets]: [...content.data.budgets]
               content.data["budgets"] = budgets;
               return ({ ...state, ...content, sync: state.sync+1 }) ; 
          };

          default: return state
     }
}

/* actions */
export const setBudgets = (content: any, append: boolean) => ({
     type: "SET_BUDGETS",
     payload: { content, toAppendData: append }
})
