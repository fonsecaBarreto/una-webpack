import { global } from '@/services/global-keys'
import { MakeApiSettings, errorHandler } from './helpers'

const usersApi = MakeApiSettings({
     base_url: `${global.base_url}/users`,
     errorHelper: errorHandler, 
     storage_key: global.user_storage_key
})

export namespace UsersServices {
 
}

export const usersServices = {
     save: async (params: any) => {
          const data = { ...params };
          const METHOD = data.id ? "PUT" : "POST"
          const URL = data.id ? `/update/${data.id}` : `/create/${data.company_id}` ;
          delete data.id
          const resp = await usersApi.send({ method: METHOD, url: URL, data }) 
          return resp.data 
     }
}