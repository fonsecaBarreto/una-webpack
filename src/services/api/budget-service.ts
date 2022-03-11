import { Product } from '@/domain/views/Product'
import { global } from '@/services/global-keys'
import { MakeApiSettings, errorHandler } from './helpers'

const companhiasApi = MakeApiSettings({
     base_url: `${global.base_url}/budgets`,
     errorHelper: errorHandler, 
     storage_key: global.user_storage_key
})

export namespace BudgetServices {
     export type SaveParams = {
        user_id:string
        products: { product_id: string, quantity: string}[]
    }
}

export const budgetServices = {
     save: async (params: BudgetServices.SaveParams) => {
          const data = { ...params };
          console.log(data)
          const METHOD =  "POST"
          const URL = ""
          const resp = await companhiasApi.send({ method: METHOD, url: URL, data }) 
          return resp.data 
     }
}

