import { Product } from '@/domain/views/Product'
import { global } from '@/services/global-keys'
import { MakeApiSettings, errorHandler } from './helpers'

const budgetsApi = MakeApiSettings({
     base_url: `${global.base_url}/budgets`,
     errorHelper: errorHandler, 
     storage_key: global.user_storage_key
})

export namespace BudgetServices {
     export type SaveParams = {
        company_id: string,
        products: { ean: string, quantity: string}[]
    }
   
}

export const budgetServices = {
     save: async (params: BudgetServices.SaveParams) => {
          const { company_id, ...rest } = params;
          const data = { ...rest };
          const METHOD =  "POST"
          const URL = `/company/${company_id}/create`
          const resp = await budgetsApi.send({ method: METHOD, url: URL, data }) 
          return resp.data 
     },
     list: async (params: any={}) => {
          const { p = 1, initial_date, end_date } = params;
          var query = `?page=${p}`;
          query+=`
          &idate=${new Date(initial_date).getTime()} 
          &ldate=${new Date(end_date).getTime()}`;


         /*  (["company", "user"]).map( (v:string)=>{
               var filter :any = { ...params }[v];
               filter?.length > 0 && filter.map((f:any)=>{ query+=`&${v}=${f}` });
          }) */
          console.log(query)
          const { data } = await budgetsApi.send({ method: "get", url: `${query}` }) 
          return data 
     },
     find: async (budget_id: string) => {
          const { data } = await budgetsApi.send({ method: "get", url: `/${budget_id}` }) 
          return data 
     }
}

