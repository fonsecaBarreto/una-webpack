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
        products: { product_id: string, quantity: string}[]
    }
    export type ListParams = {
         p: number,
         user: string[],
         company: string[],
         idate: Date,
         ldate: Date
    }
}

export const budgetServices = {
     save: async (params: BudgetServices.SaveParams) => {
          const { company_id, ...rest } = params;
          const data = { ...rest };
          const METHOD =  "POST"
          const URL = `/${company_id}`
          const resp = await budgetsApi.send({ method: METHOD, url: URL, data }) 
          return resp.data 
     },
     list: async (params: BudgetServices.ListParams) => {
          const { p = 1 } = params;
          var query = `?p=${p}`;
          (["company", "idate", "ldate", "user"]).map( (v:string)=>{
               var filter :any = { ...params }[v];
               filter.length > 0 && filter.map((f:any)=>{ query+=`&${v}=${f}` });
          })
          const { data } = await budgetsApi.send({ method: "get", url: `/${query}` }) 
          return data 
     }
}

