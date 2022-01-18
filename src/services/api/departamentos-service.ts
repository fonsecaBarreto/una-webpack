import { global } from '@/services/global-keys'
import { MakeApiSettings, errorHandler } from './helpers'

const departamentsApi = MakeApiSettings({
     base_url: `${global.base_url}/departamentos`,
     errorHelper: errorHandler, 
     storage_key: global.user_storage_key
})

export const departamentosService = {
     list:async () => {
          const { data } = await departamentsApi.send({ method: "get", url:"/" }) 
          return data
     }
}