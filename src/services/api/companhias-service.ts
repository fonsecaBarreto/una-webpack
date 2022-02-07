import { global } from '@/services/global-keys'
import { MakeApiSettings, errorHandler } from './helpers'

const companhiasApi = MakeApiSettings({
     base_url: `${global.base_url}/companies`,
     errorHelper: errorHandler, 
     storage_key: global.user_storage_key
})

export namespace CompanhiasServices {
     export type ListParams = {
          ativo?: string,
          v?: string
          p?: number
     }
}

export const companhiasServices = {
     list: async (params: CompanhiasServices.ListParams) => {
          const { v="", p= 1, ativo=""} = params
          var query = `?p=${p}&v=${v}&ativo=${ativo}`
          const { data } = await companhiasApi.send({ method: "get", url: `/${query}` }) 
          return data 
     },

     find: async (id:string) => {
          const { data } = await companhiasApi.send({ method: "get", url: `/${id}` }) 
          return data 
     }
}