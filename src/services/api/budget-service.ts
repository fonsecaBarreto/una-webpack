import { global } from '@/services/global-keys'
import { MakeApiSettings, errorHandler } from './helpers'

const budgetsApi = MakeApiSettings({
     base_url: `${global.base_api}/v2/budgets`,
     errorHelper: errorHandler, 
     storage_key: global.user_storage_key
})

export namespace BudgetServices {
     export type Item = {
          ean: string, 
          quantity: string, 
          supply: { supplier_id: string, index: number }
     }
     
     export type SaveParams = {
        items: { ean: string, quantity: string , supply: { supplier_id: string, index: number }}[]
     }
}


export namespace ListBudgetServices {
     
     export type Params = {}
}

export const budgetServices = {

     save: async (params: BudgetServices.SaveParams) => {
          const data = { ...params };
          const resp = await budgetsApi.send({ method: "POST", url: "/", data }) 
          return resp.data 
     },

     list: async (params: any={}) => {
          const { p = 1, initial_date, end_date } = params;
          var query = `?page=${p}&limit=99999&order=DESC`;
        /*   query+=`
               &idate=${new Date(initial_date).getTime()} 
               &ldate=${new Date(end_date).getTime()}`; */
          const { data } = await budgetsApi.send({ method: "get", url: `/${query}` }) 
          return data 
     },
     /* ADMIN listing budgets */
  /*    list: async (params: any={}) => {
          const { p = 1, initial_date, end_date, company_id } = params;
          var query = `?page=${p}`;
          query+=`
               &idate=${new Date(initial_date).getTime()} 
               &ldate=${new Date(end_date).getTime()}
               &company_id=${company_id ?? ""}`;

          const { data } = await budgetsApi.send({ method: "get", url: `${query}` }) 
          return data 
     }, */
    /*  // admins finding budgets 
     find: async (budget_id: string) => {
          const { data } = await budgetsApi.send({ method: "get", url: `/${budget_id}` }) 
          return data 
     },
     // admins update 

     updateStatus: async (budget_id: string, status: string) => {
          await budgetsApi.send({ method: "patch", url: `/${budget_id}/status`, data: { status } }) 
          return;
     },
 */

     /*  Clientes */

 /*     findCompanyBudget: async (budget_id: string, company_id:string) => {
          const { data } = await budgetsApi.send({ method: "get", url: `/company/${company_id}/${budget_id}` }) 
          return data 
     },
     
    
 */
}

