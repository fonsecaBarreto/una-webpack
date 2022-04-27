import { global } from '@/services/global-keys'
import { MakeApiSettings, errorHandler } from './helpers'

const suppliesApi = MakeApiSettings({
     base_url: `${global.base_url}/products/supplies`,
     errorHelper: errorHandler, 
     storage_key: global.user_storage_key
})

export namespace SuppliesServices {
     export type SaveSupply_dto = {
          ean: string
          price: number,
          expiration: Date
     }
}

export const suppliesServices = {

     save_multiples: async ( params: { supplies: SuppliesServices.SaveSupply_dto[]}, company_id:string) => {
          const { supplies } = params
          const { data } = await suppliesApi.send({ method: "post", url: `/${company_id}`, data: { supplies } }) 
          return data 
     },

}