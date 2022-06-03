import { global } from '@/services/global-keys'
import { MakeApiSettings, errorHandler } from './helpers'

const companhiasApi = MakeApiSettings({
     base_url: `${global.base_url}/companies`,
     errorHelper: errorHandler, 
     storage_key: global.user_storage_key
})

export namespace CompanhiasServices {
     export type ListParams = {
          status?: string,
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
          const { v="", p= 1, status=""} = params 
          var query = `?p=${p}&v=${v}&ativo=${status}`
          const { data } = await companhiasApi.send({ method: "get", url: `/${query}` }) 
          return data 
     },
     /* admins */
     listV2: async (params: any) => {
          const { v, p, ativo} = params 
          var query = `?page=${p}&text=${v}&ativo=${ativo}`
          const { data } = await companhiasApi.send({ method: "get", url: `/v2${query}` }) 
          return data 
     },
     find: async (id:string) => {
          const { data } = await companhiasApi.send({ method: "get", url: `/${id}` }) 
          return data 
     },
     /* admin and gestor*/
     findV2: async (id:string) => {
          const { data } = await companhiasApi.send({ method: "get", url: `/company/${id}` }) 
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