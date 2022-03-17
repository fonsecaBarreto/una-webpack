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
     save: async (params: any) => {
          const data = { ...params };
          const METHOD = data.id ? "PUT" : "POST"
          const URL = data.id ? `/${data.id}` : "/";
          delete data.id
          const resp = await companhiasApi.send({ method: METHOD, url: URL, data }) 
          return resp.data 
     },
     list: async (params: Partial<CompanhiasServices.ListParams>) => {
          console.log(params)
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

export const coverageServices = {

     save: async (params: { id:number, cidades:string[]}[], company_id:string) => {
          const data = { ufs: [...params] };
          const resp = await companhiasApi.send({ 
               method: "POST",
               url: `/${company_id}/coverage`, 
               data 
          }) 
          return resp.data 
     },

     find: async (id:string) => {
          const { data } = await companhiasApi.send({ 
               method: "get", 
               url: `/${id}/coverage` 
          }) 
          return data 
     }
}